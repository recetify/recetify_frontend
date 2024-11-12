import axios from "axios";

const http = axios.create({
    baseURL: 'https://my-json-server.typicode.com/HealthyL/Datos-healty-',
});
export class AuthenticationService {
    signIn(signInRequest) {
        return http.post('/authentication/sign-in/', signInRequest);
    }
    signUp(signUpRequest) {
        return http.post('/authentication/sign-up/', signUpRequest);
    }
    getObjectives(){
        return http.get('/objectives');
    }
    updateUser(id, data) {
        return http.put(`/users/${id}`, data);
    }
}