import './scss/app.scss';
import React, { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Cart from './pages/Cart';
import FullPizza from './pages/FullPizza';
import HeaderLayout from './layout/HeaderLayout';

const App: FC = () => {
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
};

export default App;
