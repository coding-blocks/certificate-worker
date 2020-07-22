import { combineReducers, createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import api from '~/services/api';

import layoutsReducer from '~/store/reducers/layouts';
import sessionReducer from '~/store/reducers/session';

export const initStore = () => {
  const rootReducer = combineReducers({
    session: sessionReducer,
    layouts: layoutsReducer
  })
  const store = createStore(
    rootReducer,
    applyMiddleware(axiosMiddleware(api))    
  )

  return store
}

