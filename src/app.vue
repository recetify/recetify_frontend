<script>
import LanguageSwitcher from "@/public/pages/language-switcher.component.vue";
import AuthenticationSection from "@/iam/components/authentication-sector.vue";
export default {
  name: "app",
  components: {AuthenticationSection, LanguageSwitcher},
  title: "FitHub",
  data() {
    return {
      sidebarVisible: false
    }
  },
  methods:{
    toggleSidebar() {
      this.sidebarVisible = !this.sidebarVisible;
    }
  }
}
</script>

<template>

  <pv-toolbar class="toolbar-container">
    <template #start>
      <div class="toolbar-content1 flex align-items-center">
        <pv-button class="sidebar-button" icon="pi pi-bars" @click="toggleSidebar"/>
        <img class="logo-toolbar" src="https://github.com/aksoonie/fithub-db/assets/134560396/5b192cd5-6101-4d98-b975-228b48c009c6" alt="logo">
      </div>

      <div class="toolbar-content">
        <!--Secciones de la Aplicacion-->
        <a>
          <router-link :to="{ path: '/my-account' }" >
            <i class="pi pi-user"></i>
            <span class="font-medium">Mi cuenta</span>
          </router-link>
        </a>
        <a>
          <!--<router-link :to="{ path: '/shop-management' }" >-->
          <router-link :to="{ path: '/exercises' }" >
            <i class="pi pi-shopping-cart"></i>
            <span class="font-medium">Compras</span>
          </router-link>
        </a>
        <a>
          <!--<router-link :to="{ path: '/recipes-management' }" >-->
          <router-link :to="{ path: '/nutritions' }" >
            <i class="pi pi-apple"></i>
            <span class="font-medium">Recetas</span>
          </router-link>
        </a>
        <a>
          <!--<router-link :to="{ path: '/comunity-management' }" >-->
          <router-link :to="{ path: '/comunity' }" >
            <i class="pi pi-users"></i>
            <span class="font-medium">Comunidad</span>
          </router-link>
        </a>

        <authentication-section></authentication-section>

      </div>
    </template>
  </pv-toolbar>
  <router-view></router-view>
</template>

<style scoped>
  .sidebar-button{
    display:none;
  }
  .logo-toolbar{
    height:2.5em;
  }
  .center-content {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%; /* Asegúrate de que el div ocupe todo el espacio disponible */
  }
  .pi{
    color: #7E8940;
    margin:0.3em;
  }
  .toolbar-container{
    height:5em;
    display:inline-block;
    margin-bottom:1.5em;
    width:100%;
    background-color: #c5d951;
  }
  .toolbar-container a{
    font-size:1em;
    text-decoration: none;
    margin-left:1.5em;
    border-radius:1.5em;
    color: #7E8940;
    font-family:Nunito, sans-serif;
    font-weight:800 !important;
  }
  .logo-toolbar{
    width:3em;
    margin: 0.5rem;
  }
  .sidebar-button{
    background-color: #7E8940;
    margin-left:1.5em;
  }
  .toolbar-content {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
  .toolbar-content{
    display: flex;
    align-items: center;
  }
  .close-button{
    color:white;
    background: #7E8940;
  }
  .language-switcher-wrapper {
    margin-left:2em;
    margin-right:2em;
  }
  .overflow-y-auto {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 100%;
  }
  .sidebar-route-path-link a, .language-switcher-sidebar{
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    color: #7E8940;
    margin: 0.5rem;
    padding: 0.5rem;
  }
  @media (max-width: 1086px){
    .toolbar-content{
      display: none;
    }
    .sidebar-button{
      display:flex;
    }
  }
</style>
