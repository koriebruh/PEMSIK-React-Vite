import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminLayout from "./pages/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login/>,
    },
    {
        path: '/register',
        element: <Register/>,
    },
    {
        path: '/dashboard',
        element: <Dashboard/>,
    },
    {
        path: '/admin/mahasiswa',
        element: <AdminLayout/>,
    },

]);

const RouteList = () => {
    return <RouterProvider router={router}/>;
};

export default RouteList;
