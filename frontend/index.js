import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';

import { initStore } from '~/store';
import router from '~/router';

const store = initStore()

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          {router.map((route, i) => {
            const Page = require(`./pages${route.path.replaceAll(':', '_')}`).default
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
    </Provider>
  )
}

ReactDOM.render(<App />, document.querySelector("#root"))
