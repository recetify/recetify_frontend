<!--- Componente que representa una TARJETA publicación de la comunidad --->
<script>
import StarRating from "@/comunityUsersManagement/components/star-rating.component.vue";
export default {
  name: "comunity-card",
  components: { StarRating },
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
    },
    isMyPublication: {
      type: Boolean,
      required: true
    },
    calification: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      newComment: ""
    };
  },
  computed: {
    commentCount() {
      return this.comments ? this.comments.length : 0;
    }
  },
  methods: {
    toggleComments() {
      this.$emit("toggle-comments");
    },
    addComment() {
      if (this.newComment.trim()) {
        const newComment = {
          description: this.newComment,
          createdAt: new Date().toISOString(), // Añadir la fecha actual
        };
        this.$emit("add-comment", newComment);
        this.newComment = ""; // Limpiar el campo de comentario después de agregarlo
      }
    },
    deletePublication() {
      this.$emit("delete-publication");
    },
    updateCalification(newCalification) {
      this.$emit("update-calification", newCalification);
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
          <star-rating :calification="calification" @update-calification="updateCalification"></star-rating>
          <div class="card-icons">
            <i class="pi pi-comment" @click="toggleComments"></i>
            <span class="comment-count">{{ commentCount }}</span>
            <i class="pi pi-trash" @click="deletePublication" v-if="isMyPublication"></i>
          </div>
        </div>
      </div>
      <div v-if="commentsVisible" class="comments-section">
        <h3>Comments</h3>
        <ul class="comments-list">
          <li v-for="comment in comments" :key="comment.id" class="comment-item">
            <div class="comment-header">
              <strong>{{ comment.user_name }}</strong>
              <span class="comment-date">{{ new Date(comment.createdAt).toLocaleDateString() }}</span>
            </div>
            <p class="comment-text">{{ comment.description }}</p>
          </li>
        </ul>
        <div class="comment-input-container">
          <input v-model="newComment" @keyup.enter="addComment" placeholder="Agrega un comentario" class="comment-input"/>
          <button @click="addComment" class="comment-submit-button">Submit</button>
        </div>
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
  transition: transform 0.3s ease;
}

.custom-card:hover {
  transform: scale(1.02);
}

.card-content {
  display: flex;
  flex-direction: column;
}

.image-container {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.card-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-details {
  font-family: Nunito, sans-serif;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-title {
  font-family: Nunito, sans-serif;
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
  align-items: center;
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

.comment-count {
  font-family: Nunito, sans-serif;
  font-size: 1rem;
  color: #666;
}

.comments-section {
  font-family: Nunito, sans-serif;
  margin-top: 1rem;
  background: #f9f9f9;
  padding: 1rem;
  border-radius: 10px;
}

.comments-section h3 {
  color: #7E8940;
  margin-bottom: 1rem;
}

.comments-list {
  list-style-type: none;
  padding: 0;
  margin: 0;
  max-height: 200px;
  overflow-y: auto;
}

.comment-item {
  background: #fff;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.comment-text {
  margin: 0;
  color: #333;
}

.comment-input-container {
  display: flex;
  gap: 0.5rem;
  margin-top: 1rem;
}

.comment-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.comment-submit-button {
  padding: 0.5rem 1rem;
  background-color: #7E8940;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.comment-submit-button:hover {
  background-color: #606a2c;
}

@media (max-width: 768px) {
  .card-content {
    flex-direction: column;
  }
}
</style>