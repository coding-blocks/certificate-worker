export const getLayouts = () => state => Object.keys(state.layouts.layouts).map(id => state.layouts.layouts[id])
export const getLayout = id => state => state.layouts.layouts[id]
