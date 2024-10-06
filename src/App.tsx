import './scss/app.scss';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home.jsx';
import NotFound from './pages/NotFound.jsx';
import Cart from './pages/Cart.jsx';
import FullPizza from './pages/FullPizza.tsx';
import HeaderLayout from './layout/HeaderLayout.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<HeaderLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route path="pizza/:id" element={<FullPizza />} />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
}

export default App;
