<template>
  <div>
    <h2>Create Post</h2>
    <form @submit.prevent="createPost">
      <div>
        <label>Title:</label>
        <input v-model="title" type="text" />
      </div>
      <div>
        <label>Content:</label>
        <textarea v-model="content"></textarea>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { usePostsStore } from '../stores/posts';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const postsStore = usePostsStore();
    const router = useRouter();
    const title = ref('');
    const content = ref('');

    const createPost = async () => {
      try {
        await postsStore.createPost({ title: title.value, content: content.value });
        router.push('/posts');
      } catch (error) {
        console.error(error);
      }
    };

    return {
      title,
      content,
      createPost,
    };
  },
};
</script>
