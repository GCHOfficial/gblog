<template>
  <div id="app" class="dark:bg-gray-900 dark:text-white min-h-screen">
    <Navbar />
    <main class="container mx-auto p-4">
      <router-view />
    </main>
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar,
  },
};
</script>
