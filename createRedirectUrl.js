'use strict';

module.exports = function createRedirectUrl(state, clientId) {
    const urlBase = 'https://zaif.jp/oauth';
    const data = {
        client_id: clientId,
        state,
        response_type: 'code',
        scope: 'info',
        redirect_uri: 'https://apps.remew.net/zaif-asset-viewer/callback',
    };

    return `${urlBase}?${Object.entries(data).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join('&')}`;
};

