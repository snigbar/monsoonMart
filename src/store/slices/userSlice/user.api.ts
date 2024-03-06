import { baseApi } from "@/store/api/baseApi";
import {
  TCreateUserFormDAta,
  TLoginData,
  TUserCreationResponse,
} from "@/store/store.interfaces";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation<TUserCreationResponse, TCreateUserFormDAta>({
      query: (userData) => ({
        url: "users/create-user",
        method: "POST",
        body: userData,
      }),
    }),
    login: builder.mutation<TUserCreationResponse, TLoginData>({
      query: (loginData) => ({
        url: "auth/login",
        credentials: "include",
        method: "POST",
        body: loginData,
      }),
    }),
  }),
});

export const { useCreateUserMutation, useLoginMutation } = userApi;
