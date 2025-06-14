import { homePageView } from "../view/home_page.js"

export const routePathenames = {
    HOME: '/',
}

export const routes = [
    {path: routePathenames.HOME, page: homePageView},
];

export function routing(pathname, hash) {
    const route = routes.find(r => r.path == pathname);
    if (route) {
        if (hash && hash.length > 1) {
            route.page(hash.substring(1));
        } else {
            route.page();
        }
    } else {
       routes[0].page();
    }
}