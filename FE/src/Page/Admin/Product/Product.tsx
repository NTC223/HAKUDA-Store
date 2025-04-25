import React, { useEffect, useState } from 'react';
import styles from './Product.module.scss';
import prdImage from '../../../Assets/Image/QuanVu/anh1.webp';
import AddProduct from './AddProduct';

interface productProps {
    name: string;
    price: string;
    image: string;
    path: string;
    category: string;
    maker: string;
}

const pageSize = 6;

export default function Product() {
    const productList: productProps[] = [
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
            category: 'Metal Build',
            maker: 'Motor Nuclear',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
            category: 'Metal Build',
            maker: 'Motor Nuclear',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
            category: 'Metal Build',
            maker: 'Motor Nuclear',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
            category: 'Metal Build',
            maker: 'Motor Nuclear',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
            category: 'Metal Build',
            maker: 'Motor Nuclear',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
            category: 'Metal Build',
            maker: 'Motor Nuclear',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
            category: 'Metal Build',
            maker: 'Motor Nuclear',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
            category: 'Metal Build',
            maker: 'Motor Nuclear',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);
    const [showAddProduct, setShowAddProduct] = useState(false);

    const totalPages = Math.ceil(productList.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentProducts = productList.slice(startIndex, startIndex + pageSize);

    useEffect(() => {
        window.scroll(0, 0);
    }, [currentPage]);

    const handleCancel = () => {
        setShowAddProduct(false);
    };

    if (showAddProduct) {
        return <AddProduct onCancel={handleCancel} />;
    }

    return (
        <div className={styles.content}>
            <div className={styles.title}>Sản phẩm / Tất cả sản phẩm</div>

            <div className={styles.dashBoard}>
                <div className={styles.filterOptions}>
                    <button type="button">Tên A - Z</button>
                    <button type="button">Tên Z - A</button>
                    <button type="button">Giá thấp đến cao</button>
                    <button type="button">Giá cao đến thấp</button>
                    <button type="button">Mới nhất</button>
                    <button type="button">Cũ nhất</button>
                </div>

                <table>
                    <thead>
                        <th style={{ width: 25, padding: '10px 0 10px 5px' }}>
                            <input type="checkbox" name="" id="" />
                        </th>
                        <th>Sản phẩm</th>
                        <th>Giá</th>
                        <th>Loại</th>
                        <th>Nhà cung cấp</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {currentProducts.map((item, index) => {
                            return (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                    <td style={{ width: 25, padding: 0 }}>
                                        <div
                                            style={{
                                                height: 104.4,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            <input type="checkbox" />
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                            }}
                                        >
                                            <img src={item.image} alt="" width={80} />
                                            <span>{item.name}</span>
                                        </div>
                                    </td>
                                    <td style={{ color: 'red' }}>
                                        <div
                                            style={{
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {item.price}
                                        </div>
                                    </td>
                                    <td style={{ width: 150 }}>
                                        <div
                                            style={{
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {item.category}
                                        </div>
                                    </td>
                                    <td style={{ width: 150 }}>
                                        <div
                                            style={{
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {item.maker}
                                        </div>
                                    </td>
                                    <td>
                                        <div
                                            style={{
                                                height: 80,
                                                display: 'flex',
                                                alignItems: 'center',
                                            }}
                                        >
                                            Sửa
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            <div style={{ textAlign: 'right', paddingRight: 20 }}>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    ← Trang trước
                </button>
                <span>
                    {' '}
                    Trang {currentPage} / {totalPages}{' '}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Trang sau →
                </button>
            </div>
            <button className={styles.addButton} onClick={() => setShowAddProduct(true)}>
                +
            </button>
        </div>
    );
}
