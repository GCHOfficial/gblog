<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl mb-4">Welcome to My Blog</h1>
    <PostList />
  </div>
</template>

<script>
import PostList from './PostList.vue';

export default {
  name: 'HomePage',
  components: {
    PostList,
  },
};
</script>
