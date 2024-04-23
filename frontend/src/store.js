import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/api/apiSlice.js";
import authReducer from "./slices/state/authSlice.js";
import boardReducer from "./slices/state/boardSlice.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
    boards: boardReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
