import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import Api from '~/services/api';

export default () => {
  const queryParams = new URLSearchParams(useLocation().search);
  const history = useHistory()

  React.useEffect(() => {
    (async () => {  
      try {
        const code = queryParams.get('code')
        const resp = await Api.post('oneauth/login', {
          code
        })
        localStorage.setItem('certificate-jwt', resp.data.jwt)
      } catch (err) {
        console.log(err)
      }
      history.push('/')
    })()
  }, [])

  return null
}
