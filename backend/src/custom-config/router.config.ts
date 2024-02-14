import { AuthRoute } from '@routes/auth/auth.route';
// import { PortalUserRoute } from '@routes/portal-user/portal.user.route';

import { Routes } from 'common-types/interfaces/routes.interface';

export const startRouterConfig: Routes[] = [
  AuthRoute.triggerUser(),
  //   PortalUserRoute.triggerUser(),
];
