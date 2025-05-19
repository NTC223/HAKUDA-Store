import React, { useEffect, useState } from 'react';
import styles from './ProductSearch.module.scss';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import BreadCrumb from '../../Components/BreadCrumb';
import axiosInstance from '../../utils/axios';
import { useLocation, useNavigate } from 'react-router-dom';
import ProdutList from '../../Components/ProductList';

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    maker: string;
    description: string;
    count_in_stock: number;
    createdAt: string;
}

const pageSize = 12;

export default function ProductSearch() {
    const [currentPage, setCurrentPage] = useState(1);
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const location = useLocation();
    const navigate = useNavigate();
    const searchParams = new URLSearchParams(location.search);
    const query = searchParams.get('query') || '';
    const pageParam = searchParams.get('page');

    useEffect(() => {
        if (pageParam) {
            setCurrentPage(parseInt(pageParam));
        }
    }, [pageParam]);

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(location.search);
        params.set('page', newPage.toString());
        navigate(`/productsearch?${params.toString()}`);
        setCurrentPage(newPage);
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/products/products', {
                params: {
                    page: currentPage,
                    pageSize: pageSize,
                    query,
                    sortBy,
                    sortOrder,
                },
            });

            const { products, pagination } = response.data.result;
            setProducts(products);
            setTotalProducts(pagination.total);
            setTotalPages(pagination.totalPages);
        } catch (err: any) {
            setError('Không thể tải danh sách sản phẩm');
            setProducts([]);
            console.error('Error fetching products:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [currentPage, sortBy, sortOrder, query]);

    useEffect(() => {
        window.scroll(0, 0);
    }, [currentPage]);

    if (loading) {
        return (
            <div>
                <Navigation active="" />
                <BreadCrumb />
                <div className={styles.loading}>Đang tải...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <Navigation active="" />
                <BreadCrumb />
                <div className={styles.error}>{error}</div>
            </div>
        );
    }

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
                            <p>Đã tìm thấy {totalProducts} kết quả phù hợp</p>
                            <div className={styles.filterOptions}>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSortBy('name');
                                        setSortOrder('asc');
                                    }}
                                >
                                    Tên A - Z
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSortBy('name');
                                        setSortOrder('desc');
                                    }}
                                >
                                    Tên Z - A
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSortBy('price');
                                        setSortOrder('asc');
                                    }}
                                >
                                    Giá thấp đến cao
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSortBy('price');
                                        setSortOrder('desc');
                                    }}
                                >
                                    Giá cao đến thấp
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSortBy('createdAt');
                                        setSortOrder('desc');
                                    }}
                                >
                                    Mới nhất
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setSortBy('createdAt');
                                        setSortOrder('asc');
                                    }}
                                >
                                    Cũ nhất
                                </button>
                            </div>
                        </div>
                        <div className={styles.col}>
                            <div>
                                <div className={styles.row}>
                                    <ProdutList
                                        products={products.map((product) => ({
                                            _id: product._id,
                                            name: product.name,
                                            price: product.price.toLocaleString('vi-VN') + '₫',
                                            image: product.image,
                                        }))}
                                        startIndex={0}
                                        endIndex={products.length}
                                        onProductCountChange={() => {}}
                                    />
                                </div>
                            </div>
                            <div style={{ textAlign: 'right', paddingRight: 20 }}>
                                <button
                                    onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                                    disabled={currentPage === 1}
                                >
                                    ← Trang trước
                                </button>
                                <span>
                                    {' '}
                                    Trang {currentPage} / {totalPages}{' '}
                                </span>
                                <button
                                    onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
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
