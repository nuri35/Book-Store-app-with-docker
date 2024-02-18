import { TokenOperationType, UserType, GenreType } from '../enums/type.enum';

export interface IUserCreationData {
  name: string;
  surname: string;
  password: string;
  type?: UserType;
  mail: string;
  phone: string;
  title?: string;
}

export interface IStoreCreationData {
  name: string;
  address: string;
  phoneNumber: string;
}

export interface ITokenCreationData {
  operation: TokenOperationType;
  userId: number;
  publicId: number;
  globalDeviceName?: string;
}

export interface IBookCreationData {
  title: string;
  author: string;
  publicationYear: number;
  ISBN: string;
  genre: GenreType;
}
