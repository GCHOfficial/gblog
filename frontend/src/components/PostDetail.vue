<template>
  <div v-if="post" class="container mx-auto p-4">
    <h2 class="text-3xl mb-4">{{ post.title }}</h2>
    <p class="text-lg">{{ post.content }}</p>
  </div>
  <div v-else class="container mx-auto p-4">
    <p>Loading...</p>
  </div>
</template>

<script>
import { usePostsStore } from '../stores/posts';
import { computed, watchEffect } from 'vue';

export default {
  props: ['id'],
  setup(props) {
    const postsStore = usePostsStore();

    watchEffect(() => {
      postsStore.fetchPost(props.id);
    });

    const post = computed(() => postsStore.currentPost);

    return {
      post,
    };
  },
};
</script>
