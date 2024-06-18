import { defineStore } from 'pinia';
import axios from 'axios';

export const usePostsStore = defineStore('posts', {
  state: () => ({
    posts: [],
    post: {},
  }),
  actions: {
    async fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8000/api/posts/');
        this.posts = response.data;
      } catch (error) {
        console.error('Failed to fetch posts:', error);
      }
    },
    async fetchPost(id) {
      try {
        const response = await axios.get(`http://localhost:8000/api/posts/${id}/`);
        this.post = response.data;
      } catch (error) {
        console.error('Failed to fetch post:', error);
      }
    },
    async createPost(post) {
      try {
        const response = await axios.post('http://localhost:8000/api/posts/', post);
        this.post = response.data;
      } catch (error) {
        console.error('Failed to create post:', error);
      }
    },
    async updatePost(post) {
      try {
        const response = await axios.put(`http://localhost:8000/api/posts/${post.id}/`, post);
        this.post = response.data;
      } catch (error) {
        console.error('Failed to update post:', error);
      }
    },
    async deletePost(id) {
      try {
        await axios.delete(`http://localhost:8000/api/posts/${id}/`);
        this.post = {};
      } catch (error) {
        console.error('Failed to delete post:', error);
      }
    },
  },
  getters: {
    allPosts: (state) => state.posts,
    currentPost: (state) => state.post,
  },
});
