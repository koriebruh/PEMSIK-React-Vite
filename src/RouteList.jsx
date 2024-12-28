import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import AdminLayout from "./pages/AdminLayout.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import {Provider} from "react-redux";
import {store} from "./store/store.jsx";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Provider store={store}>
            <Login/>
        </Provider>,
    },
    {
        path: '/register',
        element: <Provider store={store}><Register/></Provider> ,
    },
    {
        path: '/dashboard',
        element:
            <Dashboard/>,
    },
    {
        path: '/admin/mahasiswa',

        element: <Provider store={store}>
            <AdminLayout/>
        </Provider>,
    },

]);

const RouteList = () => {
    return <RouterProvider router={router}/>;
};

export default RouteList;
