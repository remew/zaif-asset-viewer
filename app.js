'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const morgan = require('koa-morgan');
const Router = require('koa-router');

const app = new Koa;
const apiRouter = new Router({prefix: '/api'});
const callbackRouter = new Router({prefix: '/callback'});

callbackRouter.get('/', async (ctx, next) => {
    ctx.body = 'ok';
});
callbackRouter.post('/', async (ctx, next) => {
    ctx.body = 'ok';
});

app.use(morgan('dev'));
app.use(serve('static'));
app.use(apiRouter.routes());
app.use(callbackRouter.routes());

app.listen(8000);

