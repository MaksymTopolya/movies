import { configureStore } from '@reduxjs/toolkit';
import movieSlice from './movieSlice';
import serialsSlice from './serialsSlice';

const store = configureStore({
  reducer: {
    movies: movieSlice,
    serials: serialsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
