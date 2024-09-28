import React, { useState } from "react";

function Categories() {
  const [activeI, setActiveI] = useState(0);
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
              className={activeI === i ? "active" : ""}
              onClick={() => setActiveI(i)}
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
