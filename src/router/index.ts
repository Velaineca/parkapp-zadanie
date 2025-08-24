import App from '/src/App.vue';
import LoginPage from '/src/components/LoginPage.vue';
import PilotPage from '/src/components/PilotPage.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: App,
    children: [
      { path: 'login', component: LoginPage },
      { path: 'pilot', component: PilotPage },
      { path: '', redirect: '/login' },
    ],
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
