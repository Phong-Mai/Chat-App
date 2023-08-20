import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login';
import Chat from './components/Chat';
import Home from './pages/Home';
import Auth from './auth/Auth';
import LoginHome from './pages/LoginHome';
import Sidebar from './components/Sidebar';
import Youtube from './components/Youtube/Youtube';
const container = document.getElementById('root');
const root = createRoot(container);
const router = createBrowserRouter([
  {
    path:"/",
    element:<LoginHome/>
  },
  {
    path:"/home",
    element:<Home/>,
  },
  {
    path:'Youtube',
    element: <Youtube/>
  }
])  
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}>
      <Auth />
      <App />
      </RouterProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

