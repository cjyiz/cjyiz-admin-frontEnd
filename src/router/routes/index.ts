// 基本路由

import HelloWorld from '@/components/HelloWorld.vue';
import TheWelcome from '@/components/TheWelcome.vue';

export const routes = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: TheWelcome },
];
