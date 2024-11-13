<template>
  <div class="shopping-view">
    <h1>Compras</h1>
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
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  components: { CategoryFilter, ProductCard },
  data() {
    return {
      products: [],
      filteredProducts: [],
      productService: new ProductService()
    };
  },
  async created() {
    this.products = await this.productService.getAll();
    this.filteredProducts = this.products;
  },
  methods: {
    async filterProducts(category) {
      this.filteredProducts = category
          ? await this.productService.findByCategory(category)
          : this.products;
    },
    addToCart(product) {
      let cart = JSON.parse(localStorage.getItem("cart") || "[]");
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert(`${product.name} añadido al carrito`);
    },
    goToCart() {
      this.$router.push("/cart");
    }
  }
};
</script>


<style scoped>

.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  padding: 1rem;

}

/* Ajuste del tamaño de las tarjetas */
.product-grid .product-card {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s ease;
}

.product-grid .product-card img {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.product-grid .product-card:hover {
  transform: scale(1.05);
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
