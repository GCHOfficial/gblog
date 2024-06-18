import { defineStore } from 'pinia';
import axios from 'axios';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    refreshToken: localStorage.getItem('refreshToken') || '',
    user: null,
    status: '',
  }),
  actions: {
    async login(userData) {
      this.status = 'loading';
      try {
        const response = await axios.post('http://localhost:8000/api/login/', userData);
        const { token, refresh_token } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refresh_token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        this.token = token;
        this.refreshToken = refresh_token;
        await this.fetchUserProfile();
        this.status = 'success';
      } catch (error) {
        this.status = 'error';
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        delete axios.defaults.headers.common['Authorization'];
        throw error;
      }
    },
    async refreshToken() {
      try {
        const response = await axios.post('http://localhost:8000/api/token/refresh/', {
          refresh: this.refreshToken
        });
        const { access } = response.data;
        localStorage.setItem('token', access);
        axios.defaults.headers.common['Authorization'] = `Bearer ${access}`;
        this.token = access;
      } catch (error) {
        console.error('Failed to refresh token:', error);
        this.logout();
      }
    },
    async fetchUserProfile() {
      if (this.token) {
        try {
          console.log('Fetching User Profile with Token:', this.token);
          const response = await axios.get('http://localhost:8000/api/profile/');
          this.user = response.data;
        } catch (error) {
          this.user = null;
          console.error('Failed to fetch user profile:', error);
        }
      }
    },
    logout() {
      this.status = '';
      this.token = '';
      this.refreshToken = '';
      this.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token && !!state.user,
    authStatus: (state) => state.status,
    currentUser: (state) => state.user,
  },
});
