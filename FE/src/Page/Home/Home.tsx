import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.module.scss';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import HotList from '../../Components/HotList';
import NewsItem from '../../Components/NewsItem';
import ProdutList from '../../Components/ProductList';

import sld1 from '../../Assets/Image/slider/slider_1.jpg';
import sld2 from '../../Assets/Image/slider/slider_2.jpg';
import prevBtn from '../../Assets/Image/back.png';
import hg from '../../Assets/Image/Category/hg.jpg';
import rg from '../../Assets/Image/Category/rg.jpg';
import mg from '../../Assets/Image/Category/mg.jpg';
import pg from '../../Assets/Image/Category/pg.jpg';
import motorNuclear from '../../Assets/Image/Category/motor.jpg';
import moshow from '../../Assets/Image/Category/moshow.jpg';
import cangDao from '../../Assets/Image/Category/cangdao.jpg';
import inera from '../../Assets/Image/Category/in-era.jpg';
import mm from '../../Assets/Image/Category/30mm.jpg';
import ms from '../../Assets/Image/Category/30ms.jpg';
import banner1 from '../../Assets/Image/Banner/banner_left_new_sale1.jpg';
import banner2 from '../../Assets/Image/Banner/banner_left_new_sale2.jpg';
import newsImage from '../../Assets/Image/Blog/cach-lap-rap-mo-hinh-mg-cho-nguoi-moi.webp';
import botBanner1 from '../../Assets/Image/Banner/imgbanner1.jpg';
import botBanner2 from '../../Assets/Image/Banner/imgbanner2.jpg';
import SmallNewsList from '../../Components/SmallNewsList';
import sv1 from '../../Assets/Image/ico_sv1.png';
import sv2 from '../../Assets/Image/ico_sv2.png';
import sv3 from '../../Assets/Image/ico_sv3.png';
import sv4 from '../../Assets/Image/ico_sv4.png';

interface newsProps {
    name: string;
    date: string;
    image: string;
    path: string;
    des: string;
}

export default function Home() {
    const listBanner = [
        {
            src: sld1,
        },
        {
            src: sld2,
        },
        // {
        //     src: sld3,
        // },
    ];
    const ListCategory = [
        {
            Name: 'HG',
            path: '/hg',
            src: hg,
        },
        {
            Name: 'RG',
            path: '/rg',
            src: rg,
        },
        {
            Name: 'MG',
            path: '/mg',
            src: mg,
        },
        {
            Name: 'PG',
            path: '/pg',
            src: pg,
        },
        {
            Name: 'MOTOR NUCLEAR',
            path: '/motorNuclear',
            src: motorNuclear,
        },
        {
            Name: 'MOSHOW',
            path: '/moshow',
            src: moshow,
        },
        {
            Name: 'CANGDAO',
            path: '/cangDao',
            src: cangDao,
        },
        {
            Name: 'INERA+/SNAA',
            path: '/inera',
            src: inera,
        },
        {
            Name: '30MM',
            path: '/mm',
            src: mm,
        },
        {
            Name: '30MS',
            path: '/ms',
            src: ms,
        },
    ];
    const [index, setIndex] = useState(0);
    const handleDescIndex = () => {
        if (index === 0) {
            setIndex(listBanner.length - 1);
        } else {
            setIndex(index - 1);
        }
    };
    const handleIncIndex = () => {
        if (index === listBanner.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };

    const newsList: newsProps = {
        name: 'Cách Lắp Ráp Mô Hình Gundam MG Cho Người Mới: Hướng Dẫn Chi Tiết Từ A-Z',
        date: '05/03/2025',
        image: newsImage,
        path: '/news',
        des: 'Bạn vừa mua chiếc mô hình Gundam Master Grade (MG) đầu tiên và cảm thấy vừa phấn khích vừa lo lắn...',
    };

    return (
        <main>
            <Navigation active="Trang chủ" />
            <section className={`${styles.sectionSlideBanner} ${styles.container} ${styles.slideWithButton}`}>
                <div className={styles.swiperContainer}>
                    <div className={styles.swipperWrapper}>
                        <img src={listBanner[index].src} alt="" width={1380} style={{ textAlign: 'center' }} />
                    </div>
                    <div className={styles.swiperBtnPrev} tabIndex={-1}>
                        <img src={prevBtn} alt="" width={20} height="auto" onClick={handleDescIndex} />
                    </div>
                    <div className={styles.swiperBtnNext} tabIndex={-1}>
                        <img
                            src={prevBtn}
                            alt=""
                            width={20}
                            height="auto"
                            onClick={handleIncIndex}
                            style={{ rotate: '180deg' }}
                        />
                    </div>
                </div>
            </section>
            <section className={styles.sectionCategory}>
                <div className={styles.container}>
                    <div className={`${styles.cateList} ${styles.alignSpace} ${styles.slideWithButton}`}>
                        <div className={styles.swiperWrapper}>
                            <div className={styles.swiperWrapper} aria-live="polite" style={{ transition: 'all' }}>
                                {ListCategory.map((item, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={styles.swiperSlide}
                                            style={{ width: 136.316 }}
                                            role="group"
                                            aria-label={`${index + 1} / ${ListCategory.length}`}
                                        >
                                            <div className={styles.cateItem} style={{ cursor: 'grab' }}>
                                                <Link to={item.path} className={styles.image}>
                                                    <img src={item.src} alt="" width={100} height={100} />
                                                </Link>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.newSale}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.banner}>
                            <figure style={{ display: 'block', marginBottom: 20 }}>
                                <Link to={'/'} style={{ display: 'block', textAlign: 'center' }}>
                                    <img src={banner1} alt="" height="auto" width={330} />
                                </Link>
                            </figure>
                            <figure style={{ display: 'block' }}>
                                <Link to={'/'} style={{ display: 'block', textAlign: 'center' }}>
                                    <img src={banner2} alt="" height="auto" width={330} />
                                </Link>
                            </figure>
                        </div>
                        <div className={styles.newSaleList}>
                            <h2 className={styles.title}>
                                <Link to="/">SẢN PHẨM MỚI VỀ</Link>
                            </h2>
                            <ProdutList startIndex={0} endIndex={4} onProductCountChange={() => {}} />
                            <h2 className={styles.title}>
                                <Link to="/">SẢN PHẨM BÁN CHẠY</Link>
                            </h2>
                            <ProdutList startIndex={0} endIndex={4} onProductCountChange={() => {}} />
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <div className={styles.container} style={{ display: 'flex' }}>
                    <div className={styles.box}>
                        <Link to="/">
                            <img src={botBanner1} alt="" />
                        </Link>
                    </div>
                    <div className={styles.box}>
                        <Link to="/">
                            <img src={botBanner2} alt="" />
                        </Link>
                    </div>
                </div>
            </section>
            <section className={styles.sectionBlog}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.lefCol}>
                            <HotList />
                        </div>
                        <div className={styles.rightCol}>
                            <h2 className={styles.title}>
                                <Link to="/news">Blog tin tức</Link>
                            </h2>
                            <div className={`${styles.row} ${styles.newsBox}`}>
                                <div className={styles.box}>
                                    <NewsItem {...newsList} />
                                </div>
                                <div className={styles.box}>
                                    <SmallNewsList />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className={styles.random}>
                <div className={styles.container}>
                    <h2 className={styles.title}>
                        <Link to="/">Có thể bạn thích</Link>
                    </h2>
                    <ProdutList startIndex={0} endIndex={5} onProductCountChange={() => {}} />
                </div>
            </section>
            <section className={styles.service}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.lefCol}>
                            <div className={styles.item}>
                                <img src={sv1} alt="" width={45} />
                                <h4>Dịch vụ đóng gói riêng</h4>
                            </div>
                        </div>
                        <div className={styles.lefCol}>
                            <div className={styles.item}>
                                <img src={sv2} alt="" width={45} />
                                <h4>Tích điểm đặc quyền</h4>
                            </div>
                        </div>
                        <div className={styles.lefCol}>
                            <div className={styles.item}>
                                <img src={sv3} alt="" width={45} />
                                <h4>Quà tặng bí mật</h4>
                            </div>
                        </div>
                        <div className={styles.lefCol}>
                            <div className={styles.item}>
                                <img src={sv4} alt="" width={45} />
                                <h4>Mã giảm giá đặc quyền</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
