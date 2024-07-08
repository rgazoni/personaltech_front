import { configureStore } from "@reduxjs/toolkit";
import user from "./user";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import page from "./page";

export const store = configureStore({
  reducer: {
    user: user,
    page: page
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// @hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

