import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000',
});
export class AuthenticationService {

    signIn(signInRequest) {
        return http.post('/authentication/sign-in/', signInRequest);
    }
    getAll(){
        return http.get('/all-users');
    }
    signUp(signUpRequest) {
        return http.post('/user', signUpRequest);
    }
    getObjectives(){
        return http.get('/objectives');
    }
    updateUser(id, data) {
        return http.put(`/users/${id}`, data);
    }
    getCurrentUser() {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            return Promise.reject("User ID not found in local storage");
        }
        return http.get(`/users/${userId}`);
    }
}