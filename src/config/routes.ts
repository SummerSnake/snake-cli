import Loadable from 'react-loadable';
import DelayLoading from '@components/DelayLoading';

const Home = Loadable({
  loader: () => import(/* webpackChunkName: "Home" */ '../pages/Home/index'),
  loading: DelayLoading,
  delay: 3000,
});

const SingleTable = Loadable({
  loader: () => import(/* webpackChunkName: "SingleTable" */ '../pages/Table/SingleTable/index'),
  loading: DelayLoading,
  delay: 3000,
});
const Scheduling = Loadable({
  loader: () => import(/* webpackChunkName: "Scheduling" */ '../pages/Table/Scheduling/index'),
  loading: DelayLoading,
  delay: 3000,
});
export default [
  {
    path: '/',
    component: Home,
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/table/SingleTable',
    component: SingleTable,
  },
  {
    path: '/table/Scheduling',
    component: Scheduling,
  },
];
