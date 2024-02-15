import { TokenOperationType } from '../enums/type.enum';

export interface IUserCreationData {
  name: string;
  surname: string;
  password: string;
  mail: string;
  phone: string;
  title?: string;
}

export interface ITokenCreationData {
  operation: TokenOperationType;
  userId: number;
  publicId: number;
  globalDeviceName?: string;
}
