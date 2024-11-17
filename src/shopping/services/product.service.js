import http from "../../shared/services/http-common.js";
import { Product } from "../model/product.entity";

export class ProductService {
    resourceEndpoint = 'http://localhost:3000/ingredients'; // Cambia esto si tienes otra ruta para productos

    async getAll() {
        const response = await http.get('/all-ingredients'); // Asegúrate de que esta ruta esté correcta
        return response.data.map(productData => new Product(productData));
    }

    async findByCategory(categoryId) {
        const products = await this.getAll();
        // Filtrar productos por `categoryId`
        return products.filter(product => product.categoryId === categoryId);
    }

    async create(recipeResource) {
        try {
            const response = await axios.post(this.resourceEndpoint, recipeResource);
            return response.data; // Devolver el producto creado desde el backend
        } catch (error) {
            console.error("Error al crear el producto:", error);
            throw error;
        }
    }

    // Actualizar un producto existente
    async update(_id, recipeResource) {
        try {
            const response = await axios.put(`http://localhost:3000/ingredients/${_id}`, recipeResource);
            return response.data; // Devolver el producto actualizado desde el backend
        } catch (error) {
            console.error("Error al actualizar el producto:", error);
            throw error;
        }
    }

    // Eliminar un producto
    async delete(_id) {
        try {
            const response = await axios.delete(`http://localhost:3000/ingredients/${_id}`);
            return response.data; // Devolver la respuesta del backend después de eliminar
        } catch (error) {
            console.error("Error al eliminar el producto:", error);
            throw error;
        }
    }
    async findByCategory(categoryName) {
        const products = await this.getAll();
        // Filtrar productos por `categoryName`
        return products.filter(product => product.categoryName === categoryName);
    }
}
