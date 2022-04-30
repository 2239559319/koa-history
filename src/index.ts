import { resolve } from 'path';
import type { Context, Next } from 'koa';
import send from 'koa-send';
import type { Option } from './types';

function history(option: Option) {
  const { routes, root, opts = {} } = option;
  opts.root = resolve(root);
  if (opts.index !== false) {
    opts.index = opts.index || 'index.html';
  }

  return async (ctx: Context, next: Next) => {
    await next();
    if (ctx.body) {
      return;
    }

    if (!routes) {
      send(ctx, ctx.path, opts);
    }

    send(ctx, ctx.path, opts);
  };
}

export default history;
