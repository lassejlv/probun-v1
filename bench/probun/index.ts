import { Probun, logger } from '../../lib';

Probun({
  port: 3000,
  routes: 'routes',
  onReady: ({ port }) => console.log(`Server is running on ${port}`),
  middlewares: [logger],
});
