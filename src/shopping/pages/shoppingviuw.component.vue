<template>
  <div class="shopping-view">
    <h1 class="title">Compras</h1>
    <CategoryFilter @categorySelected="filterProducts" />
    <div class="product-grid">
      <ProductCard
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @addToCart="addToCart"
      />
    </div>
    <button @click="goToCart" class="cart-icon-button">
      <i class="fas fa-shopping-cart"></i>
    </button>
  </div>
</template>

<script>
import CategoryFilter from "../components/CategoryFilter.vue";
import ProductCard from "../components/ProductCard.vue";
import { ProductService } from "../services/product.service";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  components: { CategoryFilter, ProductCard },
  data() {
    return {
      products: [],
      filteredProducts: [],
      categories: [],
      cart: {
        user_id: `user_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
        items: [],
        total_price: 0
      },
      productService: new ProductService()
    };
  },
  async created() {
    await this.fetchCategories();
    await this.fetchProducts();
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
    async fetchProducts() {
      this.products = await this.productService.getAll();
      this.products.forEach(product => {
        const category = this.categories.find(cat => cat._id === product.category_id);
        if (category) {
          product.categoryName = category.name;
        }
      });
      this.filteredProducts = this.products;
      console.log("Productos obtenidos:", this.products);
    },
    async filterProducts(categoryName) {
      console.log("Filtrando productos por categoría:", categoryName);
      this.filteredProducts = categoryName
          ? this.products.filter(product => product.categoryName === categoryName)
          : this.products;
      console.log("Productos filtrados:", this.filteredProducts);
    },

    async addToCart(product) {
      console.log("Producto recibido AÑA:", product);

      const productClone = { ...product };

      if (!productClone.id) {
        productClone.id = `product_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`;
        console.log("ID generado para el producto:", productClone.id);
      }

      const cartItem = {
        user_id: this.cart.user_id,
        product_id: productClone.id,
        quantity: 1,
        price: productClone.price,
        photo_url: productClone.photo_url // Añadir la URL de la foto
      };

      console.log("Objeto cartItem a enviar:", cartItem);

      if (!cartItem.user_id || !cartItem.product_id || !cartItem.quantity || !cartItem.price || !cartItem.photo_url) {
        console.error("Faltan datos requeridos en cartItem:", cartItem);
        return;
      }

      try {
        const response = await axios.post("http://localhost:3000/shopping-carts", cartItem);
        console.log("Respuesta del servidor:", response.data);
        this.cart.items.push(response.data.items[response.data.items.length - 1]);
        localStorage.setItem("cart", JSON.stringify(this.cart));
        localStorage.setItem("user_id", this.cart.user_id);
      } catch (error) {
        console.error("Error al añadir al carrito:", error.response ? error.response.data : error);
      }
    },
    goToCart() {
      this.$router.push("/cart");
    }
  }
};
</script>
<style scoped>
.title {
  font-family: Nunito, sans-serif;
}
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 1rem;
}

.product-grid .product-card {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  font-family: Nunito, sans-serif;
  background-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-grid .product-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.product-grid .product-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}



.cart-icon-button {
  position: fixed;
  top: 90px;
  right: 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 24px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
}

.cart-icon-button:hover {
  background-color: #45a049;
}

@media (max-width: 1200px) {
  .cart-icon-button {
    top: 85px;
  }
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .cart-icon-button {
    top: 80px;
    right: 15px;
  }
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .cart-icon-button {
    top: 75px;
    right: 10px;
    width: 45px;
    height: 45px;
    font-size: 20px;
  }
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>