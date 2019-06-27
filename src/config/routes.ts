import Loadable from 'react-loadable';
import DelayLoading from '@components/DelayLoading';

const Home = Loadable({
  loader: () => import('../pages/Home/index'),
  loading: DelayLoading,
  delay: 3000,
});

const SingleTable = Loadable({
  loader: () => import('../pages/Table/SingleTable/index'),
  loading: DelayLoading,
  delay: 3000,
});
const Scheduling = Loadable({
  loader: () => import('../pages/Table/Scheduling/index'),
  loading: DelayLoading,
  delay: 3000,
});
export default [
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
