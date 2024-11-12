import axios from "axios";

const http = axios.create({
    baseURL: 'https://my-json-server.typicode.com/HealthyL/Datos-healty-',
});
export class ProductApiService {
    getProducts() {
        return http.get('/products');
    }
    getCategory(){
        return http.get('/categories');
    }
}