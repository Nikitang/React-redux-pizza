import React from "react";

function Categories({ value, fn }) {
  const arrCategories = [
    "Все",
    "Мясные",
    "Вегетарианская",
    "Гриль",
    "Острые",
    "Закрытые",
  ];
  return (
    <div className="categories">
      <ul>
        {arrCategories.map((item, i) => {
          return (
            <li
              key={item}
              className={value === i ? "active" : ""}
              onClick={() => fn(i)}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Categories;
