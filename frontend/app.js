import React from 'react';
import { useDispatch } from 'react-redux';
import { 
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import AuthenticatedRoute from '~/components/common/authenticated-route';
import ActionComponent from '~/components/common/action-component';
import { useRefreshUser } from '~/services/session';
import router from '~/router';


export default () => {
  const refreshUser = useRefreshUser(useDispatch())
  const [initializing, setInitializing] = React.useState(true)

  React.useEffect(() => {
    refreshUser()
    window.addEventListener('storage', refreshUser)

    setInitializing(false)

    return () => window.removeEventListener('storage', refreshUser)
  }, [])

  if (initializing) return <></>

  return (
    <Router>
      <Switch>
        {router.map((route, i) => {
          const Page = require(`./pages${route.path.replaceAll(':', '_')}`)
          const Layout = require(`./layouts/${route.layout || 'base'}`).default
          const RouteComponent = route.authenticated ? AuthenticatedRoute : Route
          
          return (
            <RouteComponent path={route.path} key={i}>
              <Layout>
                <ActionComponent action={Page.action}>
                  <Page.default />
                </ActionComponent>
              </Layout>
            </RouteComponent>
          )
        })}
      </Switch>
    </Router>
  )
}
