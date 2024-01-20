import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import {UserProvider} from './context/UserContext';
import {ThemeProvider} from './context/ThemeContext';
import { Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

const AppLayout = () => {
  const [user, setUser] = useState();
  const [themeMode, setThemeMode] = useState('light');
  
  const darkTheme = () => {
    setThemeMode('dark');
  }

  const lightTheme = () => {
    setThemeMode('light');
  }

  useEffect(() => {
    document.querySelector('html').classList.remove('dark');
    document.querySelector('html').classList.add(themeMode);
  }, [themeMode])
  return (
      <ThemeProvider value={{themeMode, darkTheme, lightTheme}}>
        <UserProvider value={{user: user, setUser: setUser}}>
          <div className='dark:bg-[rgb(61,61,61)]'>
            <Navbar />
            <Outlet />
          </div>
        </UserProvider>
      </ThemeProvider>
  )
}
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/dashboard",
        element:  <Dashboard />
      }
    ]
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={appRouter}>
  </RouterProvider>
);
