import { resolve } from 'path';
import type { Context, Next } from 'koa';
import send from 'koa-send';
import { pathToRegexp } from 'path-to-regexp';
import type { Option } from './types';
import { flatRoutes } from './utils';

function history(option: Option) {
  const { routes, root, opts = {} } = option;
  opts.root = resolve(root);
  if (opts.index !== false) {
    opts.index = opts.index || 'index.html';
  }

  const routesArr = routes ? flatRoutes(routes) : [];
  const routesRegArr = routesArr.map((path) => pathToRegexp(path, [], {}));

  return async (ctx: Context, next: Next) => {
    await next();
    const { body, path } = ctx;
    if (body) {
      return;
    }

    if (!routes) {
      await send(ctx, '.', opts);
    }
    const matched = routesRegArr.some((reg) => reg.test(path));
    if (matched) {
      await send(ctx, '.', opts);
    }
  };
}

export = history;
