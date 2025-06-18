import { configureStore } from '@reduxjs/toolkit';
import {
    TypedUseSelectorHook,
    useDispatch as useAppDispatch,
    useSelector as useAppSelector
} from 'react-redux';

import reducers from './slice/reducer';

export type RootState = ReturnType<typeof reducers>;
export type AppDispatch = typeof store.dispatch;

const store = configureStore({
    reducer: reducers
});

const { dispatch } = store;

const useDispatch = () => useAppDispatch<AppDispatch>();
const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

export { store, dispatch, useSelector, useDispatch };
