import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LandingPage = lazy(() => import('src/pages/landing'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const ResetPassword = lazy(() => import('src/pages/reset-password'));
export const CreateProfilePage = lazy(() => import('src/pages/create-profile'));
export const AddJobPostingPage = lazy(() => import('src/pages/add-job-posting'));
export const ProfilesPage = lazy(() => import('src/pages/profiles'));
export const MyProfilePage = lazy(() => import('src/pages/my-profile'));
export const InterviewsPage = lazy(() => import('src/pages/interviews'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const CompaniesPage = lazy(() => import('src/pages/companies'));
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
      path: '/',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LandingPage />
        </Suspense>
      ),
    },
    {
      path: '/dashboard',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </Suspense>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'dashboard/jobs', element: <UserPage /> },
        { path: 'dashboard/products', element: <ProductsPage /> },
        { path: 'dashboard/applications', element: <ApplicationsPage /> },
        { path: 'dashboard/profiles', element: <ProfilesPage /> },
        { path: 'dashboard/interviews', element: <InterviewsPage /> },
        { path: 'dashboard/companies', element: <CompaniesPage /> },
        { path: 'dashboard/blog', element: <BlogPage /> },
        { path: 'dashboard/newjob', element: < AddJobPostingPage /> },
        { path: 'dashboard/newprofile', element: <CreateProfilePage /> },
        { path: 'dashboard/myprofile', element: <MyProfilePage/> },
        { path: 'dashboard/allprofiles', element: <AllProfilesPage /> },
        { path: 'dashboard/updateprofile/:id', element: <UpdateProfilePage /> },
        { path: 'dashboard/profiles/:category', element: <ProfilesCategoryPage /> },
        { path: 'dashboard/apply/:_id', element: <JobApplicationPage /> }
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
      path: 'resetpassword',
      element: <ResetPassword />
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
