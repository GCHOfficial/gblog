<template>
  <div>
    <h2>Profile</h2>
    <div v-if="user">
      <p>Username: {{ user.username }}</p>
      <p>Email: {{ user.email }}</p>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '../stores/auth';

export default {
  setup() {
    const authStore = useAuthStore();
    return {
      user: authStore.currentUser,
    };
  },
};
</script>
