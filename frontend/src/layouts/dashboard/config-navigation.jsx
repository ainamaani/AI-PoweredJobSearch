import SvgColor from 'src/components/svg-color';
import { AccessTimeOutlined, AccountCircleRounded, AddCircleRounded, 
  AddRounded, AssignmentRounded, BusinessRounded, DashboardRounded, FormatListNumberedRounded, 
  HandshakeRounded, MapRounded, Person2Rounded, WorkRounded } from '@mui/icons-material';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/dashboard',
    icon: <DashboardRounded />,
  },
  {
    title: 'Jobs',
    icon: <WorkRounded />,
    subLinks: [
      { 
        title: 'View job postings',
        path: 'dashboard/jobs',
        icon: <FormatListNumberedRounded />
      },
      {
        title: 'Add job posting',
        path: 'dashboard/newjob',
        icon: <AddCircleRounded />
      }
    ]
  },
  {
    title: 'Profiles',
    icon: <Person2Rounded />,
    subLinks: [
      {
        title: 'View profiles',
        path: 'dashboard/profiles',
        icon: <AccountCircleRounded />
      },
      {
        title: 'Create profile',
        path: 'dashboard/newprofile',
        icon: <AddRounded />
      }
    ]  
  },
  {
    title: 'Applications',
    path: 'dashboard/applications',
    icon: <AssignmentRounded />,
  },
  {
    title: 'Interviews',
    path: 'dashboard/interviews',
    icon: <HandshakeRounded />,
  },
  {
    title: 'Companies',
    path: 'dashboard/companies',
    icon: <BusinessRounded />,
  },
  {
    title: 'Roadmap',
    path: 'dashboard/addroadmap',
    icon: <MapRounded />,
  },
  {
    title: 'product',
    path: 'dashboard/products',
    icon: icon('ic_cart'),
  },
  {
    title: 'blog',
    path: 'dashboard/blog',
    icon: icon('ic_blog'),
  },
  
];

export default navConfig;
