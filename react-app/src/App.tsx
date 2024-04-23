import React from 'react';
import './App.css';
import Users from "./pages/users/Users";
import Dashboard from "./pages/Dashboard";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/login";
import axios from 'axios';
import UsersCreate from "./pages/users/UsersCreate";
import UsersUpdate from './pages/users/UsersUpdate';
import Roles from "./pages/roles/Roles";
import RolesCreate from "./pages/roles/RolesCreate";
import RolesUpdate from './pages/roles/RolesUpdate';
import Products from "./pages/products/Products";
import ProductsCreate from "./pages/products/ProductsCreate";
import ProductsUpdate from "./pages/products/ProductsUpdate";
import Orders from "./pages/orders/Orders";
import Profile from "./pages/Profile";

axios.defaults.baseURL = 'http://localhost:8000/api/';
axios.defaults.withCredentials = true;
function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Dashboard/>}/>
                    <Route path={'/users'} element={<Users/>}/>
                    <Route path={'/users/create'} element={<UsersCreate/>}/>
                    <Route path={'/user/:id/update'} element={<UsersUpdate/>}/>
                    <Route path={'/roles'} element={<Roles/>}/>
                    <Route path={'/roles/create'} element={<RolesCreate/>}/>
                    <Route path={'/role/:id/update'} element={<RolesUpdate/>}/>
                    <Route path={'/products'} element={<Products/>}/>
                    <Route path={'/products/create'} element={<ProductsCreate/>}/>
                    <Route path={'/product/:id/update'} element={<ProductsUpdate/>}/>
                    <Route path={'/register'} element={<Register/>}/>
                    <Route path={'/orders'} element={<Orders/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/profile'} element={<Profile/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
