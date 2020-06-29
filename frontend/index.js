import React from 'react';
import ReactDOM from 'react-dom';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import router from '~/router';

const App = () => {
  return (
    <Router>
      <Switch>
        {router.map((route, i) => {
          const Page = require(`./pages/${route.page}`).default
          const Layout = require(`./layouts/${route.layout || 'base'}`).default
          
          return (
            <Route path={route.path} key={i}>
              <Layout>
                <Page />
              </Layout>
            </Route>
          )
        })}
      </Switch>
    </Router>
  )
}

ReactDOM.render(<App />, document.querySelector("#root"))
