import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Admin.module.scss';
import logo from '../../Assets/Image/logo.png';
import prd from '../../Assets/Image/box.png';
import orders from '../../Assets/Image/order-delivery.png';
import user from '../../Assets/Image/group.png';
import overView from '../../Assets/Image/file.png';

const menu = [
    { name: 'Dashboard', icon: overView, key: 'dashboard' },
    { name: 'Sản phẩm', icon: prd, key: 'product' },
    { name: 'Đơn hàng', icon: orders, key: 'orders' },
    { name: 'Người dùng', icon: user, key: 'user' },
];

export default function Sidebar({ active, onChange }: { active: string; onChange: (key: string) => void }) {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.logoWrap}>
                <img src={logo} alt="Logo" className={styles.logo} />
            </div>
            <ul className={styles.menu}>
                {menu.map((item) => (
                    <li
                        key={item.key}
                        className={active === item.key ? styles.active : ''}
                        onClick={() => onChange(item.key)}
                    >
                        <img src={item.icon} alt="" className={styles.menuIcon} />
                        <span>{item.name}</span>
                    </li>
                ))}
            </ul>
        </aside>
    );
}
