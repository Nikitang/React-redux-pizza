export type FetchPizzasParams = {
    sortingForTitle: string;
    sortingForCategory: string;
    searchingForTitle: string;
    sort: string;
    currentPage: number;
};

export type PizzaItem = {
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

export type PizzaGetParams = PizzaItem & {
    category: number;
    rating: number;
};

export type PizzaSliceState = {
    items: PizzaItem[];
    status: Status;
};
