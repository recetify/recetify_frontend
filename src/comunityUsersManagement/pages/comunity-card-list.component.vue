<!-- Comunity Card List -->
<script>
import ComunityCard from "@/comunityUsersManagement/components/comunity-card.component.vue";
import { ComunityManagementApiService } from "@/comunityUsersManagement/services/comunityManagement-api.service";
import { publicationEntity } from "@/comunityUsersManagement/model/publication";
import { commentEntity } from "@/comunityUsersManagement/model/comment"; // Import commentEntity
import { AuthenticationService } from "@/iam/services/authentication.service";

export default {
  name: "comunity-card-list",
  components: { ComunityCard },
  data() {
    return {
      showAddPublication: false,
      newPublication: {
        description: "",
        photo_url: ""
      },
      publications: [],
      service: new ComunityManagementApiService(),
      authService: new AuthenticationService(),
      userId: null
    };
  },
  created() {
    this.fetchPublications();
    this.fetchUserId();
  },
  methods: {
    fetchPublications() {
      this.service.getPublications().then(publications => {
        this.service.getComments().then(comments => {
          this.publications = publications.map(publication => {
            return {
              ...publication,
              commentsVisible: false,
              comments: comments.filter(comment => comment.publication_id === publication.id)
            };
          });
        });
      });
    },
    fetchUserId() {
      const userId = localStorage.getItem('userId');
      if (userId) {
        this.userId = userId;
      } else {
        console.error("User ID not found in local storage");
      }
    },
    addPublication() {
      if (!this.userId) {
        console.error("User ID not found");
        return;
      }
      const newPublication = new publicationEntity(
          '',
          0,
          this.newPublication.description,
          this.newPublication.photo_url,
          this.userId
      );
      this.service.createPublication(newPublication).then(publication => {
        this.publications.push(publication);
        this.showAddPublication = false;
        this.newPublication.description = "";
        this.newPublication.photo_url = "";
      }).catch(error => {
        console.error("Error adding publication:", error);
      });
    },
    toggleComments(publication) {
      publication.commentsVisible = !publication.commentsVisible;
    },
    addComment(publication, comment) {
      if (!this.userId) {
        console.error("User ID not found");
        return;
      }
      if (!publication.id) {
        console.error("Publication ID not found");
        return;
      }
      const newComment = new commentEntity(
          '',
          comment,
          this.userId,
          publication.id
      );
      this.service.createComment(newComment).then(createdComment => {
        if (!publication.comments) {
          publication.comments = []; // Ensure comments array is initialized
        }
        publication.comments.push(createdComment.description);
      }).catch(error => {
        console.error("Error adding comment:", error);
      });
    },
  }
};
</script>
<template>
  <h1 class="tittle">Comunidad</h1>
  <pv-divider class="divider"></pv-divider>
  <div class="add-container">
    <pv-button label="Haz una receta!" class="button-agregar" @click="showAddPublication = true" />
    <div class="publications-list-container">
      <comunity-card
          v-for="publication in publications"
          :key="publication.id"
          :title="publication.title"
          :description="publication.description"
          :photo_url="publication.photo_url"
          :commentsVisible="publication.commentsVisible"
          :comments="publication.comments"
          @toggle-comments="toggleComments(publication)"
          @add-comment="addComment(publication, $event)"
      />
    </div>
  </div>
  <!-- Modal para agregar-->
  <div v-if="showAddPublication" class="modal">
    <div class="modal-content">
      <h2>Publica una receta</h2>
      <form @submit.prevent="addPublication">
        <div class="form-group">
          <label for="title">Título</label>
          <input v-model="newPublication.title" type="text" id="title" required>
        </div>
        <div class="form-group">
          <label for="description">Descripción</label>
          <pv-textarea v-model="newPublication.description" id="description" required></pv-textarea>
        </div>
        <div class="form-group">
          <label for="photo_url">URL de la Foto</label>
          <input v-model="newPublication.photoUrl" type="url" id="photo_url" required>
        </div>
        <div class="form-actions">
          <pv-button type="submit" class="add-button">Agregar</pv-button>
          <pv-button type="button" class="cancel-button" @click="showAddPublication = false">Cancelar</pv-button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.tittle {
  text-align: center;
  font-size: 2em;
  margin-top: 1em;
}
.divider {
  margin-top: 1em;
}
.add-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.button-agregar {
  background-color: #7E8940;
  color: white;
  border-radius: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  margin-top: 1em;
}
.publications-list-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-content {
  background: white;
  padding: 2em;
  border-radius: 10px;
  width: 500px;
}
.form-group {
  margin-bottom: 1em;
}
.form-group label {
  display: block;
  margin-bottom: 0.5em;
}
.form-group input, .form-group textarea, .form-group select {
  width: 100%;
  padding: 0.5em;
}
.form-actions {
  display: flex;
  justify-content: flex-end;
}

.add-button {
  background-color: #7E8940;
  color: white;
  border-radius: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.add-button:hover {
  background-color: #C5D951FF;
  transform: scale(1.1);
}

.cancel-button {
  background-color: firebrick;
  color: white;
  border-radius: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
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

.comments-section h3 {
  cursor: pointer;
  color: #7E8940;
  margin-bottom: 0.5rem;
}

.comments-section ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.comments-section li {
  background: #fff;
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 5px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.comments-section input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-top: 0.5rem;
}

.comments-section input:focus {
  outline: none;
  border-color: #7E8940;
}

.comments-section input::placeholder {
  color: #ccc;
}

.comments-section input[type="submit"] {
  background-color: #7E8940;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  transition: background-color 0.3s;
}

</style>