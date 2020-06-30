import { combineReducers, createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import api from '~/services/api';

import sessionReducer from '~/store/reducers/session';

export const initStore = () => {
  const rootReducer = combineReducers({
    session: sessionReducer
  })
  const store = createStore(
    rootReducer,
    applyMiddleware(axiosMiddleware(api))    
  )

  return store
}

