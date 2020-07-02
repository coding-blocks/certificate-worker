import { SET_USER } from '~/store/action-types';

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
    default:
      return state
  }
}
