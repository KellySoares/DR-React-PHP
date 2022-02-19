import React from 'react';
import { Routes, Route } from "react-router-dom";
import Calculadora from '../pages/Calculadora';
import Home from '../pages/Home';

const MainRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Home />}
            />
            <Route
                path="/calc"
                element={<Calculadora />}
            />
        </Routes>
    )
}

export default MainRoutes;