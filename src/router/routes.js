// AuthRoute를 거친 라우터를 정의하고 component를 지정합니다.
// 지정된 route는 @/App.js에서 사용됩니다.
// refs = https://reacttraining.com/react-router/web/guides/static-routes

// 하위 route는 routes의 배열로 작성합니다.
import { lazy } from 'react';
import { NotFound, Login } from '@/pages';

const routes = [
  {
    path: '/',
    name: 'root',
    exact: true,
    redirect: '/dashoboard',
    meta: {
      navigation: {
        show: false,
      },
    },
  },
  {
    path: '/dashboard/:time?',
    name: 'dashboard',
    component: lazy(() => import('@/components/dashboard/Container')),
    meta: {
      navigation: {
        show: true,
        breadTitle: '실시간 발전 현황'
      },
    },
  },
  {
    path: '/detail',
    name: 'detail',
    component: lazy(() => import('@/components/detail/Container')),
    meta: {
      navigation: {
        show: true,
        breadTitle: '실시간 발전 현황'
      },
    },
  },
  {
    path: '/login',
    name: "login (Don't use Layout)",
    component: Login,
    meta: {
      navigation: {
        show: true,
      },
    },
  },
  {
    path: '*',
    component: NotFound,
    meta: {
      navigation: {
        show: false,
      },
    },
  },
];

export default routes;
