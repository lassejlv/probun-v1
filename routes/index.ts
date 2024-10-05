import { Route } from "../lib";

export const GET = async (c: Route): Promise<Response> => {
  return c.json({ message: "Hello World" });
};

export const POST = async (c: Route): Promise<Response> => {
  const body = await c.req.json();
  return c.json(body);
};

export const PUT = async (c: Route): Promise<Response> => {
  return c.json({ message: "PUT request" });
};

export const DELETE = async (c: Route): Promise<Response> => {
  return c.json({ message: "DELETE request" });
};
