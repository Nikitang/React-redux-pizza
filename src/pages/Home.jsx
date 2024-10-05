import React, { useEffect, useContext, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { Link, useNavigate } from 'react-router-dom';

import Categories from '../components/Categories.jsx';
import Sort from '../components/Sort.jsx';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton.jsx';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice.js';
import { fetchPizzas, selectPizzas } from '../redux/slices/pizzasSlice.js';
import { selectFilter } from '../redux/slices/filterSlice.js';
import { sortMenu } from '../components/Sort.jsx';

function Home() {
    const navigate = useNavigate();
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzas);
    const dispatch = useDispatch();

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const fetching = async () => {
        const sortingForTitle = sort.sortParam === 'title' ? 'asc' : 'desc';
        const sortingForCategory = categoryId > 0 ? `category=${categoryId}` : '';
        const searchingForTitle = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortingForTitle,
                sortingForCategory,
                searchingForTitle,
                sort,
                currentPage,
            })
        );
    };

    useEffect(() => {
        if (!isMounted.current) {
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
        if (!window.location.search) {
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
    }, [categoryId, sort.sortParam, searchValue, currentPage]);

    const skeletons = [...new Array(6)].map((_, i) => <Skeleton key={i} />);
    const pizzas = items.map((pizza) => (
        <Link to={`pizza/${pizza.id}`} key={pizza.id}>
            <PizzaBlock {...pizza} />
        </Link>
    ));

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} fn={(id) => dispatch(setCategoryId(id))} />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            {status === 'error' ? (
                <div className="content__error-info">
                    <h1>Произошла ошибка 😕</h1>
                    <h3>Не удалось получить пиццы, попробуйте перезагрузить страницу 🔃</h3>
                </div>
            ) : (
                <div className="content__items">{status === 'loading' ? skeletons : pizzas}</div>
            )}
            <Pagination value={currentPage} fn={(num) => dispatch(setCurrentPage(num))} />
        </div>
    );
}

export default Home;
