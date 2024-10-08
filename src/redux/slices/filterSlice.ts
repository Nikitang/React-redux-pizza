import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

type Param = 'rating' | 'price' | 'title';

type Sort = {
    name: string;
    sortParam: Param; //rating
};

interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: Sort;
}

const initialState: FilterSliceState = {
    searchValue: '',
    categoryId: 0,
    currentPage: 1,
    sort: { name: 'Популярности', sortParam: 'rating' },
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setCategoryId(state, action: PayloadAction<number>) {
            state.categoryId = action.payload;
        },
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setSort(state, action: PayloadAction<Sort>) {
            state.sort = action.payload;
        },
        setCurrentPage(state, action: PayloadAction<number>) {
            state.currentPage = action.payload;
        },
        setFilters(state, action: PayloadAction<FilterSliceState>) {
            if (Object.keys(action.payload).length) {
                state.currentPage = Number(action.payload.currentPage);
                state.categoryId = Number(action.payload.categoryId);
                state.sort = action.payload.sort;
            } else {
                state.currentPage = 1;
                state.categoryId = 0;
                state.sort = {
                    name: 'популярности',
                    sortParam: 'rating',
                };
            }
        },
    },
});

export const selectSort = (state: RootState) => state.filterSlice.sort;
export const selectFilter = (state: RootState) => state.filterSlice;

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } =
    filterSlice.actions;

export default filterSlice.reducer;
