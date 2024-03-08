import { baseApi } from "./api/baseApi";
import authReducer from "./slices/AuthSlice/auth.slice";

export const baseReducers = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: authReducer,
};
