import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export default ({ children, ...props}) => {
  const isAuthenticated = useSelector(state => state.session.isAuthenticated)

  return <Route 
    {...props}
    render={({ location }) => 
      isAuthenticated ? 
      (children) : 
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location }
        }}
      />
    }
  />
}
