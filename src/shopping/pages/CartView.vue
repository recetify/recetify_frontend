<template>
  <div class="cart-view">
    <!-- Botón de Volver con ícono -->
    <button @click="$router.go(-1)" class="back-button">
      <svg class="back-icon" viewBox="0 0 24 24">
        <path d="M19 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H19v-2z"/>
      </svg>
      Volver
    </button>
    <h2 class="cart-title">Carrito de Compras</h2>

    <!-- Productos en el carrito -->
    <div v-if="cart.items && cart.items.length" class="product-list">
      <ProductCard
          v-for="product in cart.items"
          :key="product.product_id"
          :product="product"
          @removeFromCart="removeFromCart"
          :isInCart="true"
      />
    </div>

    <!-- Si el carrito está vacío -->
    <div v-else class="empty-cart">
      <p>Tu carrito está vacío. Agrega productos para continuar.</p>
    </div>

    <!-- Total y botón de pago -->
    <div v-if="cart.items && cart.items.length" class="checkout-footer">
      <p class="total-price">TOTAL: {{ cart.total_price }} soles</p>
      <button @click="checkout" class="pay-button">
        <span>Pagar</span>
        <svg class="svgIcon" viewBox="0 0 576 512">
          <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"></path>
        </svg>
      </button>
    </div>

    <div v-if="showSuccessModal" class="modal">
      <div class="modal-content">
        <h3>¡Compra Exitosa!</h3>
        <p>Gracias por tu compra.</p>
        <button @click="closeModal" class="close-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path fill="none" d="M0 0h24v24H0z"/>
            <path d="M13.41 12l4.29-4.29a1 1 0 00-1.42-1.42L12 10.59 7.71 6.29A1 1 0 006.29 7.71L10.59 12 6.29 16.71a1 1 0 001.42 1.42L12 13.41l4.29 4.29a1 1 0 001.42-1.42L13.41 12z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProductCard from "../components/ProductCard.vue";

export default {
  components: { ProductCard },
  data() {
    return {
      cart: {},
      showSuccessModal: false,
      user_id: localStorage.getItem("user_id") || `user_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`

    };
  },
  created() {
    this.fetchCart();
  },
  methods: {
    async fetchCart() {
      try {
        const response = await axios.get(`http://localhost:3000/shopping-carts/user/${this.user_id}`);
        this.cart = response.data;
      } catch (error) {
        console.error("Error al obtener el carrito:", error.response ? error.response.data : error);
      }
    },
    async removeFromCart(product) {
      try {
        await axios.delete(`http://localhost:3000/shopping-carts/user/${this.user_id}/product/${product.product_id}`);
        this.cart.items = this.cart.items.filter(item => item.product_id !== product.product_id);
        this.updateTotalPrice();
        localStorage.setItem("cart", JSON.stringify(this.cart));
      } catch (error) {
        console.error("Error al eliminar el producto del carrito:", error.response ? error.response.data : error);
      }
    },
    updateTotalPrice() {
      this.cart.total_price = this.cart.items.reduce((total, item) => total + item.price, 0);
    },
    async checkout() {
      // Simular el éxito de la compra sin añadir a la base de datos
      this.showSuccessModal = true;
      this.cart = { items: [], total_price: 0 }; // Vaciar el carrito
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
/* Contenedor principal del carrito */
.cart-view {
  padding: 30px;

  font-family: Nunito, sans-serif;
  background: #f9f9f9;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
}

/* Título del carrito */
.cart-title {
  text-align: center;
  font-family: Nunito, sans-serif;
  font-size: 36px;
  color: #333;
  margin-bottom: 30px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
}

/* Estilo de los productos en el carrito */
.product-list {
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-bottom: 40px;
  flex-wrap: wrap; /* Opcional: para que los productos se ajusten a la siguiente línea si no caben en una sola fila */
}

/* Si el carrito está vacío */
.empty-cart {
  text-align: center;
  color: #777;
  font-size: 18px;
  font-style: italic;
}

/* Pie de página del carrito (Total y botón de pago) */
.checkout-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border: 2px solid #505930; /* Añadir borde de color verde */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px; /* Cambiar de position: absolute a margin-top */
  width: 100%; /* Ajustar el ancho al contenedor */
}

.total-price {
  font-size: 24px;
  font-weight: bold;
  color: BLACK;
}

/* Botón de Pagar */
.pay-button {
  background-color: #505930; /* Verde */
  border: none;
  color: white;
  padding: 15px 30px; /* Aumentar el padding */
  font-size: 18px; /* Aumentar el tamaño de la fuente */
  font-weight: bold;
  border-radius: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); /* Aumentar la sombra */
  animation: pulse 1.5s infinite; /* Hacer la animación más rápida */
}

.pay-button:hover {
  background-color: #606a2c; /* Verde más oscuro */
  transform: scale(1.1); /* Aumentar el efecto de escala */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); /* Aumentar la sombra al hacer hover */
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.15); /* Aumentar el efecto de escala */
  }
  100% {
    transform: scale(1);
  }
}

.svgIcon {
  width: 20px;
  margin-left: 10px;
}
.back-button {
  background-color: #a1ac62; /* Verde */
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 50px; /* Bordes redondeados */
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.back-button:hover {
  background-color: #505930; /* Verde más oscuro */
  transform: translateY(-5px); /* Mover hacia arriba */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Aumentar la sombra */
}

.back-icon {
  margin-right: 8px;
  width: 20px;
  height: 20px;
  fill: white;
  transition: transform 0.3s ease;
}

.back-button:hover .back-icon {
  transform: rotate(-180deg); /* Girar el ícono */
}
.product-grid {
  display: flex;
  gap: 20px;
}
.cart-footer {
  margin-top: 20px;
}
.Btn {
  width: 130px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(115, 126, 56);
  border: none;
  color: white;
  font-weight: 600;
  gap: 8px;
  cursor: pointer;
  box-shadow: 5px 5px 10px rgba(0, 0, 0, 0.103);
  position: relative;
  overflow: hidden;
  transition-duration: .3s;
}
.svgIcon {
  width: 16px;
}
.svgIcon path {
  fill: white;
}
.Btn::before {
  width: 130px;
  height: 130px;
  position: absolute;
  content: "";
  background-color: white;
  border-radius: 50%;
  left: -100%;
  top: 0;
  transition-duration: .3s;
  mix-blend-mode: difference;
}
.Btn:hover::before {
  transition-duration: .3s;
  transform: translate(100%,-50%);
  border-radius: 0;
}
.Btn:active {
  transform: translate(5px,5px);
  transition-duration: .3s;
}

/* Estilos del Modal */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: fadeIn 0.3s ease-out;
}
.modal-content {
  background: #1a1a1a;
  padding: 40px;
  border-radius: 12px;
  text-align: center;
  width: 400px;
  color: white;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  animation: scaleUp 0.3s ease-out;
}
.modal-content h3 {
  margin: 0;
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 1px;
}
.modal-content p {
  margin-top: 10px;
  font-size: 16px;
}
.modal-content .close-btn {
  margin-top: 20px;
  padding: 12px 20px;
  background-color: #505930;
  color: white;
  border: none;
  border-radius: 50px;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content .close-btn:hover {
  background-color: #505930;
}
.modal-content .close-btn svg {
  fill: white;
  width: 24px;
  height: 24px;
  margin-right: 10px;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes scaleUp {
  from { transform: scale(0.8); }
  to { transform: scale(1); }
}
</style>
