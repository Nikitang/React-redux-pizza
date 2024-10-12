export enum SortParamEnum {
    RATING = 'rating',
    PRICE = 'price',
    TITLE = 'title',
}

export type SortParamType = {
    name: string;
    sortParam: SortParamEnum; //rating
};

export interface FilterSliceState {
    searchValue: string;
    categoryId: number;
    currentPage: number;
    sort: SortParamType;
}
