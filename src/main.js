import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';

// createApp(App).mount('#app')
const app = createApp(App);
setupRouter(app);
app.mount('#app');
