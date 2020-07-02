import { LOAD_LAYOUTS, LOAD_LAYOUT } from '~/store/action-types';

export const loadLayouts = () => ({
  type: LOAD_LAYOUTS,
  payload: {
    request: {
      url: 'layouts'
    }
  }
})
export const loadLayout = id => ({
  type: LOAD_LAYOUT,
  payload: {
    request: {
      url: `layouts/${id}`
    }
  }
})
