import { baseApi } from "@/store/api/baseApi";
import {
  TCreateUserFormData,
  TLoginData,
  TUserCreationResponse,
} from "@/store/store.interfaces";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create
    createUser: builder.mutation<TUserCreationResponse, TCreateUserFormData>({
      query: (userData) => ({
        url: "users/create-user",
        method: "POST",
        credentials: "include",
        body: userData,
        contentType: "multipart/form-data",
      }),
    }),
    // login endpoint
    login: builder.mutation<TUserCreationResponse, TLoginData>({
      query: (loginData) => ({
        url: "auth/login",
        credentials: "include",
        method: "POST",
        body: loginData,
      }),
    }),
    verifyUser: builder.mutation<
      TUserCreationResponse,
      { id: string; activationToken: string }
    >({
      query: (data) => ({
        url: "auth/verify-account",
        credentials: "include",
        method: "POST",
        headers: {
          authorization: data.activationToken,
        },
        body: { id: data.id },
      }),
    }),
    revalidate: builder.mutation<TUserCreationResponse, string>({
      query: (id) => ({
        url: "auth/reactivate",
        credentials: "include",
        method: "POST",
        body: { id },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useVerifyUserMutation,
  useRevalidateMutation,
} = userApi;
