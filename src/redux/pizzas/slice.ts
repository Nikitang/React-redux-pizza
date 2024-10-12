import axios from 'axios';

import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { FetchPizzasParams, PizzaGetParams, PizzaItem, PizzaSliceState, Status } from './types';

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

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
