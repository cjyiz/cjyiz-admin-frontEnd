// 基本路由

import HelloWorld from '@/components/HelloWorld.vue';
import TheWelcome from '@/components/TheWelcome.vue';
import Login from '@/views/login/login.vue';
import Register from '@/views/login/register.vue';

export const routes = [
  { path: '/', component: HelloWorld },
  { path: '/about', component: TheWelcome },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
];
