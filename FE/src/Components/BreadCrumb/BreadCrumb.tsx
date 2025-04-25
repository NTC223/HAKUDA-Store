import React from 'react';
import styles from './BreadCrumb.module.scss';
import { Link } from 'react-router-dom';

interface navListProps {
    name: string;
    path: string;
}

export default function BreadCrumb() {
    const navList: navListProps[] = [
        { name: 'Trang chủ', path: '/' },
        {
            name: 'Đăng nhập tài khoản',
            path: '/login',
        },
    ];
    return (
        <nav className={styles.breadCrumb}>
            <div className={styles.container}>
                <ul>
                    {navList.map((item, index) => {
                        if (index < navList.length - 1) {
                            return (
                                <>
                                    <li key={index}>
                                        <Link to={item.path}>
                                            <span>{item.name}</span>
                                        </Link>
                                    </li>
                                    <span>&nbsp; / &nbsp;</span>
                                </>
                            );
                        } else {
                            return (
                                <>
                                    <li key={index}>
                                        <span>{item.name}</span>
                                    </li>
                                </>
                            );
                        }
                    })}
                </ul>
            </div>
        </nav>
    );
}
