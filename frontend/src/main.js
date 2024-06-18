import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './assets/tailwind.css';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faBars, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

import axios from 'axios';
import { useAuthStore } from './stores/auth';
import { useConfigStore } from './stores/config';

library.add(faBars, faSun, faMoon);

const app = createApp(App);

app.component('font-awesome-icon', FontAwesomeIcon);

app.use(router);
app.use(createPinia());

const authStore = useAuthStore();
const configStore = useConfigStore();

if (authStore.token) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${authStore.token}`;
  authStore.fetchUserProfile();
}

configStore.fetchConfig().then(() => {
  console.log('Setting document title:', configStore.siteName);
  document.title = configStore.siteName;
});

app.mount('#app');

axios.interceptors.request.use(request => {
  console.log('Starting Request', request);
  console.log('Request Headers:', request.headers);
  return request;
});

axios.interceptors.response.use(response => {
  console.log('Response:', response);
  return response;
}, async error => {
  console.log('Error Response:', error.response);
  if (error.response.status === 401 && error.config && !error.config.__isRetryRequest) {
    if (authStore.refreshToken) {
      try {
        await authStore.refreshToken();
        error.config.headers['Authorization'] = `Bearer ${authStore.token}`;
        error.config.__isRetryRequest = true;
        return axios(error.config);
      } catch (refreshError) {
        authStore.logout();
        return Promise.reject(refreshError);
      }
    } else {
      authStore.logout();
    }
  }
  return Promise.reject(error);
});
