import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:3000',
});
export class AccountManagementApiService{
    getDataUsers() {
        return http.get('/users');
    }
    getObjectives(){
        return http.get('/objectives');
    }
    updateUser(id, data) {
        return http.put(`/users/${id}`, data);
    }
    getCurrentUser(id){
        return http.get(`/users/${id}`);
    }
    deleteCurrentUser(id){
        return http.delete(`/users/${id}`);
    }
}