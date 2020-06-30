import { SET_USER } from '~/store/action-types';

export const setUser = user => ({
  type: SET_USER,
  payload: user
})
