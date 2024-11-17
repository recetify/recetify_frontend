<template>
  <div class="category-filter">
    <label for="category" class="filter-label">Filtrar por categoría:</label>
    <select
        v-model="selectedCategory"
        @change="filterCategory"
        id="category"
        class="filter-select"
    >
      <option value="">Buscar categorías...</option>
      <option v-for="category in categories" :key="category._id" :value="category.name">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      selectedCategory: "",
      categories: []
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('http://localhost:3000/all-categories');
        this.categories = response.data;
      } catch (error) {
        console.error("Error al obtener las categorías:", error);
      }
    },
    filterCategory() {
      this.$emit("categorySelected", this.selectedCategory);
    }
  },
  created() {
    this.fetchCategories();
  }
};
</script>



<style scoped>
.category-filter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
}

.filter-label {
  font-size: 1rem;
  font-weight: bold;
  color: #444;
  margin-bottom: 5px;
}

.filter-select {
  padding: 10px;
  font-size: 1rem;
  color: #333;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  width: 250px;
  transition: all 0.3s ease;
}

.filter-select:focus {
  border-color: #4CAF50;
  outline: none;
  box-shadow: 0 0 5px rgba(76, 175, 80, 0.6);
}

.filter-select option {
  padding: 10px;
  background-color: white;
}

@media (max-width: 600px) {
  .filter-select {
    width: 100%;
  }
}
</style>