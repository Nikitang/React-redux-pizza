import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../store';

type FetchPizzasParams = {
    sortingForTitle: string;
    sortingForCategory: string;
    searchingForTitle: string;
    sort: string;
    currentPage: number;
};

type Status = 'loading' | 'success' | 'error';

type PizzaItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

type PizzaGetParams = PizzaItem & {
    category: number;
    rating: number;
};

export const fetchPizzas = createAsyncThunk(
    'pizza/fetchPizzas',
    async (params: FetchPizzasParams) => {
        const { sortingForTitle, sortingForCategory, searchingForTitle, sort, currentPage } =
            params;
        const { data } = await axios.get<PizzaGetParams[]>(
            `https://66f834c72a683ce9730ef214.mockapi.io/items?page=${currentPage}&limit=4&${sortingForCategory}&sortBy=${sort}&order=${sortingForTitle}${searchingForTitle}`
        );
        return data as PizzaGetParams[];
    }
);

type PizzaSliceState = {
    items: PizzaItem[];
    status: Status;
};

const initialState: PizzaSliceState = {
    items: [],
    status: 'loading',
};

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = 'loading';
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = 'success';
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.items = [];
                state.status = 'error';
            });
    },
});

export const selectPizzas = (state: RootState) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
