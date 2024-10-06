import React from 'react';
import ContentLoader from 'react-content-loader';

const MyLoader = () => (
    <ContentLoader
        speed={2}
        width={280}
        height={500}
        viewBox="0 0 280 500"
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
    >
        <circle cx="128" cy="132" r="120" />
        <rect x="0" y="268" rx="10" ry="10" width="265" height="28" />
        <rect x="1" y="311" rx="10" ry="10" width="267" height="81" />
        <rect x="7" y="417" rx="10" ry="10" width="79" height="30" />
        <rect x="122" y="406" rx="25" ry="25" width="146" height="49" />
    </ContentLoader>
);

export default MyLoader;
