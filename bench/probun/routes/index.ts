import { Route } from '../../../lib';

export const GET = async (c: Route): Promise<Response> => {
  return c.json({ message: 'Hello World' });
};
