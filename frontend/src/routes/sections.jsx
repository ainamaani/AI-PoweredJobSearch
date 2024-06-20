import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import UseAuthContext from 'src/hooks/use-auth-context';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/app'));
export const LandingPage = lazy(() => import('src/pages/landing'));
export const WelcomePage = lazy(() => import('src/pages/welcome-page'));
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
export const LearningRoadMapsPage = lazy(() => import('src/pages/learning-roadmaps'));
export const ApplicationsPage = lazy(() => import('src/pages/applications'));
export const AllProfilesPage = lazy(() => import('src/pages/all-profiles'));
export const UpdateProfilePage = lazy(() => import('src/pages/update-profile'));
export const ProfilesCategoryPage = lazy(() => import('src/pages/profiles-category'));
export const JobApplicationPage = lazy(() => import('src/pages/job-application'));
export const AddLearningRoadMapPage = lazy(() => import('src/pages/add-roadmap'));
export const SingleLearningRoadMapPage = lazy(() => import('src/pages/single-roadmap'));
export const ChangePasswordPage = lazy(() => import('src/pages/change-user-details'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));


// ----------------------------------------------------------------------

export default function Router() {
  const { user } = UseAuthContext();
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
      path: '/welcome',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <WelcomePage />
        </Suspense>
      ),
    },
    {
      path: '/dashboard',
      element: user ? (
        <Suspense fallback={<div>Loading...</div>}>
          <DashboardLayout>
            <Outlet />
          </DashboardLayout>
        </Suspense>
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'dashboard/jobs', element: user ? <UserPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/products', element: user ? <ProductsPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/applications', element:  user ? <ApplicationsPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/profiles', element:  user ? <ProfilesPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/interviews', element:  user ? <InterviewsPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/companies', element:  user ? <CompaniesPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/blog', element:  user ? <BlogPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/addroadmap', element:  user ? <AddLearningRoadMapPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/roadmaps', element:  user ? <LearningRoadMapsPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/newjob', element:  user ? < AddJobPostingPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/newprofile', element:  user ? <CreateProfilePage /> : <Navigate to="/login" /> },
        { path: 'dashboard/myprofile', element:  user ? <MyProfilePage/> : <Navigate to="/login" /> },
        { path: 'dashboard/allprofiles', element:  user ? <AllProfilesPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/changepassword', element:  user ? <ChangePasswordPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/updateprofile/:id', element:  user ? <UpdateProfilePage /> : <Navigate to="/login" /> },
        { path: 'dashboard/profiles/:category', element:  user ? <ProfilesCategoryPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/apply/:_id', element:  user ? <JobApplicationPage /> : <Navigate to="/login" /> },
        { path: 'dashboard/roadmap/:id', element:  user ? <SingleLearningRoadMapPage /> : <Navigate to="/login" /> },
        
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
