import { combineReducers, createStore, applyMiddleware } from 'redux';
import axiosMiddleware from 'redux-axios-middleware';
import api from '~/services/api';

export const initStore = () => {
  const rootReducer = combineReducers({
    
  })
  const store = createStore(
    rootReducer,
    applyMiddleware(axiosMiddleware(api))    
  )

  return store
}

