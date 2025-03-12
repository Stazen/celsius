import express, { Router } from 'express';
import config from './../../config/config';
import authRoute from './auth.route';
import buildingRoute from './building.route';
import companyRoute from './company.route';
import contactRoute from './contact.route';
import dataRoute from './data.route';
import docsRoute from './doc.routes';
import emailRoute from './email.route';
import floorRoute from './floor.route';
import healthRoute from './health.route';
import roomRoute from './room.route';
import userRoute from './user.route';

const router = express.Router();

interface IRoute {
  path: string;
  route: Router;
}

const defaultIRoute: IRoute[] = [
  {
    path: '/health',
    route: healthRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/data',
    route: dataRoute,
  },
  {
    path: '/company',
    route: companyRoute,
  },
  {
    path: '/building',
    route: buildingRoute,
  },
  {
    path: '/floor',
    route: floorRoute,
  },
  {
    path: '/room',
    route: roomRoute,
  },
  {
    path: '/email',
    route: emailRoute,
  },
  {
    path: '/contact',
    route: contactRoute,
  },
];

const devIRoute: IRoute[] = [
  // IRoute available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultIRoute.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devIRoute.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
