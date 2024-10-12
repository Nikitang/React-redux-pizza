import { CartItemType } from '../redux/cart/types';

export const calcTotalPrice = (items: CartItemType[]) => {
    return items.reduce((acc, item) => acc + item.price * item.count, 0);
};
