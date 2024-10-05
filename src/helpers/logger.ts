import type { Next } from '../types';
import chalk from 'chalk';

export function logger(req: Request, next: Next) {
  const start = Date.now();

  return next().then((response) => {
    const ms = Date.now() - start;
    const status = response.status;
    const method = req.method;
    const path = new URL(req.url).pathname;
    const end = Date.now();

    let color = 'green';
    let msg = '';

    if (status >= 100 && status < 200) {
      color = 'blue';
    } else if (status >= 200 && status < 300) {
      color = 'green';
    } else if (status >= 300 && status < 400) {
      color = 'yellow';
    } else if (status >= 400 && status < 500) {
      color = 'magenta';
    } else if (status >= 500) {
      color = 'red';
    }

    // @ts-ignore
    msg += `${chalk.bold.white(method.toUpperCase())} ${path} ${chalk.bold[color](response.status)}`;
    msg += ` ${chalk.bold.gray(`${end - start}ms`)}`;
    console.log(msg);

    return response;
  });
}
