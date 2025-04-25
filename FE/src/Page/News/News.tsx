import React from 'react';
import styles from './News.module.scss';
import { Link } from 'react-router-dom';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import BreadCrumb from '../../Components/BreadCrumb';
import newsImage from '../../Assets/Image/Blog/cach-lap-rap-mo-hinh-mg-cho-nguoi-moi.webp';
import NewsItem from '../../Components/NewsItem';

interface newsProps {
    name: string;
    date: string;
    image: string;
    path: string;
    des: string;
}

export default function News() {
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
    const navList = [
        { name: 'Trang chủ', path: '/' },
        { name: 'Model Kit', path: '/modelkit' },
        { name: 'Metal Build', path: '/metalbuild' },
        { name: 'Figure', path: '/figure' },
        { name: 'Tin Tức', path: '/news' },
        { name: 'Hàng Pre-Orer', path: '/hangpreorder' },
    ];
    return (
        <>
            <Navigation active="Tin Tức" />
            <BreadCrumb />
            <section className={styles.blogPage}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.lefCol}>
                            <div className={styles.blogTitle}>
                                <h1 className={styles.title}>Tin tức</h1>
                            </div>
                            <div className={styles.row}>
                                {newsList.map((item, index) => {
                                    return (
                                        <div className={styles.blogItem}>
                                            <NewsItem key={index} {...item} />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className={styles.rightCol}>
                            <div className={styles.menu}>
                                <div className={styles.blogTitle}>
                                    <h2 className={styles.title}>Danh mục tin tức</h2>
                                </div>
                                <div className={styles.asideContent}>
                                    <nav>
                                        <ul className={styles.nav}>
                                            {navList.map((item, index) => {
                                                return (
                                                    <li key={index} className={styles.navItem}>
                                                        <Link to={item.path}>{item.name}</Link>
                                                    </li>
                                                );
                                            })}
                                        </ul>
                                    </nav>
                                </div>
                            </div>
                            <div className={styles.hotNews}>
                                <div className={styles.blogTitle}>
                                    <h2 className={styles.title}>Tin nổi bật</h2>
                                </div>
                                <div className={styles.asideContent}>
                                    <div className={styles.blogList}>
                                        {newsList.map((item, index) => {
                                            if (index < 4)
                                                return (
                                                    <div className={styles.blogItem}>
                                                        <NewsItem key={index} {...item} />
                                                    </div>
                                                );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
