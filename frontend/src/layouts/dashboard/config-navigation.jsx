import SvgColor from 'src/components/svg-color';
import { AccessTimeOutlined } from '@mui/icons-material';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Jobs',
    icon: icon('ic_user'),
    subLinks: [
      { 
        title: 'View job postings',
        path: '/jobs',
        icon: icon('ic_user')
      },
      {
        title: 'Add job posting',
        path: '/newjob',
        icon: icon('ic_user')
      }
    ]
  },
  {
    title: 'Profiles',
    icon: icon('ic_user'),
    subLinks: [
      {
        title: 'View profiles',
        path: '/profiles',
        icon: icon('ic_user')
      },
      {
        title: 'Create profile',
        path: '/newprofile',
        icon: icon('ic_user')
      }
    ]  
  },
  {
    title: 'Applications',
    path: '/applications',
    icon: icon('ic_cart'),
  },
  {
    title: 'Interviews',
    path: '/interviews',
    icon: icon('ic_cart'),
  },
  {
    title: 'product',
    path: '/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: '/blog',
    icon: icon('ic_blog'),
  },
  {
    title: 'login',
    path: '/login',
    icon: icon('ic_lock'),
  },
  
  {
    title: 'Not found',
    path: '/404',
    icon: icon('ic_disabled'),
  },
];

export default navConfig;
