import { createRouter, createWebHistory } from "vue-router";
import PageNotFoundComponent from "@/public/pages/page-not-found.component.vue";
import accountManagementComponent from "@/accountManagement/pages/account-management.component.vue";

import SignInComponent from "@/iam/pages/sign-in.component.vue";
import SignUpComponent from "@/iam/pages/sign-up.component.vue";
import { authenticationGuard } from "@/iam/services/authentication.guard.js";
import RecipesManagementComponent from "../recipes/pages/recipes-management.component.vue";
import ShoppingviuwComponent from "../shopping/pages/shoppingviuw.component.vue";
import CartViewComponent from "../shopping/pages/CartView.vue";
import comunityCardListComponent from "@/comunityUsersManagement/pages/comunity-card-list.component.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/my-account',
            name: 'my-account',
            component: accountManagementComponent,
            meta: { title: 'Mi Cuenta', requiresAuth: true },
        },
        {
            path: '/shopping',
            component: ShoppingviuwComponent,
            meta: { title: 'Compras', requiresAuth: true },
        },
        {
            path: '/recipes',
            component: RecipesManagementComponent,
            meta: { title: 'Recetas', requiresAuth: true },
        },
        {
            path: '/cart',
            name: 'Cart',
            component: CartViewComponent,
            meta: { title: 'Carrito', requiresAuth: true },
        },
        {
            path: '/comunity',
            component: comunityCardListComponent,
            meta: { title: 'Comunidad', requiresAuth: true },
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignInComponent,
            meta: { title: 'Sign In' },
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignUpComponent,
            meta: { title: 'Sign Up' },
        },
        {
            path: '/',
            redirect: '/my-account',
        },
        {
            path: '/:pathMatch(.*)*',
            component: PageNotFoundComponent,
        },
    ],
});

// Guardián de navegación para rutas protegidas
router.beforeEach((to, from, next) => {
    const baseTitle = 'FitHub';
    document.title = `${baseTitle} | ${to.meta["title"] || "Página"}`;

    // Verificar si la ruta requiere autenticación
    if (to.meta.requiresAuth) {
        authenticationGuard(to, from, next);
    } else {
        next(); // Continuar si no se requiere autenticación
    }
});

export default router;

