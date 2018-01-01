/*eslint strict: ['off']*/
window.addEventListener('DOMContentLoaded', async () => {
    const root = document.getElementById('root');

    const res = await fetch('api/access_token', {credentials: 'include'});
    const json = await res.json();
    console.log(json);

    if (!json.access_token) {
        root.innerHTML = '<a href="oauth">Login</a>';
    }
    else {
        root.innerHTML = '<a href="logout">Logout</a>';
        console.time('fetch');
        const res = await fetch('./api/assets', {
            credentials: 'include',
        });
        const result = await res.json();
        console.log(result);
        console.timeEnd('fetch');
        const {jpy_base_assets: jpyBaseAssets} = result;

        console.log(typeof jpyBaseAssets.jpy);
        const tr = Object.entries(jpyBaseAssets).map(([key, value]) => `<tr><td>${key}</td><td>${value.toFixed(2)}</td></tr>`).join('');
        root.innerHTML += `<table>${tr}</table>`;
    }
});

