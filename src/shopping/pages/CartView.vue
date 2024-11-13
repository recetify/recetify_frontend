<template>
  <div class="cart-view">
    <button @click="$router.go(-1)" class="back-button">Volver</button>
    <h2>Carrito de Compras</h2>
    <div v-if="cart.length" class="product-grid">
      <ProductCard
          v-for="product in cart"
          :key="product.id"
          :product="product"
          @removeFromCart="removeFromCart"
          :isInCart="true"
      />
    </div>
    <div v-else>
      <p>El carrito está vacío.</p>
    </div>
    <div v-if="cart.length" class="cart-footer">
      <button @click="checkout" class="pay-button">Pagar</button>
      <p>TOTAL: {{ cartTotal }} soles</p>
    </div>

    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <h3>¡Compra Exitosa!</h3>
        <p>Gracias por tu compra.</p>
        <button @click="closeModal">Cerrar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ProductService } from "../services/product.service";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },
  data() {
    return {
      cart: JSON.parse(localStorage.getItem("cart") || "[]"),
      showSuccessModal: false,
      productService: new ProductService()
    };
  },
  computed: {
    cartTotal() {
      return this.cart.reduce((total, product) => total + product.price, 0);
    }
  },
  methods: {
    removeFromCart(product) {
      this.cart = this.cart.filter(item => item.id !== product.id);
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    checkout() {
      this.showSuccessModal = true;
      this.cart = [];
      localStorage.removeItem("cart");
    },
    closeModal() {
      this.showSuccessModal = false;
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.cart-view {
  padding: 20px;
}
.back-button {
  background-color: #4CAF50; /* Color azul */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.back-button:hover {
  background-color: #388E3C; /* Color azul oscuro al pasar el cursor */
}
.product-grid {
  display: flex;
  gap: 20px;
}
.cart-footer {
  margin-top: 20px;
}
.pay-button {
  background-color: #4CAF50;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;
}
.pay-button:hover {
  background-color: #388E3C; /* Color verde oscuro al pasar el cursor */
}

/* Estilos del Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  text-align: center;
}
.modal-content h3 {
  margin: 0;
}
.modal-content button {
  margin-top: 20px;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}
</style>
