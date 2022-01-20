import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { authApi } from "./auth/authApi";
import { postsApi } from "./posts/postsApi";
import authSlice from "./auth/authSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

const authPersistConfig = {
  key: "auth",
  storage,
  whitelist: ["token"],
};

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  authApi.middleware,
  postsApi.middleware,
];

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [postsApi.reducerPath]: postsApi.reducer,
    authSlice: persistReducer(authPersistConfig, authSlice),
  },
  middleware,

  devTools: process.env.NODE_ENV === "development",
});

export const persistor = persistStore(store);

export const rootState = store.getState();
