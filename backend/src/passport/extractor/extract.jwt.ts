import { Request } from 'express';

export const cookieExtractor = (req: Request) => {
  const refreshToken = req.cookies.jwt;

  if (!refreshToken) {
    return null;
  }

  return refreshToken;
};
