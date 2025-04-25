import React from 'react';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import GlobalStyles from '../../../GlobalStyles';
import logo from '../../../../Assets/Image/logo.png';
import searchBtn from '../../../../Assets/Image/search.png';
import heart from '../../../../Assets/Image/heart.png';
import bag from '../../../../Assets/Image/bag.png';
import axiosInstance from '../../../../utils/axios';
import { useAuth } from '../../../../context/AuthContext';

export default function Header() {
    const { isAuthenticated, checkLoginStatus } = useAuth();
    const refreshToken = localStorage.getItem('refreshToken') || '';

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
        } catch (error: any) {
            console.log(error.response.data.errors);
        }
    };

    return (
        <GlobalStyles>
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
                            <form action="/productsearch" className={styles.formContainer}>
                                <input
                                    type="text"
                                    placeholder="Tìm kiếm sản phẩm"
                                    className={styles.searchInput}
                                ></input>
                                <button className={styles.searchBtn} aria-label="Tìm kiếm">
                                    <img src={searchBtn} alt="Tìm kiếm" className={styles.searchImg} />
                                </button>
                            </form>
                        </div>
                        <div className={styles.nav}>
                            <div className={styles.accountContainer}>
                                {!isAuthenticated ? (
                                    <div className={styles.account}>
                                        <Link to="/login" className={styles.login}>
                                            Đăng nhập
                                        </Link>
                                        &nbsp;/&nbsp;
                                        <Link to="/register" className={styles.register}>
                                            Đăng ký
                                        </Link>
                                        <span className={styles.helloText}>Xin chào! Khách</span>
                                    </div>
                                ) : (
                                    <div className={styles.account}>
                                        <Link to="/account" className={styles.login}>
                                            Tài khoản
                                        </Link>
                                        &nbsp;/&nbsp;
                                        <Link to="/" className={styles.register} onClick={handleSubmit}>
                                            Thoát
                                        </Link>
                                        <span className={styles.helloText}>Tài khoản của tôi</span>
                                    </div>
                                )}
                            </div>
                            <div className={styles.cartContainer}>
                                <img src={bag} alt="" className={styles.icon} />
                                <div className={styles.cart}>
                                    <span className={styles.count}>0</span>
                                    <Link to="/cart" className={styles.link}>
                                        Giỏ hàng <br /> của bạn
                                    </Link>
                                </div>
                            </div>
                            <div className={styles.favoriteContainer}>
                                <img src={heart} alt="" className={styles.icon} />
                                <div className={styles.favorite}>
                                    <span className={styles.count}>0</span>
                                    <Link to="/favorite" className={styles.link}>
                                        Yêu thích
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </GlobalStyles>
    );
}
