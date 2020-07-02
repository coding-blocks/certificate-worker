import { SET_USER, LOGOUT } from '~/store/action-types';

export const setUser = user => ({
  type: SET_USER,
  payload: user
})
export const logout = () => ({
  type: LOGOUT
})
