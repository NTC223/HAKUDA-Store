import React, { useEffect, useState } from 'react';
import styles from './Customer.module.scss';
import axiosInstance from '../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Customer {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    createdAt: string;
}

const pageSize = 10;

export default function Customer() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
    const [totalPages, setTotalPages] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/users/all-users', {
                params: {
                    page: currentPage,
                    pageSize: pageSize,
                    sortBy,
                    sortOrder,
                    query: search,
                },
            });
            const { users, pagination } = response.data.result;
            setCustomers(users);
            setTotalPages(pagination.totalPages);
        } catch (err: any) {
            setError('Không thể tải danh sách khách hàng');
            setCustomers([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [currentPage, sortBy, sortOrder, search]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                await axiosInstance.delete(`/users/delete-user/${id}`);
                toast.success('Xóa người dùng thành công!', {
                    position: 'top-right',
                    autoClose: 1000,
                });
                setTimeout(() => {
                    fetchCustomers();
                }, 1000);
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Không thể xóa người dùng');
            }
        }
    };

    const handleRoleChange = async (id: string, newRole: string) => {
        try {
            await axiosInstance.put(`/users/update-role/${id}`, { role: newRole });
            toast.success('Cập nhật quyền thành công!', {
                position: 'top-right',
                autoClose: 1000,
            });
            setTimeout(() => {
                fetchCustomers();
            }, 1000);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Không thể cập nhật quyền');
        }
    };

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

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.customerPage}>
            <ToastContainer />
            <div className={styles.pageHeader}>
                <h1>Quản lý người dùng</h1>
            </div>

            <form className={styles.searchBar} onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    style={{ maxWidth: 200 }}
                />
                <button type="submit">Tìm kiếm</button>
            </form>

            <div className={styles.tableWrap}>
                <table className={styles.customerTable}>
                    <thead>
                        <tr>
                            <th onClick={() => handleSort('createdAt')} style={{ cursor: 'pointer' }}>
                                Ngày tạo {sortBy === 'createdAt' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th onClick={() => handleSort('name')} style={{ cursor: 'pointer' }}>
                                Tên {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}
                            </th>
                            <th>Email</th>
                            <th>Số điện thoại</th>
                            <th>Quyền</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((item) => (
                            <tr key={item._id}>
                                <td>{new Date(item.createdAt).toLocaleDateString('vi-VN')}</td>
                                <td>{item.name}</td>
                                <td>{item.email}</td>
                                <td>{item.phone}</td>
                                <td>
                                    <span
                                        className={
                                            item.role === 'admin'
                                                ? `${styles.roleBadge} ${styles.roleBadgeAdmin}`
                                                : styles.roleBadge
                                        }
                                    >
                                        {item.role === 'admin' ? 'Admin' : 'Người dùng'}
                                    </span>
                                    <select
                                        value={item.role}
                                        onChange={(e) => handleRoleChange(item._id, e.target.value)}
                                        style={{
                                            padding: '4px 8px',
                                            borderRadius: '6px',
                                            border: '1px solid #ddd',
                                            width: '100%',
                                            marginTop: 6,
                                            background: '#f8fafd',
                                            fontWeight: 600,
                                        }}
                                    >
                                        <option value="user">Người dùng</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td style={{ textAlign: 'center' }}>
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
