import {createRouter, createWebHistory} from "vue-router";
import PageNotFoundComponent from "@/public/pages/page-not-found.component.vue";
import accountManagementComponent from "@/accountManagement/pages/account-management.component.vue";
import exercisesCardListComponent from "@/rutineManagement/pages/exercises-card-list.component.vue";
import productsCardListComponent from "@/productsManagement/pages/products-card-list.component.vue";
import subscriptionManagementComponent from "@/subscription/pages/subscription-management.component.vue";
import paymentGatewayComponent from "@/subscription/pages/payment-gateway.component.vue";
import nutritionsCardListComponent from "@/nutritionManagement/pages/nutritions-card-list.component.vue";
import SignInComponent from "@/iam/pages/sign-in.component.vue";
import SignUpComponent from "@/iam/pages/sign-up.component.vue";
import {authenticationGuard} from "@/iam/services/authentication.guard.js";
import RecipesManagementComponent from "../recipes/pages/recipes-management.component.vue";
import ShoppingviuwComponent from "../shopping/pages/shoppingviuw.component.vue";
import CartViewComponent from "../shopping/pages/CartView.vue";
import comunityCardListComponent from "@/comunityUsersManagement/pages/comunity-card-list.component.vue";

//Rutas de las seccions de la Apliacion
const router = createRouter({
    history: createWebHistory(),
    routes: [

        { path: '/my-account',name:'my-account', component: accountManagementComponent, meta: { title: 'Mi Cuenta' }, },
        { path: '/exercises', component: ShoppingviuwComponent, meta: { title: 'Compras' }, },
        { path: '/nutritions', component: RecipesManagementComponent, meta: { title: 'Recetas' }, },
        {
            path: '/cart',
            name: 'Cart',
            component: CartViewComponent,
            meta: { title: 'Carrito', requiresAuth: false }
        },

        { path: '/comunity', component: comunityCardListComponent, meta: { title: 'Comunidad' }, },

        { path: '/sign-in', name: 'sign-in', component: SignInComponent, meta: { title: 'Sign In' } },
        { path: '/sign-up', name: 'sign-up', component: SignUpComponent, meta: { title: 'Sign Up' } },
        { path: '/',  redirect: '/my-account' },
        { path: '/:pathMatch(.*)*', component: PageNotFoundComponent},

    ]
});

router.beforeEach((to, from, next) => {
    let baseTitle = 'Recetify';
    document.title = `${ baseTitle } | ${to.meta["title"]}`;
    authenticationGuard(to, from, next);
});

export default router;

