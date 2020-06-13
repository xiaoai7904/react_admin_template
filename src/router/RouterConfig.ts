import React from 'react';

export const staticRouter = [
  {
    path: '/',
    name: 'Home',
  },
  {
    path: '/login',
    name: 'login',
    component: React.lazy(() => import('@/pages/login/Login.view')),
  },
];

export const dynamicRouter: { [key: string]: any } = {
  // 首页
  '/home/home': {
    component: React.lazy(() => import('@/pages/home/Home.view')),
  },
  // 用户管理
  '/user/list': {
    component: React.lazy(() => import('@/pages/userManagement/UserManagement.view')),
  },
  '/test': {
    component: React.lazy(() => import('@/pages/test/Test.view')),
  },
};

export default {
  staticRouter,
  dynamicRouter,
};
