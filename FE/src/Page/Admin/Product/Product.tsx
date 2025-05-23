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
    code: string;
    price: number;
    original_price?: number;
    image: string;
    category: string;
    maker: string;
    description: string;
    count_in_stock: number;
    createdAt: string;
    updatedAt: string;
    status: string;
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
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [totalPages, setTotalPages] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('');
    const [categories, setCategories] = useState<string[]>([]);

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
                });
                setTimeout(() => {
                    fetchProducts();
                }, 1000);
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Không thể xóa sản phẩm', {
                    position: 'top-right',
                    autoClose: 3000,
                });
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
                    query: search,
                    category: categoryFilter,
                },
            });
            const { products, pagination } = response.data.result;
            setProducts(products);
            setTotalPages(pagination.totalPages);
        } catch (err: any) {
            setError('Không thể tải danh sách sản phẩm');
            setProducts([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line
    }, [currentPage, sortBy, sortOrder, categoryFilter, search]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axiosInstance.get('/products/products', {
                    params: { page: 1, pageSize: 1000 },
                });
                const products = response.data.result.products;
                const uniqueCategories = Array.from(new Set(products.map((p: Product) => p.category))) as string[];
                setCategories(uniqueCategories);
            } catch (error) {}
        };
        fetchCategories();
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        setCurrentPage(1);
    };

    const handleSort = (field: string) => {
        if (sortBy === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(field);
            setSortOrder('asc');
        }
    };

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
        <div className={styles.productPage}>
            <ToastContainer />
            <div className={styles.pageHeader}>
                <h1>Quản lý sản phẩm</h1>
                <button className={styles.addBtn} onClick={() => setShowAddProduct(true)}>
                    + Thêm sản phẩm
                </button>
            </div>
            <form className={styles.searchBar} onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ maxWidth: 200 }}
                />
                <button type="submit">Tìm kiếm</button>
                <div className={styles.filterWrap}>
                    <span> Lọc theo loại: </span>
                    <select
                        value={categoryFilter}
                        onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option value="">Tất cả</option>
                        {categories.map((cat, idx) => (
                            <option key={idx} value={cat}>
                                {cat}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <div className={styles.tableWrap}>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Ảnh</th>
                            <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer', width: '10%' }}>
                                Ngày tạo {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer', width: '30%' }}>
                                Tên sản phẩm {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th>Loại sản phẩm</th>
                            <th>Tồn kho</th>
                            <th onClick={() => handleSort('price')} style={{ cursor: 'pointer' }}>
                                Giá {sortBy === 'price' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((item) => (
                            <tr key={item._id}>
                                <td>
                                    <img src={item.image} alt={item.name} className={styles.productImg} />
                                </td>
                                <td className={styles.createdAtCell}>
                                    {new Date(item.createdAt).toLocaleDateString('vi-VN')}
                                </td>
                                <td className={styles.nameCell}>{item.name}</td>
                                <td>{item.category}</td>
                                <td>
                                    <span className={item.count_in_stock > 20 ? styles.inStock : styles.lowStock}>
                                        {item.count_in_stock}
                                    </span>
                                </td>
                                <td>
                                    {item.original_price && item.original_price > item.price ? (
                                        <>
                                            <span className={styles.oldPrice}>
                                                {item.original_price.toLocaleString('vi-VN')} ₫
                                            </span>
                                            <span className={styles.salePrice}>
                                                {item.price.toLocaleString('vi-VN')} ₫
                                            </span>
                                        </>
                                    ) : (
                                        <span className={styles.salePrice}>{item.price.toLocaleString('vi-VN')} ₫</span>
                                    )}
                                </td>
                                <td>
                                    <button className={styles.actionBtn} onClick={() => handleEdit(item._id)}>
                                        <span role="img" aria-label="edit">
                                            ✏️
                                        </span>
                                    </button>
                                    <button className={styles.actionBtn} onClick={() => handleDelete(item._id)}>
                                        <span role="img" aria-label="delete">
                                            🗑️
                                        </span>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className={styles.pagination}>
                <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
                    ← Trang trước
                </button>
                <span style={{ margin: '0 12px' }}>
                    Trang {currentPage} / {totalPages}
                </span>
                <button
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Trang sau →
                </button>
            </div>
        </div>
    );
}
