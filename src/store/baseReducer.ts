import { baseApi } from "./api/baseApi";
import userReducer from "./slices/userSlice/user.slice";

export const baseReducers = {
  [baseApi.reducerPath]: baseApi.reducer,
  user: userReducer,
};
