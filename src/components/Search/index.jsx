import React, { useContext } from "react";

import styles from "./Search.module.scss";
import close from "../../assets/img/x-lg.svg";
import search from "../../assets/img/search.svg";
import { Context } from "../../App";

function Search() {
  const { value, fn } = useContext(Context);

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
