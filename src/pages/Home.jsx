import React, { useState, useEffect } from "react";
import axios from "axios";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Pagination from "../components/Pagination";

function Home({ searchValue }) {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryId, setCateegoryId] = useState(0);
  const [sort, setSort] = useState({ name: "Популярности", sort: "rating" });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const sortingForTitle = sort.sort === "title" ? "asc" : "desc";
    const sortingForCategory = categoryId > 0 ? `category=${categoryId}` : "";
    const searchingForTitle = searchValue ? `&search=${searchValue}` : "";

    const fetching = async () => {
      try {
        const response = await axios.get(
          `https://66f834c72a683ce9730ef214.mockapi.io/items?page=${currentPage}&limit=4&${sortingForCategory}&sortBy=${sort.sort}&order=${sortingForTitle}${searchingForTitle}`
        );
        setItems(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetching();

    window.scrollTo(0, 0);
  }, [categoryId, sort, searchValue, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={categoryId} fn={setCateegoryId} />
        <Sort value={sort} fn={setSort} />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination fn={setCurrentPage} />
    </div>
  );
}

export default Home;
