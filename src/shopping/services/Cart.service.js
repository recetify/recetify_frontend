// shoppingCart.service.js
import axios from 'axios';
import { ShoppingCart } from '../model/shoppingCart.entity.js';

export class ShoppingCartService {
    resourceEndpoint = 'http://localhost:3000/shopping-carts'; // Cambia la ruta si es necesario

    // Obtener carrito por ID
    async getById(id) {
        try {
            const response = await axios.get(`${this.resourceEndpoint}/${id}`);
            return new ShoppingCart(response.data); // Mapea la respuesta a una instancia de ShoppingCart
        } catch (error) {
            console.error("Error al obtener el carrito:", error);
            throw error;
        }
    }

    // Crear un nuevo carrito
    async create(cartData) {
        try {
            const response = await axios.post(this.resourceEndpoint, cartData);
            return new ShoppingCart(response.data); // Devolver el carrito creado
        } catch (error) {
            console.error("Error al crear el carrito:", error);
            throw error;
        }
    }

    // Actualizar un carrito existente
    async update(id, cartData) {
        try {
            const response = await axios.put(`${this.resourceEndpoint}/${id}`, cartData);
            return new ShoppingCart(response.data); // Devolver el carrito actualizado
        } catch (error) {
            console.error("Error al actualizar el carrito:", error);
            throw error;
        }
    }

    // Eliminar un carrito
    async delete(id) {
        try {
            const response = await axios.delete(`${this.resourceEndpoint}/${id}`);
            return response.data; // Respuesta de eliminación
        } catch (error) {
            console.error("Error al eliminar el carrito:", error);
            throw error;
        }
    }
}
