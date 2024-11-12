import axios from "axios";

const http = axios.create({
    baseURL: 'https://my-json-server.typicode.com/HealthyL/Datos-healty-',
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
}