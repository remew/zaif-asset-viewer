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
    }
});

