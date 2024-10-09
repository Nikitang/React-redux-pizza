import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type CartItemType = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    size: number;
    type: string;
    count: number;
};

interface CartSliceState {
    totalPrice: number;
    items: CartItemType[];
}

const initialState: CartSliceState = {
    totalPrice: 0,
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem(state, action: PayloadAction<CartItemType>) {
            const findItem = state.items.find((obj) => obj.id === action.payload.id);
            if (findItem) {
                findItem.count++;
            } else {
                state.items.push({
                    ...action.payload,
                    count: 1,
                });
            }
            state.totalPrice = state.items.reduce((acc, item) => acc + item.price * item.count, 0);
        },

        minusItem(state, action: PayloadAction<string>) {
            const findItem = state.items.find((obj) => obj.id === action.payload);
            if (findItem) {
                findItem.count--;
            }
        },
        removeItems(state, action: PayloadAction<string>) {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        },
    },
});

export const selectCart = (state: RootState) => state.cartSlice;
export const selectCartItemById = (id: string) => (state: RootState) =>
    state.cartSlice.items.find((obj) => obj.id === id);

export const { addItem, removeItems, minusItem, clearItems } = cartSlice.actions;

export default cartSlice.reducer;
