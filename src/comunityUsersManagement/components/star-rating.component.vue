<script>
export default {
  name: "StarRating",
  props: {
    calification: {
      type: Number,
      required: true
    }
  },
  methods: {
    setCalification(star) {
      this.$emit("update-calification", star);
    }
  }
};
</script>

<template>
  <div class="star-rating">
    <i v-for="star in 5" :key="star" class="pi" :class="star <= calification ? 'pi-star-fill' : 'pi-star'" @click="setCalification(star)"></i>
  </div>
</template>

<style scoped>
.star-rating {
  display: flex;
  gap: 0.2rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.pi-star, .pi-star-fill {
  font-size: 1.5rem;
  color: #FFD700;
  cursor: pointer;
}

.pi-star:hover, .pi-star-fill:hover {
  color: #FFA500;
}
</style>