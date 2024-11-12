import axios from "axios";

const http = axios.create({
    baseURL: 'https://my-json-server.typicode.com/HealthyL/Datos-healty-',
});
export class SubscriptionApiService {
    getAllPlans() {
        return http.get('/plans');
    }
}