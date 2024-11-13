<script>
import { Recipe } from '../model/recipes.entity.js';  // Asegúrate de que la ruta sea correcta
import { RecipeService } from '../services/recipes.service.js';  // Asegúrate de que la ruta sea correcta

export default {
  name: 'Recipes',
  data() {
    return {
      searchQuery: '',
      recipes: []  // Inicializamos el array vacío para las recetas
    };
  },
  created() {
    this.fetchRecipes();  // Llamamos al método para cargar las recetas cuando el componente se crea
  },
  computed: {
    filteredRecipes() {
      return this.recipes.filter(recipe =>
          recipe.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  },
  methods: {
    // Método para cargar las recetas desde el servicio
    fetchRecipes() {
      const recipeService = new RecipeService();  // Instanciamos el servicio
      recipeService.getAll().then(response => {
        // Mapeamos los datos de la respuesta para crear instancias de Recipe
        this.recipes = response.data.map(recipeData => new Recipe(recipeData));
      }).catch(error => {
        console.error('Error al cargar las recetas:', error);
      });
    }
  }
};
</script>

<template>
  <div class="recipes-page">
    <h1 class="title">Recetas</h1>
    <div class="search-bar">
      <input type="text" v-model="searchQuery" placeholder="Buscar receta..." />
      <i class="pi pi-search"></i>
    </div>
    <div class="recipes-grid">
      <div class="flip-card" v-for="recipe in filteredRecipes" :key="recipe.id">
        <div class="flip-card-inner">
          <!-- Cara frontal de la tarjeta -->
          <div class="flip-card-front">
            <img :src="recipe.image" :alt="recipe.title" class="recipe-image" />
            <h3 class="recipe-title">{{ recipe.title }}</h3>
          </div>
          <!-- Cara trasera de la tarjeta -->
          <div class="flip-card-back">
            <h3>{{ recipe.title }}</h3>
            <p>{{ recipe.description }}</p>
            <p><strong>Ingredientes básicos:</strong> {{ recipe.ingredients }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipes-page {
  text-align: center;
  background-color: #f0f5e9;
  padding: 2rem;
}

.title {
  color: #666633;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
}

.search-bar input {
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  margin-right: 0.5rem;
}

.pi-search {
  font-size: 1.2rem;
  color: #666633;
}

.recipes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
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
  justify-content: center;
  align-items: center;
  padding: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
}

.flip-card-front {
  background-color: #fff;
}

.recipe-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
}

.recipe-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #666633;
  margin-top: 0.5rem;
}

.flip-card-back {
  background-color: #f8f8f8;
  transform: rotateY(180deg);
}

.flip-card-back h3 {
  font-size: 1.2rem;
  color: #666633;
}

.flip-card-back p {
  font-size: 0.9rem;
  color: #333;
  margin: 0.5rem 0;
}
</style>

