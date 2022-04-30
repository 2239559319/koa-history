import { posix } from 'path';
import type { Router } from './types';

const { join, extname } = posix;

export function noop() {}

export function pathIsFile(path) {
  return extname(path) !== '';
}

function walk(
  res: Array<any>,
  routes: Router | Router[] | string[],
  parentPath: string
) {
  if (typeof routes === 'string') {
    res.push(routes);
  } else if (Array.isArray(routes)) {
    routes.forEach((route) => {
      if (typeof route === 'string') {
        res.push(route);
      } else {
        const curPath = join(parentPath, route.path);
        res.push(curPath);
        if (route.children) {
          walk(res, route.children, curPath);
        }
      }
    });
  } else {
    const curPath = join(parentPath, routes.path);
    res.push(curPath);
    if (routes.children) {
      walk(res, routes.children, curPath);
    }
  }
}

export function flatRoutes(
  routes: Router | Router[] | string[]
): Array<string> {
  const res: Array<string> = [];
  walk(res, routes, '');
  return res;
}
