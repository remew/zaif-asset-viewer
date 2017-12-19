'use strict';

const crypto = require('crypto');
const {promisify} = require('util');
const randomFill = promisify(crypto.randomFill);

const Koa = require('koa');
const serve = require('koa-static');
const morgan = require('koa-morgan');
const Router = require('koa-router');
const session = require('koa-session');
const agent = require('superagent');

const createRedirectUrl = require('./createRedirectUrl');
const config = require('./config');

const app = new Koa;
const router = new Router();
const apiRouter = new Router({prefix: '/api'});

router.get('/oauth', async (ctx, next) => {
    const buf = await randomFill(Buffer.alloc(16));
    const id = buf.toString('hex');
    ctx.session.id = id;
    const url = createRedirectUrl(id, config.apiKeys.clientId);
    ctx.redirect(url);
});
router.get('/callback', async (ctx, next) => {
    const {state, code} = ctx.request.query;
    if (state !== ctx.session.id) {
        return ctx.status = 400;
    }
    const data = {
        code,
        grant_type: 'authorization_code',
        client_id: config.apiKeys.clientId,
        client_secret: config.apiKeys.clientSecret,
        redirect_uri: 'https://apps.remew.net/zaif-asset-viewer/callback',
    };
    console.log(data);
    const res = await agent.post('https://oauth.zaif.jp/v1/token').type('form').send(data).catch(e => e);
    if (!res.body) {
        console.log(res);
        throw res;
    }
    console.log(res.body);
    ctx.session.accessToken = res.body.access_token;
    ctx.session.refreshToken = res.body.refresh_token;
    ctx.redirect('./');
});

apiRouter.get('/access_token', async (ctx, next) => {
    const {accessToken} = ctx.session;
    ctx.body = {
        access_token: accessToken,
    };
});

apiRouter.get('/refresh_token', async (ctx, next) => {
    const {refreshToken} = ctx.session;
    if (!refreshToken) {
        ctx.status = 401;
    }
    const data = {
        grant_type: 'refresh_token',
        client_id: config.apiKeys.clientId,
        client_secret: config.apiKeys.clientSecret,
        refresh_token: refreshToken,
    };
    console.log(data);
    const res = await agent.post('https://oauth.zaif.jp/v1/refresh_token').type('form').send(data).catch(e => e);
    console.log(res.body);
    ctx.session.accessToken = res.body.access_token;
    ctx.session.refreshToken = res.body.refresh_token;
    ctx.body = {
        access_token: res.body.access_token,
    };
});

const SESSION_CONFIG = {
};

app.keys = config.cookieKeys;
app.use(session(SESSION_CONFIG, app));
app.use(morgan('dev'));
app.use(serve('static'));
app.use(router.routes());
app.use(apiRouter.routes());

app.listen(8000);

