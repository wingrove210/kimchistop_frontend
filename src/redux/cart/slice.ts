import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { calcTotalCount } from '../../utils/calcTotalCount'
import { calcTotalPrice } from '../../utils/calcTotalPrice'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { CartItem, CartSliceState } from './types'

const initialState: CartSliceState = getCartFromLS()

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(obj => obj.id === action.payload.id)
      if (findItem) {
        findItem.count++
      } else {
        state.items.push({
          ...action.payload,
          count: 1
        })
      }
      state.totalCount = calcTotalCount(state.items)
      state.totalPrice = calcTotalPrice(state.items)
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find(obj => obj.id === action.payload)
      if (findItem) findItem.count--

      state.totalCount = calcTotalCount(state.items)
      state.totalPrice = calcTotalPrice(state.items)
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter(obj => obj.id !== action.payload)
      state.totalCount = calcTotalCount(state.items)
      state.totalPrice = calcTotalPrice(state.items)
    },
    clearItems(state) {
      state.items = []
      state.totalPrice = 0
      state.totalCount = 0
    },
    discount(state) {
      let ds = state.totalPrice / 100 * 10
      state.totalPrice = state.totalPrice - ds
    }
  },
})

export const { addItem, removeItem, minusItem, clearItems, discount} = cartSlice.actions

export default cartSlice.reducer