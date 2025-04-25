import React, { useEffect } from 'react';
import styles from './ProductSearch.module.scss';
import { useState } from 'react';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import BreadCrumb from '../../Components/BreadCrumb';
import ProdutList from '../../Components/ProductList';

const pageSize = 12;

export default function ProductSearch() {
    const [currentPage, setCurrentPage] = useState(1);

    const [productCount, setProductCount] = useState(0);

    const totalPages = Math.ceil(productCount / pageSize);
    const startIndex = (currentPage - 1) * pageSize;

    useEffect(() => {
        window.scroll(0, 0);
    }, [currentPage]);

    return (
        <div>
            <Navigation active="" />
            <BreadCrumb />
            <section>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.col}>
                            <div className={styles.blockTitle}>
                                <h1 className={styles.titleModule}>Trang tìm kiếm</h1>
                            </div>
                            <p>Đã tìm thấy 40 kết quả phù hợp</p>
                            <div className={styles.filterOptions}>
                                <button type="button">Tên A - Z</button>
                                <button type="button">Tên Z - A</button>
                                <button type="button">Giá thấp đến cao</button>
                                <button type="button">Giá cao đến thấp</button>
                                <button type="button">Mới nhất</button>
                                <button type="button">Cũ nhất</button>
                            </div>
                        </div>
                        <div className={styles.col}>
                            <div>
                                <div className={styles.row}>
                                    <ProdutList
                                        startIndex={startIndex}
                                        endIndex={startIndex + pageSize}
                                        onProductCountChange={setProductCount}
                                    />
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', paddingRight: 20 }}>
                                <button
                                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                >
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
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
