import React from 'react';
import styles from './HotList.module.scss';
import HotItem from '../HotItem';

import hot1 from '../../Assets/Image/muscle_1.webp';
import hot2 from '../../Assets/Image/muscle_2.webp';
import hot3 from '../../Assets/Image/muscle_3.webp';

interface hotItemProps {
    image: string;
    name: string;
    path: string;
}

export default function Hot() {
    const hotList: hotItemProps[] = [
        {
            name: 'Mô hình 1/100 MG LIZARD',
            image: hot1,
            path: '/',
        },
        {
            name: 'Mô hình 1/10 UTX 630 TASTIER',
            image: hot2,
            path: '/',
        },
        {
            name: 'Mô hình 1/100 TENGU JUDGE',
            image: hot3,
            path: '/',
        },
    ];
    return (
        <div className={styles.wrap}>
            <h2>
                Sản phẩm bán chạy
                <span></span>
                {hotList.map((item, index) => {
                    return <HotItem key={index} {...item} />;
                })}
            </h2>
        </div>
    );
}
