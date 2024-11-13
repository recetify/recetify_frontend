<template>
  <div class="product-card" v-if="product">
    <img :src="product.image" alt="Imagen del producto" class="product-image" />
    <div class="product-details">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-price">S/ {{ product.price }} kg</p>
      <button v-if="!isInCart" @click="addToCart" class="product-button">
        COMPRAR
      </button>
      <button v-else @click="removeFromCart" class="product-button remove-button">
        Quitar
      </button>
    </div>
  </div>
</template>

<script>
import { ProductService } from "../services/product.service.js";

export default {
  props: {
    product: Object,
    isInCart: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    addToCart() {
      this.$emit("addToCart", this.product);
    },
    removeFromCart() {
      this.$emit("removeFromCart", this.product);
    }
  }
};
</script>


<style scoped>
/* Contenedor de la tarjeta del producto */
.product-card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  text-align: center;
  font-family: Arial, sans-serif;
  width: 180px;
  margin: 10px;
}

/* Imagen del producto */
.product-image {
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
}

/* Detalles del producto */
.product-details {
  text-align: center;
  padding: 0.5rem 0;
}

/* Título del producto */
.product-title {
  font-size: 1.2rem;
  font-weight: bold;
  color: #666633;
  margin-bottom: 0.5rem;
}

/* Precio del producto */
.product-price {
  font-size: 1rem;
  color: #777;
  margin-bottom: 0.5rem;
}

/* Botón de Comprar */
.product-button {
  background-color: #c2d521;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

/* Botón de Quitar */
.remove-button {
  background-color: #e57373;
}

.product-button:hover {
  background-color: #a3b718;
}

.remove-button:hover {
  background-color: #d32f2f;
}
</style>
