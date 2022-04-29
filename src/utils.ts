import type { Router } from './types';

export function noop() {}

function walk(res: Array<any>, routes: Router | Router[], parentPath: string) {
  if (Array.isArray(routes)) {
    routes.forEach((route) => {
      res.push(route.path);
      if (route.children) {
        walk(res, route.children, parentPath + route.path);
      }
    });
  } else {
    res.push(routes.path);
    if (routes.children) {
      walk(res, routes.children, parentPath + routes.path);
    }
  }
}

export function flatRoutes(routes: Router | Router[]): Array<Pick<Router, 'path'>> {
  const res: Array<Pick<Router, 'path'>> = [];
  walk(res, routes, '');
  return res;
}
