export type TCreateUserFormDAta = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  profileImage: File;
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
