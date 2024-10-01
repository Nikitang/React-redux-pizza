import React, { useState, useEffect, useContext, useRef } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import qs from "qs";
import { useNavigate } from "react-router-dom";

import Categories from "../components/Categories.jsx";
import Sort from "../components/Sort.jsx";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton.jsx";
import Pagination from "../components/Pagination";
import { Context } from "../App.js";
import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice.js";
import { sortMenu } from "../components/Sort.jsx";

function Home() {
  const navigate = useNavigate();
  const { categoryId, sort, currentPage } = useSelector(
    (state) => state.filterSlice
  );
  const dispatch = useDispatch();
  const isSearch = useRef(false);
  const isMounted = useRef(false);

  const { value } = useContext(Context);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetching = async () => {
    setIsLoading(true);

    const sortingForTitle = sort.sortParam === "title" ? "asc" : "desc";
    const sortingForCategory = categoryId > 0 ? `category=${categoryId}` : "";
    const searchingForTitle = value ? `&search=${value}` : "";

    try {
      const response = await axios.get(
        `https://66f834c72a683ce9730ef214.mockapi.io/items?page=${currentPage}&limit=4&${sortingForCategory}&sortBy=${sort.sortParam}&order=${sortingForTitle}${searchingForTitle}`
      );
      setItems(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortParam: sort.sortParam,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }

    isMounted.current = true;
  }, [categoryId, sort.sortParam, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortMenu.find((obj) => obj.sortParam === params.sortParam);

      dispatch(
        setFilters({
          ...params,
          sort,
        })
      );
      isSearch.current = true;
    }
  }, []);

  useEffect(() => {
    if (!isSearch.current) {
      fetching();
    }

    isSearch.current = false;

    window.scrollTo(0, 0);
  }, [categoryId, sort.sortParam, value, currentPage]);

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
