<template>
    <header class="bg-gray-900 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <router-link to="/" class="flex items-center space-x-2">
          <img v-if="logoUrl" :src="logoUrl" alt="Logo" class="h-8 w-8" />
          <span v-else class="text-2xl">{{ siteName }}</span>
        </router-link>
        <div class="flex items-center">
          <DarkModeToggle class="mr-4" />
          <button @click="toggleMenu" class="focus:outline-none">
            <font-awesome-icon :icon="['fas', 'bars']" />
          </button>
        </div>
      </div>
      <div v-if="menuOpen" class="bg-gray-800 p-4">
        <nav class="space-y-2">
          <router-link v-if="!isAuthenticated" to="/login" class="block py-2">Login</router-link>
          <router-link v-if="!isAuthenticated" to="/register" class="block py-2">Register</router-link>
          <router-link v-if="isAuthenticated" to="/profile" class="block py-2">Profile</router-link>
          <button v-if="isAuthenticated" @click="logout" class="block py-2">Logout</button>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  import { ref, onMounted, computed } from 'vue';
  import { useAuthStore } from '../stores/auth';
  import { useConfigStore } from '../stores/config';
  import DarkModeToggle from './DarkModeToggle.vue';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  
  export default {
    components: {
      DarkModeToggle,
      'font-awesome-icon': FontAwesomeIcon,
    },
    setup() {
      const authStore = useAuthStore();
      const configStore = useConfigStore();
      const menuOpen = ref(false);
  
      onMounted(() => {
        configStore.fetchConfig();
        if (authStore.isAuthenticated) {
          authStore.fetchUserProfile();
        }
      });
  
      const toggleMenu = () => {
        menuOpen.value = !menuOpen.value;
      };
  
      const logout = () => {
        authStore.logout();
        toggleMenu();
      };
  
      const isAuthenticated = computed(() => authStore.isAuthenticated);
  
      return {
        menuOpen,
        toggleMenu,
        isAuthenticated,
        logout,
        siteName: computed(() => configStore.siteName),
        logoUrl: computed(() => configStore.logoUrl),
      };
    },
  };
  </script>
  
  <style scoped>
  body {
    font-family: 'Open Sans', sans-serif;
  }
  </style>
  