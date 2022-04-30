import { resolve } from 'path';
import type { Context, Next } from 'koa';
import send from 'koa-send';
import { pathToRegexp } from 'path-to-regexp';
import type { Option } from './types';
import { flatRoutes, pathIsFile, noop } from './utils';

function history(option: Option) {
  const { routes, root, opts = {}, shield = true } = option;
  opts.root = resolve(root);
  if (opts.index !== false) {
    opts.index = opts.index || 'index.html';
  }

  const routesArr = routes ? flatRoutes(routes) : [];
  const routesRegArr = routesArr.map((path) => pathToRegexp(path, [], {}));

  return async (ctx: Context, next: Next) => {
    await next();
    const { body, path } = ctx;
    if (body && pathIsFile(path)) {
      return;
    }

    if (!routes) {
      await send(ctx, '.', opts);
      return;
    }
    const matched = routesRegArr.some((reg) => reg.test(path));
    if (matched) {
      await send(ctx, '.', opts);
    } else if (!pathIsFile(path) && body && shield) {
      ctx.body = 'Not Found';
      ctx.type = 'text';
      ctx.status = 404;
    } else {
      noop();
    }
  };
}

export = history;
