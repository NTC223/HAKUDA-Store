import React, { useEffect, useState } from 'react';
import styles from './Product.module.scss';
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import axiosInstance from '../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    updatedAt: string;
}

interface PaginationInfo {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

const pageSize = 10;

export default function Product() {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showAddProduct, setShowAddProduct] = useState(false);
    const [showEditProduct, setShowEditProduct] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const handleEdit = (id: string) => {
        setSelectedProductId(id);
        setShowEditProduct(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
            try {
                await axiosInstance.delete(`/products/${id}`);
                toast.success('Xóa sản phẩm thành công!', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    fetchProducts();
                }, 1000);
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Không thể xóa sản phẩm', {
                    position: 'top-right',
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                console.error('Error deleting product:', err);
            }
        }
    };

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/products/products', {
                params: {
                    page: currentPage,
                    pageSize: pageSize,
                    sortBy,
                    sortOrder,
                    query: '',
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
    }, [currentPage, sortBy, sortOrder]);

    useEffect(() => {
        window.scroll(0, 0);
    }, [currentPage]);

    const handleCancel = () => {
        setShowAddProduct(false);
        setShowEditProduct(false);
        fetchProducts();
    };

    if (showAddProduct) {
        return <AddProduct onCancel={handleCancel} />;
    }

    if (showEditProduct) {
        return <EditProduct onCancel={handleCancel} productId={selectedProductId} />;
    }

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.content}>
            <ToastContainer />
            <div className={styles.title}>Danh sách sản phẩm</div>

            <div className={styles.dashBoard}>
                <div className={styles.filterOptions}>
                    <button
                        type="submit"
                        onClick={() => {
                            setSortBy('name');
                            setSortOrder('asc');
                        }}
                    >
                        Tên A - Z
                    </button>
                    <button
                        type="submit"
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

                <table>
                    <thead>
                        <tr>
                            <th style={{ width: '5%' }}>STT</th>
                            <th style={{ width: '38%' }}>Sản phẩm</th>
                            <th style={{ width: '12%' }}>Giá</th>
                            <th style={{ width: '15%' }}>Loại</th>
                            <th style={{ width: '15%' }}>Thương hiệu</th>
                            <th style={{ width: '10%' }}>Số lượng</th>
                            <th style={{ width: '5%' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item, index) => (
                            <tr key={item._id} className={styles.productRow}>
                                <td style={{ textAlign: 'center' }}>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>
                                    <div className={styles.productInfo}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            width={80}
                                            height={80}
                                            style={{ objectFit: 'cover', borderRadius: '4px' }}
                                        />
                                        <span>{item.name}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.price}>{item.price.toLocaleString('vi-VN')}₫</div>
                                </td>
                                <td>
                                    <div className={styles.category}>
                                        <span>{item.category}</span>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.maker}>{item.maker}</div>
                                </td>
                                <td>
                                    <div className={styles.stock}>
                                        <span className={item.count_in_stock > 0 ? styles.inStock : styles.outOfStock}>
                                            {item.count_in_stock}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className={styles.actions}>
                                        <button onClick={() => handleEdit(item._id)} className={styles.editButton}>
                                            Sửa
                                        </button>
                                        <button onClick={() => handleDelete(item._id)} className={styles.deleteButton}>
                                            Xóa
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div style={{ textAlign: 'right', paddingRight: 20, marginTop: 20 }}>
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
