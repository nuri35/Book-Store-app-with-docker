import { Response } from 'express';

export class UserHelper {
  static startCookie(tokenRf: string, res: Response) {
    res.cookie('jwt', tokenRf, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      domain: process.env.COOKIE_DOMAIN,
      maxAge: 1000 * 60 * 30,
    });
  }
}
