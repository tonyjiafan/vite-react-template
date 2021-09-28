import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

// configureStore创建一个redux数据
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});
