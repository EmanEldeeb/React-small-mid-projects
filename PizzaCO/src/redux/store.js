import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from './UserSlice';
import { cartReducer } from '../features/cart/CartSlice';
const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
  },
});

export default store;
