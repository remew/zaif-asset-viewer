'use strict';

const Koa = require('koa');
const serve = require('koa-static');
const morgan = require('koa-morgan');
const Router = require('koa-router');
const session = require('koa-session');

const config = require('./config');

const app = new Koa;
const apiRouter = new Router({prefix: '/api'});
const callbackRouter = new Router({prefix: '/callback'});

callbackRouter.get('/', async (ctx, next) => {
    ctx.body = 'ok';
});
callbackRouter.post('/', async (ctx, next) => {
    ctx.body = 'ok';
});

const SESSION_CONFIG = {
};

app.keys = config.cookieKeys;
app.use(session(SESSION_CONFIG, app));
app.use(morgan('dev'));
app.use(serve('static'));
app.use(apiRouter.routes());
app.use(callbackRouter.routes());

app.listen(8000);

