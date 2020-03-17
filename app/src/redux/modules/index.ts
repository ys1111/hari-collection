import { combineReducers } from 'redux'
import items, { State as ItemsState } from './items'

export interface AppState {
  reducer: {
    items: ItemsState
  }
}

export default combineReducers({
  items
})
