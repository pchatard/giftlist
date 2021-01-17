export default function ({ store, route }) {
    const footerPages = ['/', '/login', '/register'];
    if (footerPages.includes(route.path)) {
        store.dispatch('footer/setFooter', true);
    } else {
        store.dispatch('footer/setFooter', false);
    }
}
