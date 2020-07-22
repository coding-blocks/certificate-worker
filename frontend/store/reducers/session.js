import { SET_USER, LOGOUT } from '~/store/action-types';

const initialState = {
  isAuthenticated: false,
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        isAuthenticated: !!action.payload.id,
        user: action.payload
      }
    case LOGOUT:
      localStorage.removeItem('certificate-jwt')
      return {
        ...state,
        isAuthenticated: false,
        user: {}
      }
    default:
      return state
  }
}
