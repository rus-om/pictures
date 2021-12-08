import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import {picturesReducer} from "./Pages/Pictures/picturesSlice";

const rootReducer = combineReducers({
    picturesReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
