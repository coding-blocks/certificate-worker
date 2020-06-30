import { SET_USER } from '~/store/action-types';

const initialState = {
  user: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case SET_USER:
      return {
        ...state,
        user: action.payload
      }
    default:
      return state
  }
}
