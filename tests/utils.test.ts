import { flatRoutes } from '../src/utils';

describe('test flat routes', () => {
  it('test one router', () => {
    const routes = {
      path: '/more'
    };

    expect(flatRoutes(routes)).toEqual(['/more']);
  });

  it('test dynamic  routes', () => {
    const dynRoutes = {
      path: '/user/:id'
    };
    expect(flatRoutes(dynRoutes)).toEqual(['/user/:id']);
  });

  it('test array router', () => {
    const routes = [
      {
        path: '/more'
      },
      {
        path: '/'
      }
    ];
    expect(flatRoutes(routes)).toEqual(['/more', '/']);
  });

  it('test children router', () => {
    const routes = {
      path: '/',
      children: [
        {
          path: '/add'
        }
      ]
    };
    expect(flatRoutes(routes)).toEqual(['/', '/add']);
  });

  it('test children ', () => {
    const routes = [
      {
        path: '/user/:id',
        children: [
          {
            path: 'profile'
          },
          {
            path: 'posts'
          }
        ]
      }
    ];
    const flattenRoutes = flatRoutes(routes);
    expect(flattenRoutes).toEqual([
      '/user/:id',
      '/user/:id/profile',
      '/user/:id/posts'
    ]);
  });
});
