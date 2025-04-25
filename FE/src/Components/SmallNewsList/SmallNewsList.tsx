import React from 'react';
import styles from './SmallNewsList.module.scss';
import newsImage from '../../Assets/Image/Blog/cach-lap-rap-mo-hinh-mg-cho-nguoi-moi.webp';
import SmallNewsItem from '../SmallNewsItem';

interface newsProps {
    name: string;
    date: string;
    image: string;
    path: string;
    des: string;
}

export default function SmallNewsList() {
    const newsList: newsProps[] = [
        {
            name: 'Cách Lắp Ráp Mô Hình Gundam MG Cho Người Mới: Hướng Dẫn Chi Tiết Từ A-Z',
            date: '05/03/2025',
            image: newsImage,
            path: '/news',
            des: 'Bạn vừa mua chiếc mô hình Gundam Master Grade (MG) đầu tiên và cảm thấy vừa phấn khích vừa lo lắn...',
        },
        {
            name: 'Cách Lắp Ráp Mô Hình Gundam MG Cho Người Mới: Hướng Dẫn Chi Tiết Từ A-Z',
            date: '05/03/2025',
            image: newsImage,
            path: '/news',
            des: 'Bạn vừa mua chiếc mô hình Gundam Master Grade (MG) đầu tiên và cảm thấy vừa phấn khích vừa lo lắn...',
        },
        {
            name: 'Cách Lắp Ráp Mô Hình Gundam MG Cho Người Mới: Hướng Dẫn Chi Tiết Từ A-Z',
            date: '05/03/2025',
            image: newsImage,
            path: '/news',
            des: 'Bạn vừa mua chiếc mô hình Gundam Master Grade (MG) đầu tiên và cảm thấy vừa phấn khích vừa lo lắn...',
        },
    ];

    return (
        <div className={styles.group}>
            {newsList.map((item, index) => {
                return <SmallNewsItem key={index} {...item} />;
            })}
        </div>
    );
}
