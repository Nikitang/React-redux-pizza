import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Pagination from "../components/Pagination";
import { Context } from "../App.js";
import { setCategoryId, setCurrentPage } from "../redux/slices/filterSlice.js";

function Home() {
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const dispatch = useDispatch();

  const { value } = useContext(Context);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);

    const sortingForTitle = sort.sortParam === "title" ? "desc" : "asc";
    const sortingForCategory = categoryId > 0 ? `category=${categoryId}` : "";
    const searchingForTitle = value ? `&search=${value}` : "";

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
  }, [categoryId, sort, value, currentPage]);

  const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
  const pizzas = items.map((pizza) => <PizzaBlock key={pizza.id} {...pizza} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          value={categoryId}
          fn={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : pizzas}</div>
      <Pagination
        value={currentPage}
        fn={(num) => dispatch(setCurrentPage(num))}
      />
    </div>
  );
}

export default Home;
