import './scss/app.scss';
import React, { FC, lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from './pages/Home';
import HeaderLayout from './layout/HeaderLayout';

const Cart = Loadable({
    loader: () => import(/* webpackChunkName: "Cart" */ './pages/Cart'),
    loading: () => <div>Loading...</div>,
});

const NotFound = Loadable({
    loader: () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'),
    loading: () => <div>Loading...</div>,
});

const FullPizza = lazy(() => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza')); //Because: LoadableComponent uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

const App: FC = () => {
    return (
        <Routes>
            <Route path="/" element={<HeaderLayout />}>
                <Route path="" element={<Home />} />
                <Route path="cart" element={<Cart />} />
                <Route
                    path="pizza/:id"
                    element={
                        <Suspense>
                            <FullPizza />
                        </Suspense>
                    }
                />
                <Route path="*" element={<NotFound />} />
            </Route>
        </Routes>
    );
};

export default App;
