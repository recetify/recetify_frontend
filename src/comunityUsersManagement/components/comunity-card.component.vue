<!--- Componente que representa una TARJETA publicación de la comunidad --->
<script>
export default {
  name: "comunity-card",
  props: {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    photo_url: {
      type: String,
      required: true
    },
    commentsVisible: {
      type: Boolean,
      required: true
    },
    comments: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      newComment: "" // Add newComment data property
    };
  },
  methods: {
    toggleComments() {
      this.$emit("toggle-comments");
    },
    addComment() {
      if (this.newComment.trim()) {
        this.$emit("add-comment", this.newComment);
        this.newComment = "";
      }
    }
  }
};
</script>

<template>
  <pv-card class="custom-card">
    <template #content>
      <div class="card-content">
        <div class="image-container">
          <img :src="photo_url" alt="Publication Image" class="card-image"/>
        </div>
        <div class="card-details">
          <h2 class="card-title">{{ title }}</h2>
          <p class="card-description">{{ description }}</p>
          <div class="card-icons">
            <i class="pi pi-heart"></i>
            <i class="pi pi-comment" @click="toggleComments"></i>
          </div>
        </div>
      </div>
      <div v-if="commentsVisible" class="comments-section">
        <h3>Comments</h3>
        <ul>
          <li v-for="comment in comments" :key="comment.id">{{ comment.description }}</li>
        </ul>
        <input v-model="newComment" @keyup.enter="addComment" placeholder="Add a comment"/>
      </div>
    </template>
  </pv-card>
</template>

<style scoped>
.custom-card {
  width: 100%;
  max-width: 50rem;
  margin: 1rem auto;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-content {
  display: flex;
  flex-direction: row;
}

.image-container {
  flex: 1;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: auto;
  object-fit: cover;
}

.card-details {
  flex: 2;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-size: 1.5rem;
  margin: 0;
  color: #333;
}

.card-description {
  font-size: 1rem;
  color: #666;
  margin: 0.5rem 0;
}

.card-icons {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
}

.card-icons i {
  font-size: 1.5rem;
  color: #7E8940;
  cursor: pointer;
  transition: color 0.3s;
}

.card-icons i:hover {
  color: #c5d951;
}

.comments-section {
  margin-top: 1rem;
}

.comments-section h3 {
  cursor: pointer;
  color: #7E8940;
}

.comments-section ul {
  list-style-type: none;
  padding: 0;
}

.comments-section li {
  background: #f5f5f5;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 5px;
}

.comments-section input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.5rem;
}
</style>