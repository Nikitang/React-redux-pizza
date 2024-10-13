import React, { FC } from 'react';
import ReactPaginate from 'react-paginate';

import styles from './Pagination.module.scss';

type IndexProps = {
    value: number;
    fn: (page: number) => void;
};

export const Pagination: FC<IndexProps> = ({ value, fn }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => fn(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={value - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    );
};
