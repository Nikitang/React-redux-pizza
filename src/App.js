import "./scss/app.scss";
import React, { useState, createContext } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  incrementByAmount,
} from "./redux/slices/filterSlice";

import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import Cart from "./pages/Cart.jsx";

export const Context = createContext();

function App() {
  const [searchValue, setSearchValue] = useState("");
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="wrapper">
      <button
        aria-label="Increment value"
        onClick={() => dispatch(increment())}
      >
        Increment
      </button>
      <span>{count}</span>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(decrement())}
      >
        Decrement
      </button>
      <button
        aria-label="Decrement value"
        onClick={() => dispatch(incrementByAmount(10))}
      >
        IncBy
      </button>
      <Context.Provider value={{ value: searchValue, fn: setSearchValue }}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Context.Provider>
    </div>
  );
}

export default App;
