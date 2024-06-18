import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '../components/HomePage.vue';
import Login from '../components/Login.vue';
import Register from '../components/Register.vue';
import Profile from '../components/Profile.vue';
import PostList from '../components/PostList.vue';
import PostDetail from '../components/PostDetail.vue';
import CreatePost from '../components/CreatePost.vue';
import EditPost from '../components/EditPost.vue';
import { useAuthStore } from '../stores/auth';

const routes = [
  { path: '/', component: HomePage },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
  { path: '/posts', component: PostList },
  { path: '/posts/:id', component: PostDetail, props: true },
  { path: '/posts/create', component: CreatePost, meta: { requiresAuth: true } },
  { path: '/posts/edit/:id', component: EditPost, props: true, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});

export default router;
