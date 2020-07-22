import React from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router-dom';
import { useRefreshUser } from '~/services/session';
import Api from '~/services/api';

export default () => {
  const history = useHistory()
  const queryParams = new URLSearchParams(useLocation().search);
  const refreshUser = useRefreshUser(useDispatch())

  React.useEffect(() => {
    (async () => {  
      try {
        const code = queryParams.get('code')
        const resp = await Api.post('oneauth/login', {
          code
        })
        localStorage.setItem('certificate-jwt', resp.data.jwt)
        refreshUser()
      } catch (err) {
        console.log(err)
      }
      history.push('/')
    })()
  }, [])

  return null
}
