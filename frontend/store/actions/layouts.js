import { LOAD_LAYOUTS, LOAD_LAYOUT, UPDATE_LAYOUT, CREATE_LAYOUT } from '~/store/action-types';

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
export const updateLayout = (id, layout) => ({
  type: UPDATE_LAYOUT,
  payload: {
    request: {
      url: `layouts/${id}`,
      method: 'PATCH',
      data: layout
    }
  }
})
export const createLayout = layout => ({
  type: CREATE_LAYOUT,
  payload: {
    request: {
      url: 'layouts',
      method: 'POST',
      data: layout
    }
  }
})
