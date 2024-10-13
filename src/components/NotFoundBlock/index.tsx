import React, { FC } from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: FC = () => {
    return (
        <div className={styles.root}>
            <h1>Ничего не найдено</h1>
        </div>
    );
};
