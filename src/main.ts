import { createApp } from 'vue';
import App from './App.vue';
import './global.css';
import { apolloPlugin } from './plugins/apollo';
import { router } from './router';

//createApp(App).mount('#app');

createApp(App).use(router).use(apolloPlugin).mount('#app');
