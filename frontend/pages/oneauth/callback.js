import React from 'react';
import { useLocation } from 'react-router-dom';
import Api from '~/services/api';

export default () => {
  const queryParams = new URLSearchParams(useLocation().search);

  React.useEffect(() => {
    const code = queryParams.get('code')
    Api
      .post('oneauth/login', {
        code
      })
      .then(resp => {
        console.log(resp)
      })
  }, [])

  return null
}
