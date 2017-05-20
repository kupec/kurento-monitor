import store from 'store';

export function saveLastUrl(url) {
    let lastUrls = store.get('lastUrls') || [];
    const index = lastUrls.indexOf(url);
    if (index > -1) {
        lastUrls.splice(index, 1);
    }
    lastUrls.push(url);
    store.set('lastUrls', lastUrls.slice(-5));
}