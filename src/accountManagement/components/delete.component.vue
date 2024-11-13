<script>
export default {
  name: "delete.component",
  props: ['show', 'message'],
  methods: {
    onConfirm() {
      this.$emit('confirm'); // Emitir confirmación para eliminar
    },
    onCancel() {
      this.$emit('cancel'); // Emitir cancelación
    }
  }
}
</script>

<template>
  <div v-if="show" class="delete-confirm">
    <p class="message">{{ message }}</p>
    <pv-button class="confirmation-button" @click="onConfirm">{{ $t('confirmation.delete') }}</pv-button>
    <pv-button class="cancel-button" @click="onCancel">{{ $t('confirmation.cancel') }}</pv-button>
  </div>
</template>

<style>
.message {
  text-align: center;
  font-size: 18px;
  margin-bottom: 1em;
  color: #333;
}

/* Botón de eliminación */
.confirmation-button {
  background-color: #C5D951FF; /* Verde */
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.cancel-button {
  background-color: firebrick;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.confirmation-button:hover {
  background-color: #8BB500D6;
  transform: scale(1.1);
}

.cancel-button:hover {
  background-color: #7e1313;
  transform: scale(1.1);
}

</style>
