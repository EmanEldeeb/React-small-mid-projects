import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      state.cartItems.push(action.payload);
    },
    deleteCartItem(state, action) {
      state.cartItems = state.cartItems.filter(
        (item) => item.pizzaId !== action.payload
      );
    },
    increaseQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.pizzaId === action.payload
      );
      if (item) {
        item.quantity++;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    decreaseQuantity(state, action) {
      const item = state.cartItems.find(
        (item) => item.pizzaId === action.payload
      );
      if (item.quantity === 1)
        cartSlice.caseReducers.deleteCartItem(state, action);
      if (item) {
        item.quantity--;
        item.totalPrice = item.quantity * item.unitPrice;
      }
    },
    clearCart(state, action) {
      state.cartItems = [];
    },
  },
});

export const cartReducer = cartSlice.reducer;

export const {
  addToCart,
  clearCart,
  deleteCartItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export const getCurrentQuantity = (id) => (store) => {
  const item = store.cart.cartItems.find((item) => item.pizzaId === id);
  if (item) return item.quantity;
  else return null;
};
export const getCurrentPrice = (id) => (store) => {
  const item = store.cart.cartItems.find((item) => item.pizzaId === id);
  if (item) return item.totalPrice;
  else return null;
};

export const getTotalPrice = (store) =>
  store.cart.cartItems.reduce((sum, curitem) => sum + curitem.totalPrice, 0);
