# ProBun

> [!WARNING]
> ProBun is a work in progress, expect many new features and changes in the future.

ProBun, a better web server for Bun. ProBun aims to enhance your web development experience by providing a more efficient and flexible server solution.

## Features

- **Fast**: ProBun is built on top of Bun.serve, a fast and efficient web server created by the Bun team. ProBun aims to be over `494.31%` better than Express. [view benchmark](https://probun.dev/docs/benchmark.html)
- **TypeScript Support**: ProBun is written in TypeScript, making it easier to write type-safe code.
- **File-based Routing**: ProBun uses the file system as the routing mechanism, making it easier to manage your routes.

## 1. Setup the App

```typescript
import { Probun, logger } from 'probun';

Probun({
  port: 3000,
  routes: 'routes',
  onReady: ({ port }) => console.log(`Server is running on ${port}`),
  middlewares: [logger],
});
```

## 2. Setup home route.

Create `routes/index.ts`. Export a function with a name of a method. In this case get.

```ts
export const GET = async (c: Route): Promise<Response> => {
  return c.json({ message: 'Hello World' });
};
```

Now go to localhost:3000 and boom!

## Getting Started

To get started with ProBun, we recommend you to read the [installation guide](https://probun.dev/docs/getting-started.html)
