import React from 'react';
import styles from './Navigation.module.scss';
import { Link } from 'react-router-dom';
import menu from '../../../../Assets/Image/menu.png';

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
    const listMenu: navProps[] = [
        { name: 'TẤT CẢ SẢN PHẨM', path: '/tatcasanpham' },
        { name: 'MODEL KIT', path: '/modelkit' },
        { name: 'METAL BUILD', path: '/metalbuild' },
        { name: 'FIGURE', path: '/figure' },
        { name: 'DỤNG CỤ', path: '/dungcu' },
        { name: 'PHỤ KIỆN', path: '/phukien' },
    ];
    const navList: navProps[] = [
        { name: 'Trang chủ', path: '/' },
        { name: 'Model Kit', path: '/modelkit' },
        { name: 'Metal Build', path: '/metalbuild' },
        { name: 'Figure', path: '/figure' },
        { name: 'Tin Tức', path: '/news' },
        { name: 'Hàng Pre-Oder', path: '/hangpreorder' },
    ];
    const navModelKit: navProps[] = [
        { name: 'BANDAI', path: '/bandai' },
        { name: 'MOTOR NUCLEAR', path: '/motornuclear' },
        { name: 'INERS+/SNAA', path: '/inera' },
        { name: 'ROBO TRÁI CÂY - FRUITY ROBO', path: '/fruityrobo' },
        { name: 'HÃNG KHÁC', path: '/hangkhac' },
        { name: 'DỤNG CỤ', path: '/dungcu' },
        { name: 'PHỤ KIỆN', path: '/phukien' },
    ];
    const navMetalBuild: navProps[] = [
        { name: 'MOTOR NUCLEAR', path: '/motornuclear' },
        { name: 'MOSHOW', path: '/moshow' },
        { name: 'CANGDAO', path: '/cangdao' },
        { name: 'HÃNG KHÁC', path: '/hangkhac' },
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
                            {listMenu.map((item, index) => {
                                return (
                                    <li key={index} className={styles.liMenu}>
                                        <Link to={item.path} className={styles.link}>
                                            {item.name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                </div>
                <div className={styles.navContainer}>
                    <div className={styles.navX}>
                        <ul className={styles.list}>
                            {navList.map((item, index) => {
                                return (
                                    <li key={index} className={styles.item}>
                                        <Link
                                            to={item.path}
                                            className={`${styles.link} ${item.name === active ? styles.active : ''} 
                                                ${
                                                    item.name === 'Model Kit' || item.name === 'Metal Build'
                                                        ? styles.caretDown
                                                        : ''
                                                }`}
                                        >
                                            {item.name}
                                        </Link>

                                        {item.name === 'Model Kit' ? (
                                            <ul>
                                                {navModelKit.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link
                                                                to={item.path}
                                                                className={
                                                                    item.name === 'BANDAI' ? styles.caretDown : ''
                                                                }
                                                            >
                                                                {item.name}
                                                            </Link>
                                                            {item.name === 'BANDAI' ? (
                                                                <ul>
                                                                    {navBanDai.map((item, index) => {
                                                                        return (
                                                                            <li>
                                                                                <Link to={item.path}>{item.name}</Link>
                                                                            </li>
                                                                        );
                                                                    })}
                                                                </ul>
                                                            ) : (
                                                                ''
                                                            )}
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : (
                                            ''
                                        )}

                                        {item.name === 'Metal Build' ? (
                                            <ul>
                                                {navMetalBuild.map((item, index) => {
                                                    return (
                                                        <li key={index}>
                                                            <Link to={item.path}>{item.name}</Link>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        ) : (
                                            ''
                                        )}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
