import { LOAD_LAYOUTS } from '~/store/action-types';

export const loadLayouts = () => ({
  type: LOAD_LAYOUTS,
  payload: {
    request: {
      url: 'layouts'
    }
  }
})
