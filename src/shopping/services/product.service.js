// product.service.js
import http from "../../shared/services/http-common.js";
import {Product} from "../model/product.entity";

export class ProductService {
    resourceEndpoint = '/products';

    async getAll() {
        const response = await http.get(this.resourceEndpoint);
        return response.data.map(productData => new Product(productData));
    }

    async findByCategory(category) {
        const products = await this.getAll();
        // Filtrar productos según la categoría proporcionada
        return products.filter(product => product.category === category);
    }
}
