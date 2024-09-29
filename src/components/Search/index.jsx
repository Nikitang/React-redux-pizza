import React from "react";

import styles from "./Search.module.scss";
import close from "../../assets/img/x-lg.svg";
import search from "../../assets/img/search.svg";

function Search({ value, fn }) {
  return (
    <div className={styles.root}>
      <img className={styles.icon} src={search} alt="" />
      <input
        value={value}
        onChange={(e) => fn(e.target.value)}
        className={styles.input}
        placeholder="Поиск пиццы"
      />
      {value && (
        <img
          onClick={() => fn("")}
          className={styles.closer}
          src={close}
          alt=""
        />
      )}
    </div>
  );
}

export default Search;
