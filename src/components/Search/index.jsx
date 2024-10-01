import React, { useCallback, useContext, useRef, useState } from "react";
import debounce from "lodash.debounce";

import styles from "./Search.module.scss";
import close from "../../assets/img/x-lg.svg";
import search from "../../assets/img/search.svg";
import { Context } from "../../App";

function Search() {
  const [inputValue, setInputValue] = useState("");

  const { fn } = useContext(Context);

  const inputRef = useRef();

  const handleClear = () => {
    fn("");
    setInputValue("");
    inputRef.current.focus();
  };

  const updateSearch = useCallback(
    debounce((searchValue) => {
      fn(searchValue);
    }, 400),
    []
  );

  const onChangeInput = (e) => {
    setInputValue(e.target.value);
    updateSearch(e.target.value);
  };

  return (
    <div className={styles.root}>
      <img className={styles.icon} src={search} alt="" />
      <input
        ref={inputRef}
        value={inputValue}
        onChange={(e) => onChangeInput(e)}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {inputValue && (
        <img
          onClick={handleClear}
          className={styles.closer}
          src={close}
          alt=""
        />
      )}
    </div>
  );
}

export default Search;
