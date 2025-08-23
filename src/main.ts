import { createApp} from 'vue';
import App from './App.vue';
import './global.css';
import {apolloPlugin} from "./plugins/apollo";

//createApp(App).mount('#app');

createApp(App).use(apolloPlugin).mount('#app');