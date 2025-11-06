import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";  
import App from './App.js';
import Login from  './pages/login.js';
import Admin from './admin.js';    
import Home from './pages/home/index';
import UIButtons from './pages/UI/buttons.js';
import UITabs from './pages/UI/tabs.js';
import UICarousel from './pages/UI/carousel.js';
import OrderList from './pages/order/index.js';
import UsersList from './pages/users/index.js';
import BikeMap from './pages/bikeMap/index.js';
import NotFound from './pages/notFound.js';

export default class IRouter extends React.Component {

    render() {
        return (
            <HashRouter>
                <App>
                    <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/admin" element={<Admin />}>
                                <Route index element={<Navigate to="home" replace />} />
                                <Route path="home" element={<Home />} />
                                <Route path="ui">
                                    <Route path="buttons" element={<UIButtons />} />
                                    <Route path="tabs" element={<UITabs />} />
                                    <Route path="carousel" element={<UICarousel />} />
                                </Route>
                                <Route path="order" element={<OrderList />} />
                                <Route path="user" element={<UsersList />} />
                                <Route path="bikeMap" element={<BikeMap />} />
                                <Route element={<NotFound />} />
                            </Route>
                    </Routes>
                </App>
            </HashRouter>
        )
    }
}