import {useAuthenticationStore} from "./authentication.store.js";

export const authenticationGuard = (to, from, next) => {
    const authenticationStore = useAuthenticationStore();
    const isAnonymous = !authenticationStore.isSignedIn;
    const publicRoutes = [
        '/sign-in',
        '/sign-up',
        '/page-not-found',
        '/my-account',
        '/exercises',
        '/nutritions',
        '/comunity',
        '/cart' // Agregamos /cart como ruta pública
    ];
    const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path);

    if (isAnonymous && routeRequiresToBeAuthenticated) {
        return next({name: 'sign-in'});
    } else {
        next();
    }
};

/*
export const authenticationGuard = (to, from, next) => {
    const authenticationStore = useAuthenticationStore();
    const isAnonymous = !authenticationStore.isSignedIn;
    const publicRoutes = ['/sign-in', '/sign-up', '/page-not-found'];
    const privateRoutes = ['/my-account', '/exercises', '/nutritions'];
    const routeRequiresToBeAuthenticated = !publicRoutes.includes(to.path) || privateRoutes.includes(to.path);

    if (isAnonymous && routeRequiresToBeAuthenticated) return next({name: 'sign-in'});
    else next();
}*/