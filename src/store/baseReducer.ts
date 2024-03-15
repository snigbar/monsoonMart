import { baseApi } from "./api/baseApi";
import authReducer from "./slices/AuthSlice/auth.slice";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "auth",
  storage,
  whitelist: ["isLoggedIn", "isVerified", "role"],
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const baseReducers = {
  [baseApi.reducerPath]: baseApi.reducer,
  auth: persistedAuthReducer,
};
