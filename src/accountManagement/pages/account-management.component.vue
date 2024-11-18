<script>
import ConfirmComponent from "@/accountManagement/components/confirm.component.vue";
import { AccountManagementApiService } from "@/accountManagement/services/accountManagement-api.service.js";
import { ObjectiveEntity } from "@/accountManagement/model/objective.entity.js";
import { userEntity } from "@/accountManagement/model/user.entity.js";
import { useAuthUserStore } from "@/iam/services/authUser.store.js";
import router from "@/router/index.js";
import DeleteComponent from "@/accountManagement/components/delete.component.vue"
import {useAuthenticationStore} from "@/iam/services/authentication.store.js";
import {useRouter} from "vue-router";
export default {
  name: "settings-card",
  title: "Configuration",
  components: {
    DeleteComponent,
    ConfirmComponent,
  },
  setup() {
    const router = useRouter();

    const authUserStore = useAuthUserStore();
    const userId = authUserStore.getUserId; // Esto es correcto como getter reactivo

    // Comprobar si el userId está disponible antes de devolverlo
    if (!userId) {
      console.error("ID de usuario no disponible en setup");
    }

    return { userId };
  },
  data() {
    return {
      accountManagementApiService: null,
      username: null,
      password: null,
      email: null,
      description: null,
      users: [],
      showConfirm: false,
      showDelete: false,
      objectiveOptions: [], // Añadir esta propiedad para almacenar las opciones de objetivos
    };
  },
  created() {
    this.accountManagementApiService = new AccountManagementApiService();
    if (this.userId) {
      this.fetchUserData();
    } else {
      console.error("ID de usuario no disponible al crear el componente");
    }
  },
  methods: {
    async fetchObjectiveOptions() {
      try {
        const response = await this.accountManagementApiService.getObjectives();
        this.objectiveOptions = response.data.map(objective => new ObjectiveEntity(objective.id, objective.name));
      } catch (error) {
        console.error('Error al obtener los datos', error);
      }
    },
    async fetchUserData() {
      try {
        // Verifica que userId no esté vacío o nulo
        if (this.userId) {
          const { data } = await this.accountManagementApiService.getCurrentUser(this.userId);
          const user = new userEntity(data.id, data.username, data.password, data.email, data.description);
          if (user) {
            this.username = user.username;
            this.password = user.password;
            this.email = user.email;
            this.description = user.description;
          } else {
            console.error('Usuario no encontrado');
          }
        } else {
          console.error('ID de usuario no disponible dentro de fetchUserData');
        }
      } catch (error) {
        console.error('Error al obtener los datos', error);
      }
    },
    async updateUser() {
      try {
        const userData = {
          username: this.username,
          password: this.password,
          email: this.email,
          description: this.description,
        };
        await this.accountManagementApiService.updateUser(this.userId, userData);
      } catch (error) {
        console.error('Error al actualizar los datos', error);
      }
    },
    onConfirm() {
      this.updateUser();
      this.showConfirm = false;
    },
    onCancel() {
      this.showConfirm = false;
    },
    toggleEdit(field) {
      console.log(`toggleEdit ha sido llamado con el campo: ${field}`);
      if (field === 'email') {
        this.editEmail = !this.editEmail;
      }
    },
    onDeleteConfirm() {
      this.deleteUser(); // Llama al método para realizar la eliminación
      this.showDelete = false; // Cierra el modal de confirmación
    },

    // Método para cancelar la eliminación
    onDeleteCancel() {
      this.showDelete = false; // Cierra el modal de confirmación sin hacer nada
    },

    // Método para eliminar el usuario
    async deleteUser() {

      const authenticationStore = useAuthenticationStore(); // Accede al store de autenticación
      if (!this.userId) {
        console.error('User ID is required to delete the user');
        return;
      }
      // Llamamos al servicio para eliminar el usuario
      console.log(router);
      await this.accountManagementApiService.deleteCurrentUser(this.userId);
      await authenticationStore.logout();
      await router.push({name: 'sign-in'});
    },
    async logout() {
      const authenticationStore = useAuthenticationStore(); // Accede al store de autenticación

      try {
        // Llamar al método logout desde el store de autenticación
        await authenticationStore.logout(); // Asegúrate de que logout esté en tu store
        // Redirigir al usuario a la página de inicio de sesión después de cerrar sesión
        await router.push({ name: 'sign-in' });
      } catch (error) {
        console.log(authenticationStore.isAuthenticated)
        console.error('Error al cerrar sesión:', error);
      }
    }
  }
};
</script>

<template>
<h1 class="titulo-account">{{ $t('toolbar.myaccount') }}</h1>
  <pv-divider class="divider"></pv-divider>
<div class="profile">
  <div class="profile-section">
    <div class="personal-data">
      <div class="personal-info">
        <div class="field">
          <label for="name">{{ $t('my-account.name') }} </label>
          <pv-input-text class="p-inputtext" id="username" v-model="username" :placeholder="username ? username : $t('my-account.name')"/>
        </div>
        <div class="field">
          <label for="password">{{ $t('my-account.password') }} </label>
          <pv-input-text class="p-inputtext" id="password" v-model="password" type="password"/>
        </div>
        <div class="field">
          <label for="email">{{ $t('my-account.email') }} </label>
          <pv-input-text class="p-inputtext" id="email" v-model="email"/>
        </div>
        <div class="field">
          <label for="description">{{ $t('my-account.description') }} </label>
          <pv-input-text class="p-inputtext" id="description" v-model="description"/>
        </div>
        <div class="button-container">
          <!-- Botón de actualización -->
          <div class="button-update">
            <pv-button class="botoncito" @click="showConfirm = true" v-show="!showConfirm">
              {{$t('confirmation.confirm')}}
            </pv-button>
            <ConfirmComponent
                class="confirmation-update-button"
                :show="showConfirm"
                :message="$t('my-account.message')"
                @confirm="onConfirm"
                @cancel="onCancel"
            />
          </div>

          <!-- Botón de eliminación -->
          <div class="button-delete">
            <pv-button class="botoncito-delete" @click="showDelete = true" v-show="!showDelete">
              {{$t('confirmation.delete')}}
            </pv-button>
            <DeleteComponent
                class="confirmation-delete-button"
                :show="showDelete"
                :message="$t('my-account.message')"
                @confirm="onDeleteConfirm"
                @cancel="onDeleteCancel"
            />
          </div>
        </div>
        <!-- Botón de Logout -->
        <div>
          <!-- Botón para cerrar sesión -->
          <pv-button class="botoncito-logout" @click="logout " >
            LogOut
          </pv-button>
        </div>
    </div>
  </div>
</div>
</div>
</template>

<style>
.titulo-account {
  margin-left: 3em;
  color: #c5d951;
  font-family: Nunito, sans-serif;
}
.divider {
  margin: auto auto 3em;
  width: 90%;
}
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
  font-family: Nunito, sans-serif;
}

.profile-section {
  width: 100%;
  max-width: 600px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  margin-bottom: 2rem;
}

.profile-section h3 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #c5d951;
}

.personal-data {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.personal-info {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.field {
  display: flex;
  flex-direction: column;
}

.field label {
  font-weight: 500;
  margin-bottom: 0.5rem;
  color: #c5d951;
}

.field .p-inputtext,
.field .p-dropdown,
.field .p-calendar {
  width: 100%;
  border-radius: 5px;
}

.button-update {
  display: flex;
  justify-content: flex-end;
  background: white;
}

.button-container {
  display: flex;
  justify-content: space-between;  /* Alinea los botones en las esquinas */
  align-items: center;  /* Alineación vertical de los botones */
  width: 100%;  /* Hace que el contenedor ocupe todo el ancho disponible */
  gap: 1em;  /* Espacio entre los botones */
  position: relative;
  z-index: 1;  /* Asegura que los botones estén por encima de otros elementos */
}

.botoncito, .botoncito-delete, .botoncito-logout {
  font-family: inherit;
  text-align: center;
  height: 2.6em;
  line-height: 2.5em;
  overflow: hidden;
  margin: 20px;
  font-size: 17px;
  z-index: 1;
  border: 2px solid;
  border-radius: 6px;
  position: relative;
  color: white;
  background: white;
  margin: 0; /* Sin margen adicional */
}


.botoncito {
  --color: #4caf50;
  color: var(--color);
  border-color: var(--color);
  font-family: Nunito, sans-serif;
}

.botoncito::before {
  position: absolute;
  content: "";
  background: var(--color);
  width: 150px;
  height: 200px;
  z-index: -1;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: .3s all;
}

.botoncito:hover {
  color: white;
}

.botoncito:hover::before {
  top: -30px;
  left: -30px;
}

/* Botón Delete */
.botoncito-delete {
  --color: #f44336;
  color: var(--color);
  border-color: var(--color);
}

.botoncito-delete::before {
  position: absolute;
  content: "";
  background: red;
  width: 150px;
  height: 200px;
  z-index: -1;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: .3s all;
}

.botoncito-delete:hover {
  color: white;
}

.botoncito-delete:hover::before {
  top: -30px;
  left: -30px;
}


.botoncito-logout {
  --color: gray;
  color: var(--color);
  border-color: var(--color);
}

.botoncito-logout::before {
  position: absolute;
  content: "";
  background: gray;
  width: 150px;
  height: 200px;
  z-index: -1;
  border-radius: 50%;
  top: 100%;
  left: 100%;
  transition: .3s all;
}

.botoncito-logout:hover {
  color: white;
}

.botoncito-logout:hover::before {
  top: -30px;
  left: -30px;
}







/* Estilo para los componentes de confirmación de actualización y eliminación */
.confirmation-update-button,
.confirmation-delete-button {
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: flex-end;
  gap: 0.5em;
  z-index: 1;  /* Asegura que los botones de confirmación estén encima */
}

.message {
  text-align: center;
}



/* Media Queries for Responsiveness */
@media (max-width: 768px) {
  .titulo-settings {
    font-size: 1.5rem;
  }

  .divider {
    width: 80%;
  }

  .profile-section {
    padding: 1.5rem;
  }

  .profile-section h3 {
    font-size: 1.25rem;
  }

  .field .p-inputtext,
  .field .p-dropdown,
  .field .p-calendar {
    font-size: 0.9rem;
  }

}

@media (max-width: 480px) {
  .titulo-settings {
    font-size: 1.25rem;
  }

  .divider {
    width: 100%;
  }

  .profile-section {
    padding: 1rem;
  }

  .profile-section h3 {
    font-size: 1rem;
  }

  .field label {
    font-size: 0.9rem;
  }


}

</style>