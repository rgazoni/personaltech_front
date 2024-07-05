import { configureStore } from "@reduxjs/toolkit";
import requests from "./requests";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    requests: requests,
  },
});

export const useRequestDispatch = useDispatch<typeof store.dispatch>;
