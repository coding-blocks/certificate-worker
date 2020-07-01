import { LOAD_LAYOUTS } from '~/store/action-types';
import { listToMap } from '~/utils';

const initialState = {
  layouts: {}
}

export default (state = initialState, action) => {
  switch(action.type) {
    case `${LOAD_LAYOUTS}_SUCCESS`:
      return {
        ...state,
        layouts: {
          ...state.layouts,
          ...listToMap(action.payload.data)
        }
      }
    default:
      return state
  }
}
