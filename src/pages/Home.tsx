import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas, FetchPizzasParams, selectPizzas } from '../redux/slices/pizzasSlice';
import { selectFilter } from '../redux/slices/filterSlice';
import { sortMenu } from '../components/Sort';
import { useAppDispach } from '../redux/store';

const Home: FC = () => {
    const navigate = useNavigate();
    const { categoryId, sort, currentPage, searchValue } = useSelector(selectFilter);
    const { items, status } = useSelector(selectPizzas);
    const dispatch = useAppDispach();

    const isSearch = useRef(false);
    const isMounted = useRef(false);

    const onChangeCategory = useCallback((id: number) => {
        dispatch(setCategoryId(id));
    }, []);

    const fetching = async () => {
        const sortingForTitle = sort.sortParam === 'title' ? 'asc' : 'desc';
        const sortingForCategory = categoryId > 0 ? `category=${categoryId}` : '';
        const searchingForTitle = searchValue ? `&search=${searchValue}` : '';

        dispatch(
            fetchPizzas({
                sortingForTitle,
                sortingForCategory,
                searchingForTitle,
                sort: sort.sortParam,
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
                    searchValue: String(params.search),
                    categoryId: Number(params.category),
                    currentPage: Number(params.currentPage),
                    sort: sort ? sort : sortMenu[0],
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
    const pizzas = items.map((pizza: any) => <PizzaBlock key={pizza.id} {...pizza} />);

    return (
        <div className="container">
            <div className="content__top">
                <Categories value={categoryId} fn={onChangeCategory} />
                <Sort value={sort} />
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
            <Pagination value={currentPage} fn={(num: number) => dispatch(setCurrentPage(num))} />
        </div>
    );
};

export default Home;
