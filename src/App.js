import "./scss/app.scss";
import Header from "./components/Header.jsx";
import Categories from "./components/Categories.jsx";
import Sort from "./components/Sort.jsx";
import PizzaBlock from "./components/PizzaBlock.jsx";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(
          "https://66f834c72a683ce9730ef214.mockapi.io/items"
        );
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetching();
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {items.map((pizza) => (
              <PizzaBlock key={pizza.id} {...pizza} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
