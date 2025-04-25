import React from 'react';
import styles from './Cart.module.scss';
import { Link } from 'react-router-dom';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import BreadCrumb from '../../Components/BreadCrumb';

import image1 from '../../Assets/Image/QuanVu/9e768d12-032a-456a-ad97-95b2a5eb69bd-1732682826880..webp';
import NumberProduct from '../../Components/NumberProduct';

interface productProps {
    name: string;
    price: string;
    image: string;
    path: string;
}

export default function Cart() {
    const productList: productProps[] = [
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '15.000.000₫',
            image: image1,
            path: '/mnqxh09x',
        },
    ];
    return (
        <div>
            <Navigation active="" />
            <BreadCrumb />
            <section className={styles.mainCartPage}>
                <div className={styles.container}>
                    <div>
                        <div className={styles.headerCart}>
                            <h1 className={styles.title}>Giỏ hàng của bạn</h1>
                        </div>
                        <div className={styles.cartPage}>
                            <div className={styles.row}>
                                <div className={styles.lefCol}>
                                    <form>
                                        <div className={styles.cartHeaderInfo}>
                                            <div>Thông tin sản phẩm</div>
                                            <div>Đơn giá</div>
                                            <div>Số lượng</div>
                                            <div>Thành tiền</div>
                                        </div>
                                        <div className={styles.cartContent}>
                                            {productList.map((item, index) => {
                                                return (
                                                    <div key={index} className={styles.groupRow}>
                                                        <div className={styles.cartProduct}>
                                                            <Link to={item.path} className={styles.cartImage}>
                                                                <img src={item.image} alt="" />
                                                            </Link>
                                                            <div className={styles.cartInfo}>
                                                                <div className={styles.cartName}>
                                                                    <Link to={item.path}>{item.name}</Link>
                                                                    <Link
                                                                        to="/cart"
                                                                        style={{
                                                                            color: 'var(--main-color)',
                                                                            fontWeight: 300,
                                                                        }}
                                                                    >
                                                                        Xóa
                                                                    </Link>
                                                                </div>
                                                                <div className={styles.grid}>
                                                                    <div className={styles.cartPrice}>
                                                                        <span>{item.price}</span>
                                                                    </div>
                                                                </div>
                                                                <div className={styles.grid}>
                                                                    <NumberProduct />
                                                                </div>
                                                                <div className={styles.grid}>
                                                                    <span>{item.price}</span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </form>
                                </div>
                                <div className={styles.rightCol}>
                                    <div className={styles.vat}>
                                        <div className={styles.cartTotal}>
                                            <div style={{ fontWeight: 'bold' }}>Tổng tiền:</div>
                                            <span style={{ color: 'var(--price)' }}>15.000.000₫</span>
                                        </div>
                                        <div className={styles.buy}>
                                            <Link to="/payment">
                                                <button>Thanh Toán</button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
