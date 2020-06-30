import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { useRefreshUser } from '~/services/session';
import router from '~/router';


export default () => {
  const refreshUser = useRefreshUser(useDispatch())

  React.useEffect(() => {
    refreshUser()
    window.addEventListener('storage', refreshUser)

    return () => window.removeEventListener('storage', refreshUser)
  }, [])

  return (
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
  )
}
