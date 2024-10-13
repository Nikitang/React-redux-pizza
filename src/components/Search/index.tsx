import React, { ChangeEvent, FC, useCallback, useRef, useState } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import close from '../../assets/img/x-lg.svg';
import search from '../../assets/img/search.svg';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/filter/slice';

export const Search: FC = () => {
    const dispatch = useDispatch();

    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    const handleClear = (): void => {
        dispatch(setSearchValue(''));
        setInputValue('');
        inputRef.current?.focus();
    };

    const updateSearch = useCallback(
        debounce((searchValue) => {
            dispatch(setSearchValue(searchValue));
        }, 400),
        []
    );

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setInputValue(e.target.value);
        updateSearch(e.target.value);
    };

    return (
        <div className={styles.root}>
            <img className={styles.icon} src={search} alt="" />
            <input
                ref={inputRef}
                value={inputValue}
                onChange={(e): void => onChangeInput(e)}
                className={styles.input}
                placeholder="Поиск пиццы"
            />
            {inputValue && (
                <img onClick={handleClear} className={styles.closer} src={close} alt="" />
            )}
        </div>
    );
};
