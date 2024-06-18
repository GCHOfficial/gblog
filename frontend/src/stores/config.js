import { defineStore } from 'pinia';
import axios from 'axios';

export const useConfigStore = defineStore('config', {
  state: () => ({
    siteName: 'GBlog',
    logoUrl: '',
  }),
  actions: {
    async fetchConfig() {
      try {
        const response = await axios.get('http://localhost:8000/api/site-configuration/');
        console.log('Fetched Site Configuration:', response.data);
        if (response.data && response.data.length > 0) {
          const config = response.data[0];
          this.siteName = config.site_name || 'GBlog';
          this.logoUrl = config.logo_url || '';
        }
      } catch (error) {
        console.error('Failed to fetch site configuration:', error);
      }
    },
  },
});
