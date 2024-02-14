import { Algorithm } from 'jsonwebtoken';

export interface TokenSetting {
  jwtKey: string;
  option: {
    expiresIn: string;
    noTimestamp: boolean;
    algorithm: Algorithm;
    jwtid: string;
  };
}
