import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cartSlice from './slices/cartSlice';
import pizzasSlice from './slices/pizzasSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
    reducer: { filterSlice, cartSlice, pizzasSlice },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispach = typeof store.dispatch;

export const useAppDispach = () => useDispatch<AppDispach>();
