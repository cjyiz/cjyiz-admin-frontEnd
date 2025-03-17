import { RouteRecordRaw } from 'vue-router';

// 404页面
const NotFoundRoute:RouteRecordRaw={
    component:()=>import(),
    meta:{
        hideInBreadcrumb:true,
        hideInMenu:true,
        hideInTab:true,
        title:'404'
    },
    name:'NotFound',
    path:'/:path(.*)*'
}