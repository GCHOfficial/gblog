<template>
  <div>
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label>Username:</label>
        <input v-model="username" type="text" />
      </div>
      <div>
        <label>Password:</label>
        <input v-model="password" type="password" />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const login = async () => {
      try {
        await authStore.login({ username: username.value, password: password.value });
        router.push('/profile');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      username,
      password,
      login,
    };
  },
};
</script>
