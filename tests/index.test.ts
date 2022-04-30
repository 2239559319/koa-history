import { join } from 'path';
import { createServer } from 'http';
import Koa from 'koa';
import request from 'supertest';
import history from '../src';

describe('test sample server', () => {
  const routes = [
    {
      path: '/user'
    },
    {
      path: '/post'
    }
  ];

  const app = new Koa();
  app.use(
    history({
      routes,
      root: join(__dirname, './fixtures')
    })
  );
  const server = createServer(app.callback());
  it('history route match', async () => {
    const response1 = await request(server).get('/user');
    expect(response1.statusCode).toBe(200);

    const response2 = await request(server).get('/post');
    expect(response2.statusCode).toBe(200);

    const response3 = await request(server).get('/user/hello');
    expect(response3.statusCode).not.toBe(200);

    const response4 = await request(server).get('/');
    expect(response4.statusCode).toBe(404);
  });
});

describe('test children routes', () => {
  const routes = [
    {
      path: '/user/:id'
    },
    {
      path: '/post',
      children: [
        {
          path: 'foo'
        },
        {
          path: 'bar/:name'
        }
      ]
    }
  ];

  const app = new Koa();
  app.use(
    history({
      routes,
      root: join(__dirname, './fixtures')
    })
  );
  const server = createServer(app.callback());

  it('history route match', async () => {
    const response1 = await request(server).get('/user/12');
    expect(response1.statusCode).toBe(200);

    const response2 = await request(server).get('/user');
    expect(response2.statusCode).not.toBe(200);

    const response3 = await request(server).get('/post');
    expect(response3.statusCode).toBe(200);

    const response4 = await request(server).get('/post/foo');
    expect(response4.statusCode).toBe(200);

    const response5 = await request(server).get('/post/bar/xiaochuan');
    expect(response5.statusCode).toBe(200);
  });
});

describe('all mode', () => {
  const app = new Koa();
  app.use(
    history({
      root: join(__dirname, './fixtures')
    })
  );
  const server = createServer(app.callback());

  it('history match', async () => {
    const response1 = await request(server).get('/user/12');
    expect(response1.statusCode).toBe(200);

    const response2 = await request(server).get('/user');
    expect(response2.statusCode).toBe(200);

    const response3 = await request(server).get('/');
    expect(response3.statusCode).toBe(200);

    const response4 = await request(server).get('/foo');
    expect(response4.statusCode).toBe(200);
  });
});
