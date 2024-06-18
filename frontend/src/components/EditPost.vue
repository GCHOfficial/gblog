<template>
  <div>
    <h2>Edit Post</h2>
    <form @submit.prevent="editPost">
      <div>
        <label>Title:</label>
        <input v-model="title" type="text" />
      </div>
      <div>
        <label>Content:</label>
        <textarea v-model="content"></textarea>
      </div>
      <button type="submit">Update</button>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { usePostsStore } from '../stores/posts';
import { useRouter } from 'vue-router';

export default {
  props: ['id'],
  setup(props) {
    const postsStore = usePostsStore();
    const router = useRouter();
    const title = ref('');
    const content = ref('');

    postsStore.fetchPost(props.id).then(() => {
      title.value = postsStore.currentPost.title;
      content.value = postsStore.currentPost.content;
    });

    const editPost = async () => {
      try {
        await postsStore.updatePost({ id: props.id, title: title.value, content: content.value });
        router.push('/posts/' + props.id);
      } catch (error) {
        console.error(error);
      }
    };

    return {
      title,
      content,
      editPost,
    };
  },
};
</script>
