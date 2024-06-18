<template>
  <div>
    <h2 class="text-2xl mb-4">Posts</h2>
    <div v-if="posts.length === 0">No posts available.</div>
    <div v-for="post in posts" :key="post.id" class="mb-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
      <router-link :to="'/posts/' + post.id" class="text-xl font-semibold hover:underline">{{ post.title }}</router-link>
    </div>
  </div>
</template>

<script>
import { usePostsStore } from '../stores/posts';
import { computed, onMounted } from 'vue';

export default {
  setup() {
    const postsStore = usePostsStore();

    onMounted(() => {
      postsStore.fetchPosts();
    });

    const posts = computed(() => postsStore.allPosts);

    return {
      posts,
    };
  },
};
</script>
