<script>
import {useAuthenticationStore} from "../services/authentication.store.js";
import {SignUpRequest} from "../model/sign-up.request.js";
import {ObjectiveEntity} from "@/accountManagement/model/objective.entity.js";
import {AuthenticationService} from "@/iam/services/authentication.service.js";

export default {
  name: "sign-up",
  data() {
    return {
      authenticationStore: useAuthenticationStore(),
      authenticationService: null,
      email: "",
      password: "",
      objectiveOptions: [],
      objective: null,
      username: "",
      birthdate: null,
      description:"",
    };
  },
  created() {
    this.authenticationService = new AuthenticationService();
    //this.fetchObjectiveOptions();
  },
  methods: {
    onSignUp() {
      let signUpRequest = new SignUpRequest(this.username, this.password, this.email, this.description);
      console.log(signUpRequest);
      this.authenticationStore.signUp(signUpRequest, this.$router);

    },
    async fetchObjectiveOptions() {
      try {
        const response = await this.authenticationService.getObjectives();
        this.objectiveOptions = response.data.map(objective => new ObjectiveEntity(objective.id, objective.name));
      } catch (error) {
        console.error('Error al obtener los datos', error);
      }
    }
  }
}
</script>

<template>
  <div class="container">
    <div class="signup">
      <h2 class="title">{{ $t('signup.title') }}</h2>
      <p class="description">{{ $t('signup.description') }}</p>
      <form @submit.prevent="onSignUp">
        <div>
          <div>
            <pv-float-label>
              <label class="label-input" for="username">{{ $t('signup.username') }}</label>
              <pv-input-text class="input" id="username" v-model="username" :class="{'p-invalid': !username}"/>
              <small v-if="!username" class="p-invalid">{{ $t('signup.username') }} is required.</small>
            </pv-float-label>
          </div>
          <div>
            <pv-float-label>
              <label class="label-input"  for="password">{{ $t('signup.password') }}</label>
              <pv-input-text class="input" id="password" v-model="password" :class="{'p-invalid': !password}" type="password"/>
              <small v-if="!password" class="p-invalid">{{ $t('signup.password') }} is required.</small>
            </pv-float-label>
          </div>
          <div>
            <pv-float-label>
              <label class="label-input" for="email">{{ $t('signup.email') }}</label>
              <pv-input-text class="input" id="email" v-model="email" :class="{'p-invalid': !email}"/>
              <small v-if="!email" class="p-invalid">{{ $t('signup.email') }} is required.</small>
            </pv-float-label>
          </div>
          <div>
            <pv-float-label>
              <label class="label-input"  for="description">Description</label>
              <pv-input-text class="input" id="description" v-model="description" :class="{'p-invalid': !description}" type="description"/>
              <small v-if="!description" class="p-invalid">Description is required.</small>
            </pv-float-label>
          </div>
          <div class="registration-question">
            <a>
              <router-link style="text-decoration: none !important;" :to="{ path: '/login' }">
                <span class="route-to-registration">{{ $t('signup.go-to-login') }}</span>
              </router-link>
            </a>
          </div>
          <div>
            <pv-button class="btn-register" type="submit">Sign Up</pv-button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.container {
  margin-top: 3em;
  display: flex;
  justify-content: center;
  height: 100vh;
  align-items: center;
}
.signup {
  text-align: center;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}
.signup .title {
  font-size: 32px;
  margin-bottom: 20px;
  color: #8BB500D6;
}
.route-to-registration {
  text-decoration: none;
  color: #95a53a;
}
.description {
  font-size: 20px;
  line-height: 1.5;
  color: #666;
  margin-bottom: 20px;
}
.p-float-label {
  margin-bottom: 20px;
  width: 100%;
}
.input {
  width: 100% !important;
  height: 3em;
  border-radius: 5px;
}
.label-input {
  color: #666;
}
.error-message {
  position: absolute;
  top: 100%;
  left: 0;
  color: red;
  display: none;
  font-size: 14px;
  margin-top: 4px;
}
.registration-question {
  align-items: center;
  justify-content: center;
}
.go-to-registration {
  color: black;
  font-weight: 700;
}
pv-password {
  width: 100% !important;
}
.btn-register {
  background-color: #C5D951FF;
  margin-top: 1.5em;
  color: #fff;
  font-size: 18px;
  border: none;
  border-radius: 2em;
  padding: 15px 30px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}
.btn-register:hover {
  background-color: #8BB500D6;
  transform: scale(1.1);
}
@media screen and (max-width: 768px) {
  .signup {
    padding: 20px;
  }
  .title {
    font-size: 28px;
  }
  .description {
    font-size: 18px;
  }
  .btn-register {
    font-size: 16px;
    padding: 10px 20px;
  }
}
</style>