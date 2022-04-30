lang

[En](./README.md) | 中文

# 简介

`@wxiaochuan/koa-history`是一个实现html5路由的一个`koa`中间件。它有灵活的配置，可以支持由vue,react,angular框架写的单页应用。

# 安装
```bash
// npm
npm i @wxiaochuan/koa-history
//yarn
yarn add @wxiaochuan/koa-history

```

# 使用

```js
const history = require('@wxiaochuan/koa-history');
const Koa = require('Koa');

const app = new Koa();

app.use(history({
  routes: ['/user', '/post'],
  root: '/dist'
}));

```

## 选项
```typescript
export interface Router {
  path: string;
  children?: Array<Router>;
}

export interface Option {
  routes?: Router | Router[] | string[];
  shield?: boolean;
  root: string;
  opts?: any;
}

```

## 路由配置

### 路由配置项为空
这时也被称为全部匹配模式。当路由配置为空时，所有的请求都会返回html文件。
```js
app.use(history({
  root: '/dist'
}));
```

### 路由配置是一个字符串数组
此时当请求与数组中某个配置匹配会返回
```js
app.use(history({
  routes: ['/user', '/post'],
  root: '/dist'
}));
```

### 嵌套路由
配置也支持嵌套路由
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
在上面这个例子中，请求路径`/user` 和 `/user/foo` 会返回html文件.

### 动态路由
支持动态路由
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

# 高级

## 和`koa-static`一起使用
推荐使用这种方式来返回静态文件
```js
const history = require('@wxiaochuan/koa-history');
const Koa = require('Koa');
const koaStatic = require('koa-static');

const app = new Koa();

app.use(history({
  routes: ['/user', '/post'],
  root: '/dist'
}));

app.use(koaStatic('/dist'));

app.listen(9000);
```

## 指定返回文件
默认返回目录下的`index.html`文件
```js
app.use(history({
  routes: ['/user', '/post'],
  root: '/dist',
  opts: {
    index: 'myfile.html'
  }
}));
```

## 开启文件路由

默认情况下非路由option定义的path会返回404，无论是否真的存在文件，默认会屏蔽。在上面的例子中，尽管存在`dist/index.html`文件但是当请求path=/的时候还是会返回404。想要关闭这种行为可以将`shield`设置为`false`。
