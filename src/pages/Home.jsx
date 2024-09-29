import React, { useState, useEffect } from "react";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock";
import axios from "axios";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      try {
        const response = await axios.get(
          "https://66f834c72a683ce9730ef214.mockapi.io/items"
        );
        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetching();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="container">
      <div className="content__top">
        <Categories />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">
        {isLoading
          ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
          : items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />)}
      </div>
    </div>
  );
}

export default Home;
