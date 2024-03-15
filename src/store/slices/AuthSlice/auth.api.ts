import { baseApi } from "@/store/api/baseApi";
import {
  TCreateUserFormData,
  TLoginData,
  TUserCreationResponse,
  TUserLoggedOutResponse,
  TresetPasswordPayload,
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
    logout: builder.mutation<TUserLoggedOutResponse, void>({
      query: () => ({
        url: "auth/login",
        method: "POST",
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

    forgotPassword: builder.mutation<TUserCreationResponse, { email: string }>({
      query: (data) => ({
        url: "auth/forgot-password",
        method: "POST",
        body: data,
      }),
    }),

    changePassword: builder.mutation<
      TUserCreationResponse,
      TresetPasswordPayload
    >({
      query: (data) => ({
        url: "auth/reset-password",
        method: "POST",
        credentials: "include",
        body: data,
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginMutation,
  useVerifyUserMutation,
  useRevalidateMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useLogoutMutation,
} = userApi;
