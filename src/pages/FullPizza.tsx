import axios from 'axios';
import React, { useEffect, useState, FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MyLoader from '../components/PizzaBlock/Skeleton';

const FullPizza: FC = () => {
    const [pizza, setPizza] = useState<{
        imageUrl: string;
        title: string;
        price: number;
    }>();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPizza() {
            try {
                const { data } = await axios.get(
                    `https://66f834c72a683ce9730ef214.mockapi.io/items/${id}`
                );
                setPizza(data);
            } catch (e) {
                console.error(e);
                navigate('/');
            }
        }

        fetchPizza();
    }, []);

    const render = !pizza ? (
        <div className="pizza-block-wrapper">
            <MyLoader />
        </div>
    ) : (
        <div className="pizza-block-wrapper">
            <div className="pizza-block">
                <img className="pizza-block__image" src={pizza.imageUrl} alt="Pizza" />
                <h4 className="pizza-block__title">{pizza.title}</h4>

                <div className="pizza-block__bottom">
                    <div className="pizza-block__price">от {pizza.price} ₽</div>
                </div>
            </div>
        </div>
    );

    return <>{render}</>;
};

export default FullPizza;
