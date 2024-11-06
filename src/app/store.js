// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import nameReducer from '../features/nameSlice'

const store = configureStore({
  reducer: {
    name: nameReducer,
  },
});

export default store;
