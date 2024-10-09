import axios from 'axios';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { SortParamType } from './filterSlice';

export type FetchPizzasParams = {
    sortingForTitle: string;
    sortingForCategory: string;
    searchingForTitle: string;
    sort: string;
    currentPage: number;
};

type PizzaItem = {
    id: string;
    title: string;
    price: number;
    imageUrl: string;
    sizes: number[];
    types: number[];
};

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error',
}

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
    status: Status.LOADING,
};

const pizzasSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers: {
        setItems(state, action: PayloadAction<PizzaItem[]>) {
            state.items = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchPizzas.pending, (state) => {
                state.status = Status.LOADING;
                state.items = [];
            })
            .addCase(fetchPizzas.fulfilled, (state, action) => {
                state.items = action.payload;
                state.status = Status.SUCCESS;
            })
            .addCase(fetchPizzas.rejected, (state) => {
                state.items = [];
                state.status = Status.ERROR;
            });
    },
});

export const selectPizzas = (state: RootState) => state.pizzasSlice;

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
