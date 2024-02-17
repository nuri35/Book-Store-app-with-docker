import { AuthRoute } from '@routes/auth/auth.route';
import { UserRoute } from '@routes/user/user.route';

import { Routes } from 'common-types/interfaces/routes.interface';

export const startRouterConfig: Routes[] = [
  AuthRoute.triggerUser(),
  UserRoute.triggerUser(),
];
