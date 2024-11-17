import {defineStore} from "pinia";
import {AuthenticationService} from "./authentication.service.js";
import {SignInResponse} from "../model/sign-in.response.js";
import {SignUpResponse} from "../model/sign-up.response.js";
import {useAuthUserStore} from "@/iam/services/authUser.store.js";

const authenticationService = new AuthenticationService();

export const useAuthenticationStore = defineStore( {
    id: 'authentication',
    state: () => ({
        isAuthenticated: false, // Variable para almacenar si el usuario está autenticado
        token: null, // El token de sesión o cualquier otra información relevante
    }),
    getters: {
        isSignedIn: (state) => state["signedIn"],
        currentUserId: state => state["userId"],
        currentUserEmail: state => state["userEmail"],
        currentToken: () => localStorage.getItem('token')
    },
    actions: {
        async signIn(signInRequest, router) {
            try {
                console.log('state1', signInRequest);
                const response = await authenticationService.signIn(signInRequest);
                console.log('state2', signInRequest);
                let signInResponse = new SignInResponse(response.data.id, response.data.userEmail, response.data.token);
                this.signedIn = true;
                this.userId = signInResponse.id;
                this.userEmail = signInResponse.userEmail;
                console.log('state3', signInRequest);
                localStorage.setItem('token', signInResponse.token);
                console.log(signInResponse);
                router.push({name: 'my-account'});
            } catch (error) {
                router.push({name: 'sign-in'});
            }
        },
        //PERMITIR AL USUARIO LOGEARSE
        async verifyUser(loginRequest, router) {
            try {
                // Obtener todos los usuarios del backend
                const response = await authenticationService.getAll();
                const users = response.data;

                // Buscar el usuario que coincida con las credenciales proporcionadas
                const user = users.find(user =>
                    user.email === loginRequest.email &&
                    user.password === loginRequest.password
                );

                if (user) {
                    useAuthenticationStore().isAuthenticated=true;
                    console.log("User verified successfully!");
                    // Generar un token real o usar uno ficticio
                    this.token = 'fake-token'; // Reemplazar con un token real si es necesario

                    // Guardar el token en localStorage para persistencia
                    localStorage.setItem('token', this.token);

                    // Guardar el ID y email del usuario en el store
                    this.userId = user._id;
                    this.userEmail = user.email;

                    // Usar el store de AuthUser para guardar más información si es necesario
                    const authUserStore = useAuthUserStore();
                    authUserStore.setUserId(user._id); // Guardar el ID de usuario en otro store si lo necesitas
                    console.log("User ID:", user._id);
                    console.log("isAuthenticated:", useAuthenticationStore().isAuthenticated);
                    // Redirigir a la página de cuenta
                    router.push({ name: 'my-account' });
                } else {
                    console.error("User verification failed. Invalid credentials.");
                    router.push({ name: 'sign-up' }); // Redirigir al registro si el usuario no está registrado
                }
            } catch (error) {
                console.error("Error verifying user:", error);
            }
        },
        logout() {
            // Lógica para cerrar sesión
            useAuthenticationStore().isAuthenticated = false;
            this.token = null;
        },
        //CREAR USUARIO AL REGISTRARSE
        async signUp(signUpRequest, router) {
            authenticationService.signUp(signUpRequest)
                .then(response => {
                    let signUpResponse = new SignUpResponse(response.data.message);
                    console.log(signUpResponse.message);
                    router.push({name: 'sign-in'});
                    console.log(signUpResponse);
                })
                .catch(error => {
                    console.error(error);
                    router.push({name: 'sign-up'});
                });
        },
        async signOut(router) {
            this.signedIn = false;
            this.userId = 0;
            this.userEmail = '';
            localStorage.removeItem('token');
            console.log('Signed out');
            await router.push({name: 'sign-in'});
        }
    }
})