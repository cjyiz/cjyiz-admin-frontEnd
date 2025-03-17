import { createWebHistory } from 'vue-router';
import { createRouter } from 'vue-router';
import { routes } from './routes';
import { App } from 'vue';

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export function setupRouter(app: App<Element>) {
  app.use(router);
}
