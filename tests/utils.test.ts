import { flatRoutes } from '../src/utils';

describe('test flat routes', () => {
  it('test one router', () => {
    const rouets = {
      path: '/more'
    };

    expect(flatRoutes(rouets)).toEqual(['/more']);
  });
});
