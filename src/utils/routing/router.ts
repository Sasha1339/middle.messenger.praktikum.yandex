import { Route } from './route.ts';
import Block from '../block/block.ts';

export class Router {
    routes: Route<Block>[] = [];
    static __instance: Router | null = null;
    history: History | null = null;
    _currentRoute: Route<Block> | null = null;
    _rootQuery: string = '';

    constructor(rootQuery: string) {
        if (Router.__instance) {
            return Router.__instance;
        }

        this.routes = [];
        this.history = window.history;
        this._currentRoute = null;
        this._rootQuery = rootQuery;

        Router.__instance = this;
    }

    use(pathname: string, block: new (...args: any[]) => Block, params?: Record<string, unknown>): Router {
        const route = new Route(pathname, block, { rootQuery: this._rootQuery }, params);

        this.routes.push(route);

        return this;
    }

    start() {
        window.onpopstate = ((event: PopStateEvent) => {
            const target = event.currentTarget as Window;
            this._onRoute(target.location.pathname);
        }).bind(this);

        this._onRoute(window.location.pathname);
    }

    _onRoute(pathname: string) {
        const route = this.getRoute(pathname);
        if (!route) {
            return;
        }

        if (this._currentRoute && this._currentRoute !== route) {
            this._currentRoute.leave();
        }

        this._currentRoute = route;
        route.navigate(pathname);
    }

    go(pathname: string) {
        this.history?.pushState({}, '', pathname);
        this._onRoute(pathname);
    }

    back() {
        this.history?.back();
    }

    forward() {
        this.history?.forward();
    }

    getRoute(pathname: string) {
        return this.routes.find((route) => route.match(pathname));
    }
}
