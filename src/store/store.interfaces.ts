export interface TCreateUserFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileImage: FileList;
}

export type TErrorResponse = {
  success: boolean;
  status: number;
  message: string;
  error: Error;
};

export interface TUser {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: string;
  role: TUserRole;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  passwordChangedAt?: Date;
  verificationToken?: string;
}

export type TUserCreationResponse = {
  success: boolean;
  message: string;
  data?: TUser;
};

export type TUserLoggedOutResponse = {
  success: boolean;
  message: string;
};

export type TLoginData = {
  email: string;
  password: string;
};

export type TresetPasswordPayload = {
  payload: {
    id: string;
    password: string;
  };
  token: string;
};

export type TUserRole = "user" | "seller" | "admin";
