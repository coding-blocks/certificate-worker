const path = require("path");
const autoprefixer = require("autoprefixer");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CircularDependencyPlugin = require('circular-dependency-plugin');

module.exports = {
  entry: "./frontend/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle-[contenthash].js",
    chunkFilename: "[id]-[chunkhash].js",
    publicPath: "/"
  },
  resolve: {
    alias: {
      '~': __dirname + '/frontend'
    },
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: /node_modules/,
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]__[local]___[hash:base64:5]",
              },
              sourceMap: true,
            },
          },
          {
            loader: "postcss-loader",
            options: {
              ident: "postcss",
              plugins: () => [autoprefixer({})],
            },
          },
        ],
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': Object.keys(process.env).reduce((acc, curr) => { acc[curr] = JSON.stringify(process.env[curr]); return acc }, {})
    }),
    new HtmlWebpackPlugin({
      template: __dirname + "/frontend/index.html",
      filename: "index.html",
      inject: "body",
    }),
    new CircularDependencyPlugin({
      exclude: /node_modules/,
      // add errors to webpack instead of warnings
      failOnError: true,
      // allow import cycles that include an asyncronous import,
      // e.g. via import(/* webpackMode: "weak" */ './file.js')
      allowAsyncCycles: false,
      // set the current working directory for displaying module paths
      cwd: __dirname + "/frontend",
    }),
  ],
  devServer: {
    historyApiFallback: true
  }
};
