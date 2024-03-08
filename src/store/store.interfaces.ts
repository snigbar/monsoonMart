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
  role: string;
  isVerified: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type TUserCreationResponse = {
  statusCode: number;
  success: boolean;
  message: string;
  data?: TUser;
};

export type TLoginData = {
  email: string;
  password: string;
};
