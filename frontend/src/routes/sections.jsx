import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const CreateProfilePage = lazy(() => import('src/pages/create-profile'));
export const AddJobPostingPage = lazy(() => import('src/pages/add-job-posting'));
export const ProfilesPage = lazy(() => import('src/pages/profiles'));
export const InterviewsPage = lazy(() => import('src/pages/interviews'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const ApplicationsPage = lazy(() => import('src/pages/applications'));
export const AllProfilesPage = lazy(() => import('src/pages/all-profiles'));
export const UpdateProfilePage = lazy(() => import('src/pages/update-profile'));
export const ProfilesCategoryPage = lazy(() => import('src/pages/profiles-category'));
export const JobApplicationPage = lazy(() => import('src/pages/job-application'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));


// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'jobs', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'applications', element: <ApplicationsPage /> },
        { path: 'profiles', element: <ProfilesPage /> },
        { path: 'interviews', element: <InterviewsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'newjob', element: < AddJobPostingPage /> },
        { path: 'newprofile', element: <CreateProfilePage /> },
        { path: 'allprofiles', element: <AllProfilesPage /> },
        { path: 'updateprofile', element: <UpdateProfilePage /> },
        { path: 'profiles/:category', element: <ProfilesCategoryPage /> },
        { path: 'apply/:id', element: <JobApplicationPage /> }
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
