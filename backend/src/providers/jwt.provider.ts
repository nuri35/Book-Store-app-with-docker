import jwt from 'jsonwebtoken';
import { UserPayload } from '@common-types/interfaces/payload.interface';
import { TokenOperationType } from '@common-types/enums/type.enum';
import { v4 as uuidv4 } from 'uuid';
import { TokenSetting } from '@common-types/interfaces/token.setting.interface';

export class JwtProvider {
  static signJWT(id: number, operation: TokenOperationType, jti?: string) {
    const tokenSettings: TokenSetting = {
      jwtKey: process.env.JWT_KEY!,
      option: {
        expiresIn: '15m',
        noTimestamp: true,
        algorithm: 'HS512',
        jwtid: jti ? jti : uuidv4(),
      },
    };

    if (operation === TokenOperationType.loginAfterValidRegistration) {
      tokenSettings.jwtKey = process.env.JWT_ACCESS_KEY!;
      tokenSettings.option.expiresIn = '10m';
    }

    if (operation === TokenOperationType.refreshToken) {
      tokenSettings.jwtKey = process.env.JWT_REFRESH_KEY!;
      tokenSettings.option.expiresIn = '30m';
    }

    const token = jwt.sign({ id }, tokenSettings.jwtKey, tokenSettings.option);
    return {
      token,
      jwtid: tokenSettings.option.jwtid,
    };
  }

  static generateUrlToken(token: string, endpoint: string): string {
    return `http://${process.env.APP_HOST}:${process.env.CLIENT_PORT}/api/v1/member/${endpoint}?token=${token}`;
  }

  static verifyJWT(token: string, operation: TokenOperationType): UserPayload {
    let jwtKey = process.env.JWT_KEY!;

    const decoded = jwt.verify(token, jwtKey) as unknown as UserPayload;

    return decoded;
  }
}
