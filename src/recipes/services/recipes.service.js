// recipe.service.js
import http from "../../shared/services/http-common.js";

export class RecipeService {
    resourceEndpoint = '/recipes'; // Endpoint para las recetas

    // Obtener todas las recetas
    getAll() {
        return http.get(this.resourceEndpoint);
    }

    // Obtener una receta por su ID
    getById(id) {
        return http.get(`${this.resourceEndpoint}/${id}`);
    }

    // Crear una nueva receta
    create(recipeResource) {
        return http.post(this.resourceEndpoint, recipeResource);
    }

    // Actualizar una receta existente
    update(id, recipeResource) {
        return http.put(`${this.resourceEndpoint}/${id}`, recipeResource);
    }

    // Eliminar una receta por ID
    delete(id) {
        return http.delete(`${this.resourceEndpoint}/${id}`);
    }

    // Buscar recetas por el título
    findByTitle(title) {
        return http.get(`${this.resourceEndpoint}?title=${title}`);
    }
}
