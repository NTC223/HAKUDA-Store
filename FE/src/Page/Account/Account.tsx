import React from 'react';
import styles from './Account.module.scss';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import BreadCrumb from '../../Components/BreadCrumb';
import Main from './Main';
import Orders from './Orders';
import ChangePassword from './ChangePassword';
import Address from './Address';

export default function Account() {
    const [indexNav, setIndexNav] = useState(0);

    const navList = [
        {
            name: 'Thông tin tài khoản',
            layout: Main,
        },
        {
            name: 'Đơn hàng của bạn',
            layout: Orders,
        },
        {
            name: 'Đổi mật khẩu',
            layout: ChangePassword,
        },
        {
            name: 'Số địa chỉ',
            layout: Address,
        },
        {
            name: 'Đăng xuất',
            layout: Main,
        },
    ];

    const Layout = navList[indexNav].layout;

    return (
        <>
            <Navigation active="" />
            <BreadCrumb />
            <section className={styles.pageCustomerAccount}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.lefCol}>
                            <div className={styles.blockAccount}>
                                <h5 className={styles.titleAccount}>Trang tài khoản</h5>
                                <p>
                                    Xin chào, <span style={{ color: '#151614' }}>Nguyễn Thành Công </span> !
                                </p>
                                <ul>
                                    {navList.map((item, index) => {
                                        return (
                                            <li
                                                key={index}
                                                className={`${index === indexNav ? styles.active : ''}`}
                                                onClick={() => setIndexNav(index)}
                                            >
                                                {index === 4 ? (
                                                    <Link to="/" onClick={() => localStorage.setItem('isLoggedIn', '')}>
                                                        {item.name}
                                                    </Link>
                                                ) : (
                                                    item.name
                                                )}
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        <div className={styles.rightCol}>
                            <Layout />
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
