import http from "../../shared/services/http-common.js";

export class RecipeService {
    resourceEndpoint = 'http://localhost:3000/recipes'; // Endpoint base para las recetas

    // Obtener todas las recetas
    getAll() {
        return http.get('/all-recipes'); // Esta URL ya apunta correctamente al endpoint "/recipes"
    }

    // Obtener una receta por su _id
    getById(_id) {
        return http.get(`http://localhost:3000/recipes/${_id}`); // Aquí estamos usando el ID de la receta
    }

    // Crear una nueva receta
    create(recipeResource) {
        return http.post(this.resourceEndpoint, recipeResource); // Aquí se usa el mismo endpoint para crear recetas
    }

    // Actualizar una receta existente
    update(_id, recipeResource) {
        return http.put(`http://localhost:3000/recipes/${_id}`, recipeResource); // Aquí se usa el ID para actualizar
    }

    // Eliminar una receta
    delete(_id) {
        return http.delete(`http://localhost:3000/recipes/${_id}`); // El endpoint es específico para eliminar una receta por ID
    }


}
