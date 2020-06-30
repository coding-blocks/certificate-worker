import { setUser } from '~/store/actions/session';

export const useRefreshUser = dispatch => () => {
  const token = localStorage.getItem('certificate-jwt')
  const user = token ? JSON.parse(atob(token.split('.')[1])) : {};
  dispatch(setUser(user))
}
