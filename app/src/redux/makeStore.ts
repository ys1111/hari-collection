import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerMiddleware, connectRouter } from 'connected-react-router';
import thunkMiddleware from 'redux-thunk'
import logger from 'redux-logger'
import reducer from './modules'

const configureStore = (initialState: any, history: any) => {
  return createStore(
    combineReducers({
      reducer, initialState,
      router: connectRouter(history)
    }),
    applyMiddleware(
      thunkMiddleware,
      logger,
      routerMiddleware(history)
    )
  )
}

export default configureStore;