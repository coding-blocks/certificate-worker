export const getLayouts = () => state => Object.keys(state.layouts.layouts).map(id => state.layouts.layouts[id])
