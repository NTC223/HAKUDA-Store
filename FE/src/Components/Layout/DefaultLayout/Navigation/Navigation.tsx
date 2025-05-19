import React from 'react';
import styles from './Navigation.module.scss';
import { useNavigate } from 'react-router-dom';
import menu from '../../../../Assets/Image/menu.png';
import axiosInstance from '../../../../utils/axios';

interface navProps {
    name: string;
    path: string;
}

interface activeProp {
    active:
        | ''
        | 'Trang chủ'
        | 'Model Kit'
        | 'Metal Build'
        | 'Figure'
        | 'Tin Tức'
        | 'Kiểm tra hoá đơn'
        | 'Hàng Pre-Order';
}

export default function Navigation({ active }: activeProp) {
    const navigate = useNavigate();

    const handleMenuClick = async (path: string) => {
        try {
            const searchKey = path.substring(1);
            const response = await axiosInstance.get('/products/products', {
                params: {
                    search: searchKey,
                    page: 1,
                    pageSize: 12,
                },
            });

            navigate(`/productsearch?query=${searchKey}`, {
                state: {
                    products: response.data.result.products,
                    totalProducts: response.data.result.totalProducts,
                    totalPages: response.data.result.totalPages,
                },
            });
        } catch (error) {
            console.error('Error searching products:', error);
        }
    };

    const listMenu: navProps[] = [
        { name: 'TẤT CẢ SẢN PHẨM', path: '/' },
        { name: 'MODEL KIT', path: '/model kit' },
        { name: 'METAL BUILD', path: '/metal build' },
        { name: 'FIGURE', path: '/figure' },
    ];
    const navList: navProps[] = [
        { name: 'Trang chủ', path: '/' },
        { name: 'Model Kit', path: '/model kit' },
        { name: 'Metal Build', path: '/metal build' },
        { name: 'Figure', path: '/figure' },
    ];
    const navModelKit: navProps[] = [
        { name: 'BANDAI', path: '/bandai' },
        { name: 'MOTOR NUCLEAR', path: '/motornuclear' },
        { name: 'INERS+/SNAA', path: '/inera' },
        { name: 'ROBO TRÁI CÂY - FRUITY ROBO', path: '/robo trai cay' },
    ];
    const navMetalBuild: navProps[] = [
        { name: 'MOTOR NUCLEAR', path: '/motor nuclear' },
        { name: 'MOSHOW', path: '/moshow' },
        { name: 'CANGDAO', path: '/cangdao' },
    ];
    const navBanDai: navProps[] = [
        { name: 'SD', path: '/sd' },
        { name: 'EG', path: '/eg' },
        { name: 'HG', path: '/hg' },
        { name: 'RG', path: '/rg' },
        { name: 'MG', path: '/mg' },
        { name: 'PG', path: '/pg' },
        { name: 'Mega Size', path: '/megasize' },
        { name: '30MM', path: '/30mm' },
        { name: '30MS', path: '/30ms' },
        { name: '30MF', path: '/30mf' },
        { name: 'Tàu One Piece', path: '/tauonepiece' },
        { name: 'POKEMON', path: '/pokemon' },
        { name: 'FIGURE - RISE', path: '/figurerise' },
        { name: 'MÔ HÌNH BANDAI KHÁC', path: '/otherbandai' },
    ];
    return (
        <div className={styles.navigation}>
            <div className={styles.container}>
                <div className={styles.menuContainer}>
                    <div className={styles.titleMenu}>
                        <img src={menu} alt="" className={styles.img} />
                        <span className={styles.text}>Danh mục Sản phẩm</span>
                    </div>
                    <nav className={styles.listMenu}>
                        <ul className={styles.ulMenu}>
                            {listMenu.map((item, index) => (
                                <li key={index} className={styles.liMenu}>
                                    <div
                                        className={`${styles.link} ${styles.menuLink}`}
                                        onClick={() => handleMenuClick(item.path)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.name}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className={styles.navContainer}>
                    <div className={styles.navX}>
                        <ul className={styles.list}>
                            {navList.map((item, index) => (
                                <li key={index} className={styles.item}>
                                    <div
                                        className={`${styles.link} ${item.name === active ? styles.active : ''} 
                                            ${
                                                item.name === 'Model Kit' || item.name === 'Metal Build'
                                                    ? styles.caretDown
                                                    : ''
                                            }`}
                                        onClick={() => handleMenuClick(item.path)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        {item.name}
                                    </div>

                                    {item.name === 'Model Kit' && (
                                        <ul className={styles.subMenu}>
                                            {navModelKit.map((item, index) => (
                                                <li key={index} className={styles.subItem}>
                                                    <div
                                                        className={`${styles.subLink} ${
                                                            item.name === 'BANDAI' ? styles.caretDown : ''
                                                        }`}
                                                        onClick={() => handleMenuClick(item.path)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {item.name}
                                                    </div>
                                                    {item.name === 'BANDAI' && (
                                                        <ul className={styles.subSubMenu}>
                                                            {navBanDai.map((item, index) => (
                                                                <li key={index} className={styles.subSubItem}>
                                                                    <div
                                                                        className={styles.subSubLink}
                                                                        onClick={() => handleMenuClick(item.path)}
                                                                        style={{ cursor: 'pointer' }}
                                                                    >
                                                                        {item.name}
                                                                    </div>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {item.name === 'Metal Build' && (
                                        <ul className={styles.subMenu}>
                                            {navMetalBuild.map((item, index) => (
                                                <li key={index} className={styles.subItem}>
                                                    <div
                                                        className={styles.subLink}
                                                        onClick={() => handleMenuClick(item.path)}
                                                        style={{ cursor: 'pointer' }}
                                                    >
                                                        {item.name}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
