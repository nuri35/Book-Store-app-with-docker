import { CorsOptions } from 'cors';
const allowedList = ['http://localhost:3001', 'http://127.0.0.1:3001'];

export const corsOptions: CorsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    if (allowedList.includes(origin ?? '') || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};
