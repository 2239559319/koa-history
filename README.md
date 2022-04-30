lang

En | [中文](./README-ZH.md)

# Introduction

`@wxiaochuan/koa-history` is a koa middleware that implements html5 history routes. It can flexibly configure routing on koa, and can be used in SPA projects written in vue, react and angular frameworks.

# Install
```bash
// npm
npm i @wxiaochuan/koa-history
//yarn
yarn add @wxiaochuan/koa-history

```

# use

```js
const history = require('@wxiaochuan/koa-history');
const Koa = require('Koa');

const app = new Koa();

app.use(history({
  routes: ['/user', '/post'],
  root: '/dist'
}));

```

## Option
```typescript
export interface Router {
  path: string;
  children?: Array<Router>;
}

export interface Option {
  routes?: Router | Router[] | string[];
  root: string;
  opts?: any;
}

```

## routes

### routes option is null
This setting is also known as match-all mode. When routes option is null, all request paths will return.

```js
app.use(history({
  root: '/dist'
}));
```

### routes option is string array
This setting will return when request path match routes options.

```js
app.use(history({
  routes: ['/user', '/post'],
  root: '/dist'
}));
```

### Nested Routes
Options also support nested routes.
```js
app.use(history({
  routes: [
    {
      path: '/user',
      children: [
        {
          path: 'foo'
        }
      ]
    }
  ],
  root: '/dist'
}));
```
In the example above, request path `/user` and `/user/foo` will return html file.

### Dynamic Route
Dynamic route is supportted

```js
app.use(history({
  routes: [
    {
      path: '/user/:id'
    }
  ],
  root: '/dist'
}));
```

# Advanced

## use with `koa-static`
It is recommended to use this method to return static files.
```js
const history = require('@wxiaochuan/koa-history');
const Koa = require('Koa');
const koaStatic = require('koa-static');

const app = new Koa();

app.use(history({
  routes: ['/user', '/post'],
  root: '/dist'
}));

app.use(static('/dist'));

app.listen(9000);
```

## specify index file
The default is to return the index.html file
```js
app.use(history({
  routes: ['/user', '/post'],
  root: '/dist',
  opts: {
    index: 'myfile.html'
  }
}));
```
