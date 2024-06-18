<template>
  <button @click="toggleDarkMode" class="focus:outline-none">
    <font-awesome-icon :icon="isDarkMode ? 'sun' : 'moon'" />
  </button>
</template>

<script>
import { ref, watch, onMounted } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

export default {
  components: {
    'font-awesome-icon': FontAwesomeIcon,
  },
  setup() {
    const isDarkMode = ref(localStorage.getItem('darkMode') === 'true' || false);

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value;
      localStorage.setItem('darkMode', isDarkMode.value);
      updateTheme();
    };

    const updateTheme = () => {
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    onMounted(() => {
      updateTheme();
    });

    watch(isDarkMode, updateTheme);

    return {
      isDarkMode,
      toggleDarkMode,
    };
  },
};
</script>
