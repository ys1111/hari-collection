import { Dispatch } from 'redux'
import fetcher from '../../helpers/fetcher'
import { MercunItem, itemProperty } from '../../helpers/MercunItem'
import { MercunItems } from '../../helpers/MercunItems'

// CONSTANTS
export enum ITEM_STATUS {
  INITIAL = 'INITIAL',
  LOADING = 'LOADING',
  LOADED = 'LOADED',
  ERROR = 'ERROR'
}

// Action types
export enum ITEM_ACTION_TYPES {
  LOAD_ITEM_START = 'LOAD_ITEM_START',
  LOAD_FILTERED_ITEM_START = 'LOAD_FILTERED_ITEM_START',
  LOAD_INDIVISUAL_ITEM_START = 'LOAD_INDIVISUAL_ITEM_START',
  LOAD_INDIVISUAL_ITEM_SUCCESS = 'LOAD_INDIVISUAL_ITEM_SUCCESS',
  LOAD_ITEM_SUCCESS = 'LOAD_ITEM_SUCCESS',
  LOAD_ITEM_FAIL = 'LOAD_ITEM_FAIL'
}

// Action creators
export const loadItemStart = () => ({
  type: ITEM_ACTION_TYPES.LOAD_ITEM_START
})

export const loadFilteredItemStart = (category_id: number) => ({
  type: ITEM_ACTION_TYPES.LOAD_FILTERED_ITEM_START,
  payload: category_id
})

export const loadIndivisualItemStart = (id: number) => ({
  type: ITEM_ACTION_TYPES.LOAD_INDIVISUAL_ITEM_START,
  payload: id
})

export const loadIndivisualItemSuccess = (item: any) => ({
  type: ITEM_ACTION_TYPES.LOAD_INDIVISUAL_ITEM_SUCCESS,
  payload: item
})

export const loadItemSuccess = (item: any) => ({
  type: ITEM_ACTION_TYPES.LOAD_ITEM_SUCCESS,
  payload: item
})

export const loadItemFail = (error: Error) => ({
  type: ITEM_ACTION_TYPES.LOAD_ITEM_FAIL,
  payload: error
})

// Reducer
export interface State {
  status: ITEM_STATUS
  error: Error | null
  items: any[] // @TODO type
  item?: itemProperty
  category_id: number
  item_id: number
}

const initialState: State = {
  status: ITEM_STATUS.INITIAL,
  error: null,
  items: [],
  item: {
    id: '',
    name: '',
    description: '',
    like_count: 0,
    cot_count: 0,
    price: 0,
    is_sold_out: false,
    shipping_fee: '',
    image: '',
    category_id: 0
  },
  category_id: 0,
  item_id: 0
}

interface ItemAction {
  type: ITEM_ACTION_TYPES
  payload?: any
}

const reducer = (state: State = initialState, action: ItemAction): State => {
  switch (action.type) {
    case ITEM_ACTION_TYPES.LOAD_ITEM_START:
      return {
        ...state,
        status: ITEM_STATUS.LOADING
      }
    case ITEM_ACTION_TYPES.LOAD_FILTERED_ITEM_START:
      return {
        ...state,
        status: ITEM_STATUS.LOADING,
        category_id: action.payload
      }
    case ITEM_ACTION_TYPES.LOAD_INDIVISUAL_ITEM_START:
      return {
        ...state,
        status: ITEM_STATUS.LOADING,
        item_id: action.payload
      }
    case ITEM_ACTION_TYPES.LOAD_INDIVISUAL_ITEM_SUCCESS:
      return {
        ...state,
        status: ITEM_STATUS.LOADING,
        item: action.payload
      }
    case ITEM_ACTION_TYPES.LOAD_ITEM_SUCCESS:
      return {
        ...state,
        status: ITEM_STATUS.LOADED,
        items: action.payload
      }
    case ITEM_ACTION_TYPES.LOAD_ITEM_FAIL:
      return {
        ...state,
        status: ITEM_STATUS.ERROR,
        error: action.payload
      }
    default:
      return state
  }
}

export default reducer

// Thunks
export const loadItem: any = () => {
  return async (dispatch: Dispatch) => {
    dispatch(loadItemStart())

    await fetcher<MercunItems>('http://localhost:5000/items', {})
      .then(items => {
        const { data } = items
        return dispatch(loadItemSuccess(data))
      })
      .catch(err => console.log(err))
  }
}

export const loadFilterItem: any = (category_id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadFilteredItemStart(category_id))

    await fetcher<MercunItems>('http://localhost:5000/items', {})
      .then(items => {
        const { data } = items
        const filterData = data.filter(data => data.category_id == category_id)
        return dispatch(loadItemSuccess(filterData))
      })
      .catch(err => console.log(err))
  }
}

export const loadIndivisualItem: any = (id: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(loadIndivisualItemStart(id))

    await fetcher<MercunItem>('http://localhost:5000/items' + `/${id}`, {})
      .then(items => {
        console.log(items)
        return dispatch(loadIndivisualItemSuccess(items))
      })
      .catch(err => console.log(err))
  }
}
