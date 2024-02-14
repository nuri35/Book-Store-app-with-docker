import { SessionEntity } from '@/entities/session.entity';
import { UserPayload } from '@common-types/interfaces/payload.interface';

declare global {
  namespace Express {
    interface Request {
      currentSession?: SessionEntity;
      rfTokenPayload?: UserPayload;
    }
  }
}
