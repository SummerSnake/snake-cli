import Loadable from 'react-loadable';
import DelayLoading from '@components/DelayLoading';

const Home = Loadable({
  loader: () => import('../pages/Home/index'),
  loading: DelayLoading,
  delay: 3000,
});

export default [
  {
    path: '/home',
    component: Home,
  },
];
