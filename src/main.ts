import { createApp, h } from 'vue';
import App from './App.vue';
import './global.css';
import { apolloPlugin } from './plugins/apollo';
import { router } from './router';
import ErrorProvider from './components/ErrorProvider/ErrorProvider.vue'

createApp({
    render: () => h(ErrorProvider,null, {default: () => h(App)})
}).use(router).use(apolloPlugin).mount('#app');
