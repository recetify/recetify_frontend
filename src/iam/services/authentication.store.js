import {defineStore} from "pinia";
import {AuthenticationService} from "./authentication.service.js";
import {SignInResponse} from "../model/sign-in.response.js";
import {SignUpResponse} from "../model/sign-up.response.js";
import {useAuthUserStore} from "@/iam/services/authUser.store.js";

const authenticationService = new AuthenticationService();

export const useAuthenticationStore = defineStore( {
    id: 'authentication',
    state: () => ({signedIn: false, userId: 0, userEmail: ''}),
    getters: {
        isSignedIn: (state) => state["signedIn"],
        currentUserId: state => state["userId"],
        currentUserEmail: state => state["userEmail"],
        currentToken: () => localStorage.getItem('token')
    },
    actions: {
        async signIn(signInRequest, router) {
            try {
                const response = await authenticationService.signIn(signInRequest);
                let signInResponse = new SignInResponse(response.data.id, response.data.userEmail, response.data.token);
                this.signedIn = true;
                this.userId = signInResponse.id;
                this.userEmail = signInResponse.userEmail;
                localStorage.setItem('userId', signInResponse.id); // Almacenar userId en localStorage
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
                    console.log("User verified successfully!");

                    // Guardar el ID del usuario en el store
                    const authUserStore = useAuthUserStore();
                    authUserStore.setUserId(user._id); // Aquí usamos `user.id` directamente

                    localStorage.setItem('userId', user._id); // Almacenar userId en localStorage

                    console.log(user._id)
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
        //CREAR USUARIO AL REGISTRARSE
        async signUp(signUpRequest, router) {
            authenticationService.signUp(signUpRequest)
                .then(response => {
                    let signUpResponse = new SignUpResponse(response.data.message);

                    localStorage.setItem('userId', response.data.id); // Almacenar userId en localStorage

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