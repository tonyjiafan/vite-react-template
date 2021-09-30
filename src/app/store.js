import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '@/features/counter/counterSlice';
import editorReducer from '@/features/editor/editorSlice';

// configureStore创建一个redux数据
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    editor: editorReducer,
  },
});
