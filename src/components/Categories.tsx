import React, { FC } from 'react';

type CategoriesProps = {
    value: number;
    fn: (index: number) => void;
};

const arrCategories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

const Categories: FC<CategoriesProps> = ({ value, fn }) => {
    return (
        <div className="categories">
            <ul>
                {arrCategories.map((item, i) => {
                    return (
                        <li
                            key={item}
                            className={value === i ? 'active' : ''}
                            onClick={() => fn(i)}
                        >
                            {item}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default Categories;
