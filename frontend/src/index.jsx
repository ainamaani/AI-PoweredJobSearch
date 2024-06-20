import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './contexts/AuthContext';


import App from './App';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <ToastContainer />
    <BrowserRouter>
      <Suspense>
        <AuthContextProvider>
          <App />
        </AuthContextProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
