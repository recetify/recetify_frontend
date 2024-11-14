<!-- Comunity Card List -->

<script>
import ComunityCard from "@/comunityUsersManagement/components/comunity-card.component.vue";
import { ComunityManagementApiService } from "@/comunityUsersManagement/services/comunityManagement-api.service";
import { publicationEntity } from "@/comunityUsersManagement/model/publication";
import { commentEntity } from "@/comunityUsersManagement/model/comment";
import { AuthenticationService } from "@/iam/services/authentication.service";

export default {
  name: "comunity-card-list",
  components: {ComunityCard},
  data() {
    return {
      showAddPublication: false,
      newPublication: {
        title: "",
        description: "",
        photo_url: ""
      },
      publications: [],
      service: new ComunityManagementApiService(),
      authService: new AuthenticationService(),
      userId: null,
      showMyPublications: false
    };
  },
  created() {
    this.fetchUserId();
    this.fetchAllPublications();
  },
  methods: {
    fetchAllPublications() {
      this.service.getPublications().then(publications => {
        if (Array.isArray(publications)) {
          this.service.getComments().then(comments => {
            this.publications = publications.map(publication => {
              return {
                ...publication,
                commentsVisible: false,
                comments: comments.filter(comment => comment.publication_id === publication.id)
              };
            });
          });
        } else {
          console.error("Expected an array of publications");
        }
      }).catch(error => {
        console.error("Error fetching publications:", error);
      });
    },
    fetchMyPublications() {
      if (!this.userId) {
        console.error("User ID not found");
        return;
      }
      this.service.getPublicationByUserId(this.userId).then(publications => {
        if (Array.isArray(publications)) {
          this.service.getComments().then(comments => {
            this.publications = publications.map(publication => {
              return {
                ...publication,
                commentsVisible: false,
                comments: comments.filter(comment => comment.publication_id === publication.id)
              };
            });
          });
        } else {
          console.error("Expected an array of publications");
        }
      }).catch(error => {
        console.error("Error fetching publications:", error);
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
          this.newPublication.title,
          this.newPublication.description,
          this.newPublication.photo_url,
          this.userId
      );
      this.service.createPublication(newPublication).then(publication => {
        this.publications.push(publication);
        this.showAddPublication = false;
        this.newPublication.title = "";
        this.newPublication.description = "";
        this.newPublication.photo_url = "";
      }).catch(error => {
        console.error("Error adding publication:", error.response ? error.response.data : error.message);
      });
    },
    deletePublication(publication) {
      if (!this.userId) {
        console.error("User ID not found");
        return;
      }
      if (publication.user_id !== this.userId) {
        console.error("Cannot delete publication: not the owner");
        return;
      }
      this.service.deletePublication(publication.id).then(() => {
        this.publications = this.publications.filter(p => p.id !== publication.id);
      }).catch(error => {
        console.error("Error deleting publication:", error.response ? error.response.data : error.message);
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
          comment.description, // Usar la descripción del comentario pasado
          this.userId,
          publication.id
      );
      this.service.createComment(newComment).then(createdComment => {
        if (!publication.comments) {
          publication.comments = [];
        }
        publication.comments.push(createdComment); // Añadir el comentario creado a la lista
      }).catch(error => {
        console.error("Error adding comment:", error);
      });
    },
    showMyPublicationsView() {
      this.showMyPublications = true;
      this.fetchMyPublications();
    },
    showAllPublicationsView() {
      this.showMyPublications = false;
      this.fetchAllPublications();
    },
    refreshPage() {
      window.location.reload();
    },
    updateCalification(publication, newCalification) {
      publication.calification = newCalification;
      this.service.updatePublication(publication).catch(error => {
        console.error("Error updating calification:", error);
      });
    }
  }
};
</script>

<template>
  <h1 class="tittle">Comunidad</h1>
  <pv-divider class="divider"></pv-divider>
  <div class="description-container">
    <p class="description">Comparte tus recetas favoritas con la comunidad y descubre nuevas recetas para probar.</p>
    <pv-button label="Haz una receta!" class="button-agregar" @click="showAddPublication = true">
      <i class="pi pi-plus"></i>
    </pv-button>
  </div>
  <div class="view-buttons">
    <pv-button label="Mis Recetas" class="button-view" @click="showMyPublicationsView"/>
    <pv-button label="Todas las Recetas" class="button-view" @click="showAllPublicationsView"/>
    <i class="fas fa-sync-alt refresh-icon" @click="refreshPage"></i>
  </div>
  <div class="add-container">
    <div class="publications-list-container">
      <comunity-card
          v-for="publication in publications"
          :key="publication.id"
          :title="publication.title"
          :description="publication.description"
          :photo_url="publication.photo_url"
          :commentsVisible="publication.commentsVisible"
          :comments="publication.comments"
          :isMyPublication="publication.user_id === userId"
          :calification="publication.calification"
          @toggle-comments="toggleComments(publication)"
          @add-comment="addComment(publication, $event)"
          @delete-publication="deletePublication(publication)"
          @update-calification="updateCalification(publication, $event)"
      />
    </div>
  </div>
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
          <input v-model="newPublication.photo_url" type="url" id="photo_url" required>
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
  color: #7E8940;
  font-family: Nunito, sans-serif;
}

.description-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.description {
  text-align: center;
  font-size: 1.2em;
  color: #7E8940;
  font-family: Nunito, sans-serif;
}

.divider {
  margin-top: 1em;
}

.view-buttons {
  font-family: Nunito, sans-serif;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.button-view {
  font-family: Nunito, sans-serif;
  background-color: #7E8940;
  color: white;
  border-radius: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.button-view:hover {
  background-color: #606a2c;
  transform: scale(1.1);
}

.refresh-icon {
  font-size: 1.5rem;
  color: #7E8940;
  cursor: pointer;
  transition: color 0.3s;
}

.refresh-icon:hover {
  color: #c5d951;
}

.add-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.button-agregar {
  background-color: #ae4c4c;
  color: white;
  border-radius: 2em;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.button-agregar i {
  font-size: 1.2rem;
}

.button-agregar:hover {
  background-color: #FF8A65;
  transform: scale(1.1);
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
</style>