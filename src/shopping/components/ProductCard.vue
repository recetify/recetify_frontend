
<template>
  <div class="product-card" v-if="product">
    <img :src="product.photo_url" :alt="product.name" class="product-image" />
    <div class="product-details">
      <h3 class="product-title">{{ product.name }}</h3>
      <p class="product-price">S/ {{ product.price }} kg</p>
      <button v-if="!isInCart" @click="addToCart" class="button">
        <span>Añadir al carrito</span>
        <svg fill="#fff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
          <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
          <g id="SVGRepo_iconCarrier">
            <circle r="1.91" cy="20.59" cx="10.07" class="cls-1"></circle>
            <circle r="1.91" cy="20.59" cx="18.66" class="cls-1"></circle>
            <path d="M.52,1.5H3.18a2.87,2.87,0,0,1,2.74,2L9.11,13.91H8.64A2.39,2.39,0,0,0,6.25,16.3h0a2.39,2.39,0,0,0,2.39,2.38h10" class="cls-1"></path>
            <polyline points="7.21 5.32 22.48 5.32 22.48 7.23 20.57 13.91 9.11 13.91" class="cls-1"></polyline>
          </g>
        </svg>
      </button>
      <button v-else @click="removeFromCart" class="product-button remove-button">
        Quitar
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    isInCart: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    addToCart() {
      console.log("Producto en ProductCard antes de emitir:", this.product);
      const productClone = {...this.product};
      this.$emit("addToCart", productClone);

      // Activar animación de agregar al carrito
      this.animateCart();
    },
    removeFromCart() {
      this.$emit("removeFromCart", this.product);
    },
    animateCart() {
      const cartIcon = document.querySelector(".cart-icon");
      if (cartIcon) {
        cartIcon.classList.add("animating");
        setTimeout(() => {
          cartIcon.classList.remove("animating");
        }, 1000); // El tiempo de la animación debe coincidir con el de la animación CSS
      } else {
        console.error("El elemento .cart-icon no se encontró en el DOM.");
      }
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

/* Efecto de animación para el botón con icono de carrito */
.button {
  height: 60px;
  width: 200px;
  background-color: #8bc34a; /* Verde Lima claro */
  border: 2px solid #7cb342; /* Verde Lima más oscuro */
  color: #fff;
  transition: .6s;
  font-size: 15px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer; /* Esto cambia el cursor a mano */
}


.button span {
  transform: translateX(10px);
  transition: .5s;
}

.button svg {
  transform: translateX(-300px);
  transition: .6s;
  z-index: 3;
  height: 20px;
}

.button:hover {
  width: 60px;
  background-color:#7cb342;
  box-shadow: 20px 20px 96px #bebebe,-20px -20px 96px #ffffff;
}

.button:hover svg {
  transform: translateX(-5px);
}

.button:hover span {
  transform: translateY(70px);
  font-size: .1rem;
}

/* Botón de Quitar */
.remove-button {
  background-color: #ff4d4d; /* Rojo brillante */
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 50px;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.remove-button:hover {
  background-color: #ff1a1a; /* Rojo más oscuro */
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Icono de carrito */
.cart-icon {
  margin-right: 8px;
  font-size: 1.3rem; /* Aumentar el tamaño del ícono */
  transition: transform 0.3s, font-size 0.3s;
}

/* Animación de movimiento y tamaño del carrito */
.cart-icon.animating {
  animation: moveToCart 1s ease-out forwards;
}

@keyframes moveToCart {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-30px) scale(1.2);
  }
  100% {
    transform: translateY(-100px) scale(1.5);
    opacity: 0;
  }
}

</style>
