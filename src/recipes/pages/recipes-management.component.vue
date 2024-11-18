<script>
import { Recipe } from '../model/recipes.entity.js';
import { RecipeService } from '../services/recipes.service.js';

export default {
  name: 'Recipes',
  data() {
    return {
      searchQuery: '',
      recipes: [],
      showModal: false,
      currentRecipe: null
    };
  },
  created() {
    this.fetchRecipes();
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    fetchRecipes() {
      const recipeService = new RecipeService();
      recipeService.getAll().then(response => {
        this.recipes = response.data.map(recipeData => new Recipe(recipeData));
      }).catch(error => {
        console.error('Error al cargar las recetas:', error);
      });
    },
    openModal(recipe = null) {
      this.currentRecipe = recipe ? { ...recipe } : new Recipe({});
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.currentRecipe = null;
    },
    saveRecipe() {
      const recipeService = new RecipeService();
      if (this.currentRecipe._id) {
        // Actualizar receta existente
        recipeService.update(this.currentRecipe._id, this.currentRecipe)
            .then(() => {
              console.log('Receta actualizada');
              this.fetchRecipes();  // Recargar recetas después de actualizar
              this.closeModal();
            })
            .catch(error => {
              console.error('Error al actualizar receta:', error);
            });
      } else {
        // Crear nueva receta
        recipeService.create(this.currentRecipe)
            .then(() => {
              console.log('Receta creada');
              this.fetchRecipes();  // Recargar recetas después de crear
              this.closeModal();
            })
            .catch(error => {
              console.error('Error al crear receta:', error);
            });
      }
    },
    deleteRecipe(_id) {
      const recipeService = new RecipeService();
      recipeService.delete(_id)
          .then(() => {
            console.log('Receta eliminada');
            this.fetchRecipes();  // Recargar recetas después de eliminar
          })
          .catch(error => {
            console.error('Error al eliminar receta:', error);
          });
    }
  }
};
</script>

<template>
  <div class="recipes-page">
    <h1 class="title">Recetas</h1>
    <pv-divider class="divider"></pv-divider>
    <p class="description-recipes">
      Bienvenido a la sección de recetas. Aquí puedes ver, añadir, editar y eliminar recetas! Comparte tus recetas favoritas con la comunidad.
    </p>
    <!-- Barra de búsqueda -->
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Buscar receta..." />
      <i class="pi pi-search"></i>
    </div>

    <!-- Botón para añadir receta -->
    <button class="add-recipe-button" @click="openModal">Añadir receta</button>

    <!-- Modal para crear o editar receta -->
    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h2>{{ currentRecipe._id ? 'Editar' : 'Añadir' }} receta</h2>
        <label for="title">Título:</label>
        <input v-model="currentRecipe.title" id="title" type="text" />

        <label for="description">Descripción:</label>
        <textarea v-model="currentRecipe.description" id="description"></textarea>

        <label for="author">Autor:</label>
        <input v-model="currentRecipe.author" id="author" type="text" />

        <label for="photo_url">Foto URL:</label>
        <input v-model="currentRecipe.photo_url" id="photo_url" type="text" />

        <label for="severity">Severidad:</label>
        <input v-model="currentRecipe.severity" id="severity" type="text" />

        <div class="modal-buttons">
          <button @click="saveRecipe" class="save-button">Guardar receta</button>
          <button @click="closeModal" class="close-button">Cerrar</button>
        </div>
      </div>
    </div>

    <!-- Tarjetas de recetas -->
    <div class="recipes-grid">
      <div class="flip-card" v-for="recipe in filteredRecipes" :key="recipe._id">
        <div class="flip-card-inner">
          <!-- Cara frontal de la tarjeta -->
          <div class="flip-card-front">
            <img :src="recipe.photo_url" :alt="recipe.title" class="recipe-image" />
            <h3 class="recipe-title">{{ recipe.title }}</h3>
          </div>
          <!-- Cara trasera de la tarjeta -->
          <div class="flip-card-back">
            <h3>{{ recipe.title }}</h3>
            <p>{{ recipe.description }}</p>
            <p><strong>Autor:</strong> {{ recipe.author }}</p>
            <p><strong>Severidad:</strong> {{ recipe.severity }}</p>

            <!-- Botones de editar y eliminar -->
            <div class="action-buttons">
              <button @click="openModal(recipe)" class="edit-button">Editar</button>
              <button @click="deleteRecipe(recipe._id)" class="delete-button">Eliminar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos generales */
.recipes-page {
  text-align: center;
  padding: 2rem;
  font-family: Nunito, sans-serif;
}

.divider {
  margin-top: 1em;
}
.description-recipes {
  text-align: center;
  font-size: 1.2em;
  color: #7E8940;
  font-family: Nunito, sans-serif;
  margin-bottom: 2rem;
}

.title {
  color: #666633;
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: Nunito, sans-serif;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 1rem;
  font-family: Nunito, sans-serif;
}

.search-bar input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
  font-family: Nunito, sans-serif;
}

.pi-search {
  font-size: 1.2rem;
  color: #666633;
}

/* Estilos para botones */
.add-recipe-button, .save-button, .close-button, .edit-button, .delete-button {
  font-size: 1rem;
  border-radius: 0.5rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0.5rem;
  font-family: Nunito, sans-serif;
}

.add-recipe-button {
  background-color: white;
  color: white;
  font-family: Nunito, sans-serif;
}

.add-recipe-button:hover {
  background-color: #5a5a2d;
  font-family: Nunito, sans-serif;
}

/* Nuevos efectos para el botón Añadir receta */
.add-recipe-button {
  padding: 16px;
  font-family: Nunito, sans-serif;
  border: none;
  border-radius: 30px;
  font-weight: bold;
  letter-spacing: 2px;
  text-transform: uppercase;
  cursor: pointer;
  color: #ffffff;
  background: #7E8940;
  transition: all 1000ms;
  font-size: 15px;
  position: relative;
  overflow: hidden;
  outline: 2px solid #7E8940;
}

.add-recipe-button:hover {
  color: #ffffff;
  transform: scale(1.1);
  outline: 2px solid #5d6531;
  box-shadow: 4px 5px 17px -4px #5d6531;
}

.add-recipe-button::before {
  content: "";
  position: absolute;
  font-family: Nunito, sans-serif;
  left: -50px;
  top: 0;
  width: 0;
  height: 100%;
  background-color: #5d6531;
  transform: skewX(45deg);
  z-index: -1;
  transition: width 1000ms;
}

.add-recipe-button:hover::before {
  width: 250%;
}

.edit-button, .delete-button {
  font-family: inherit;
  display: inline-block;
  width: 6em;
  height: 2.6em;
  line-height: 2.5em;
  overflow: hidden;
  font-weight: bold;

  margin: 20px;
  font-size: 17px;
  z-index: 1;
  border: 2px solid;
  border-radius: 6px;
  position: relative;
  color: white;
  margin: 0; /* Sin margen adicional */
}

/* Botón Editar */
.edit-button {
  --color: #737a47;
  color: var(--color);
  border-color: var(--color);
  font-family: Nunito, sans-serif;
  background-color: rgb(255, 255, 255);
}

.edit-button::before {
  position: absolute;
  content: "";
  background: var(--color);
  width: 150px;
  height: 200px;
  z-index: -1;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: .3s all;
}

.edit-button:hover {
  color: white;
}

.edit-button:hover::before {
  top: -30px;
  left: -30px;
}

/* Botón Eliminar */
.delete-button {
  background-color: rgb(250, 224, 224);
  --color: #8c3232;
  color: var(--color);
  border-color: var(--color);
  font-weight: bold;
}

.delete-button::before {
  position: absolute;
  content: "";
  background: var(--color);
  width: 150px;
  height: 200px;
  z-index: -1;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: .3s all;
  font-weight: bold;
}

.delete-button:hover {
  font-weight: bold;
  color: white;
}

.delete-button:hover::before {
  top: -30px;
  left: -30px;
}

.action-buttons {
  font-weight: bold;
  display: flex;
  gap: 7px; /* Espacio entre los botones */
  justify-content: center; /* Opcional: centra los botones dentro de la tarjeta */
  margin-top: 1rem; /* Espacio superior */
  flex-wrap: wrap; /* Permitir que los botones se ajusten dentro de la tarjeta */
}

.close-button {
  --color: #ff6b6b;
  --color2: rgb(10, 25, 30);
  padding: 0.8em 1.75em;
  background-color: transparent;
  border-radius: 6px;
  border: .3px solid var(--color);
  transition: .5s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  font-weight: 300;
  font-size: 17px;
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  text-transform: uppercase;
  color: var(--color);
}

.close-button::after, .close-button::before {
  content: '';
  display: block;
  height: 100%;
  width: 100%;
  transform: skew(90deg) translate(-50%, -50%);
  position: absolute;
  inset: 50%;
  left: 25%;
  z-index: -1;
  transition: .5s ease-out;
  background-color: var(--color);
}

.close-button::before {
  top: -50%;
  left: -25%;
  transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
}

.close-button:hover::before {
  transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
}

.close-button:hover::after {
  transform: skew(45deg) translate(-50%, -50%);
}

.close-button:hover {
  color: var(--color2);
}

.close-button:active {
  filter: brightness(.7);
  transform: scale(.98);
}

.save-button {
  --color: #00A97F;
  --color2: rgb(10, 25, 30);
  background-color: transparent;
  border-radius: 6px;
  border: .3px solid var(--color);
  transition: .5s;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  z-index: 1;
  font-weight: 300;
  font-size: 17px;
  font-family: 'Roboto', 'Segoe UI', sans-serif;
  text-transform: uppercase;
  color: var(--color);
}

.save-button::after, .save-button::before {
  content: '';
  display: block;
  height: 100%;
  width: 100%;
  transform: skew(90deg) translate(-50%, -50%);
  position: absolute;
  inset: 50%;
  left: 25%;
  z-index: -1;
  transition: .5s ease-out;
  background-color: var(--color);
}

.save-button::before {
  top: -50%;
  left: -25%;
  transform: skew(90deg) rotate(180deg) translate(-50%, -50%);
}

.save-button:hover::before {
  transform: skew(45deg) rotate(180deg) translate(-50%, -50%);
}

.save-button:hover::after {
  transform: skew(45deg) translate(-50%, -50%);
}

.save-button:hover {
  color: var(--color2);
}

.save-button:active {
  filter: brightness(.7);
  transform: scale(.98);
}

/* Estilos de las tarjetas */
.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  padding: 2rem;
  justify-content: center; /* Centrar las tarjetas */
  font-family: Nunito, sans-serif;
}

.flip-card {
  background-color: transparent;
  width: 100%;
  height: 300px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.flip-card-front {
  background-color: #dbdfc2; /* Fondo verde */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.27);
}

.recipe-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0.5rem;
}

.recipe-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #505930; /* Texto blanco */
  margin-top: 0.5rem;
}

.flip-card-back {
  background-color: #a1ac62; /* Fondo verde oscuro */
  transform: rotateY(180deg);
}

.flip-card-back h3 {
  font-size: 1.2rem;
  color: #ffffff; /* Texto blanco */
}

.flip-card-back p {
  font-size: 0.9rem;
  color: #ffffff; /* Texto blanco */
  margin: 0.5rem 0;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

/* Modal Content */
.modal-content {
  background-color: #ffffff;
  padding: 2.5rem;
  border-radius: 10px;
  width: 450px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  animation: fadeIn 0.5s ease;
  position: relative;
}

.modal-content h2 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: bold;
}

.modal-content label {
  font-size: 1rem;
  font-weight: bold;
  color: #666;
  margin-bottom: 0.3rem;
  display: block;
}

.modal-content input,
.modal-content textarea {
  width: 100%;
  padding: 0.7rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #f9f9f9;
  transition: all 0.3s ease;
}

.modal-content input:focus,
.modal-content textarea:focus {
  border-color: #4caf50;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.3);
}

.modal-buttons {
  display: flex;
  justify-content: space-between;
}

.save-button, .close-button {
  padding: 0.7rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.save-button {
  background-color: #4caf50;
  color: white;
}

.save-button:hover {
  background-color: #45a049;
  box-shadow: 0 4px 8px rgba(76, 175, 80, 0.3);
}

.close-button {
  background-color: #f44336;
  color: white;
}

.close-button:hover {
  background-color: #e53935;
  box-shadow: 0 4px 8px rgba(244, 67, 54, 0.3);
}

/* Animation for Modal */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>