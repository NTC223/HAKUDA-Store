import React from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Admin.module.scss';
import Product from './Product';
import Orders from './Orders';
import overView from '../../Assets/Image/file.png';
import logo from '../../Assets/Image/logo.png';
import searchBtn from '../../Assets/Image/search.png';
import prd from '../../Assets/Image/box.png';
import orders from '../../Assets/Image/order-delivery.png';
import user from '../../Assets/Image/group.png';
import Customer from './Customer';
import axiosInstance from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import OverView from './OverView';

export default function AdminPage() {
    const [indexNav, setIndexNav] = useState(0);

    const navList = [
        
        {
            name: 'Sản phẩm',
            image: prd,
            layout: Product,
        },
        {
            name: 'Người dùng',
            image: user,
            layout: Customer,
        },
        {
            name: 'Danh sách đơn hàng',
            image: orders,
            layout: Orders,
        },
        {
            name: 'Tổng quan',
            image: overView,
            layout: OverView,
        },
        // {
        //     name: 'Tồn kho',
        //     image: stock,
        //     layout: Stock,
        // },
        {
            name: 'Đăng xuất',
            layout: Product,
        },
    ];

    const Layout = navList[indexNav].layout;

    const { checkLoginStatus } = useAuth();
    const refreshToken = localStorage.getItem('refreshToken') || '';
    const navigate = useNavigate();

    const handleSubmit = async (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        try {
            const response = await axiosInstance.post('/auth/logout', {
                refresh_token: refreshToken,
            });
            localStorage.setItem('accessToken', '');
            localStorage.setItem('refreshToken', '');
            checkLoginStatus();
            console.log(response.data.result);
            navigate('/');
        } catch (error: any) {
            console.log(error.response.data.errors);
        }
    };

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.inner}>
                    <div className={styles.container}>
                        <div className={styles.logoContainer}>
                            <Link to="/" className={styles.link}>
                                <img
                                    src={logo}
                                    alt="Hakuda Hobby Store"
                                    width={219}
                                    height={64}
                                    className={styles.logo}
                                />
                            </Link>
                        </div>
                        <div className={styles.searchContainer}>
                            <form className={styles.formContainer}>
                                <input type="text" placeholder="Tìm kiếm" className={styles.searchInput}></input>
                                <button className={styles.searchBtn} aria-label="Tìm kiếm">
                                    <img src={searchBtn} alt="Tìm kiếm" className={styles.searchImg} />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.container}>
                <div className={styles.row}>
                    <div className={styles.lefCol}>
                        <ul>
                            {navList.map((item, index) => {
                                return (
                                    <li
                                        key={index}
                                        className={`${index === indexNav ? styles.active : ''}`}
                                        onClick={() => setIndexNav(index)}
                                    >
                                        {index === navList.length - 1 ? (
                                            <Link to="/" onClick={handleSubmit}>
                                                {item.name}
                                            </Link>
                                        ) : (
                                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                                <img src={item.image} alt="" width={35} style={{ paddingRight: 5 }} />
                                                <span style={{ verticalAlign: 'middle' }}>{item.name}</span>
                                            </div>
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className={styles.rightCol}>
                        <Layout />
                    </div>
                </div>
            </div>
        </div>
    );
}
