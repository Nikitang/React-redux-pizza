import React, { useState, useEffect } from "react";
import axios from "axios";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";

function Home() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCateegoryId] = useState(0);
  const [sort, setSort] = useState({ name: "Популярности", sort: "rating" });

  useEffect(() => {
    setIsLoading(true);

    const sortingForTitle = sort.sort === "title" ? "asc" : "desc";
    const sortingForCategory = categoryId > 0 ? `category=${categoryId}` : "";

    const fetching = async () => {
      try {
        const response = await axios.get(
          `https://66f834c72a683ce9730ef214.mockapi.io/items?${sortingForCategory}&sortBy=${sort.sort}&order=${sortingForTitle}`
        );
        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetching();

    window.scrollTo(0, 0);
  }, [categoryId, sort]);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} fn={setCateegoryId} />
        <Sort value={sort} fn={setSort} />
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
