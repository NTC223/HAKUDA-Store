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

interface PaginationInfo {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
}

const pageSize = 10;

export default function Customer() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState('asc');
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get('/users/all-users', {
                params: {
                    page: currentPage,
                    pageSize: pageSize,
                    sortBy,
                    sortOrder,
                },
            });
            const { users, pagination } = response.data.result;
            setCustomers(users);
            setTotalProducts(pagination.total);
            setTotalPages(pagination.totalPages);
        } catch (err: any) {
            setError('Không thể tải danh sách khách hàng');
            setCustomers([]);
            console.error('Error fetching customers:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCustomers();
    }, [currentPage, sortBy, sortOrder]);

    const handleDelete = async (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người dùng này?')) {
            try {
                await axiosInstance.delete(`/users/delete-user/${id}`);
                toast.success('Xóa người dùng thành công!', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setTimeout(() => {
                    fetchCustomers();
                }, 1000);
            } catch (err: any) {
                toast.error(err.response?.data?.message || 'Không thể xóa người dùng');
                console.error('Error deleting user:', err);
            }
        }
    };

    const handleRoleChange = async (id: string, newRole: string) => {
        try {
            await axiosInstance.put(`/users/update-role/${id}`, { role: newRole });
            toast.success('Cập nhật quyền thành công!', {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            setTimeout(() => {
                fetchCustomers();
            }, 1000);
        } catch (err: any) {
            toast.error(err.response?.data?.message || 'Không thể cập nhật quyền');
            console.error('Error updating role:', err);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
    }, [currentPage]);

    if (loading) {
        return <div>Đang tải...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <div className={styles.content}>
            <ToastContainer />
            <div className={styles.title}>Danh sách người dùng</div>

            <div className={styles.dashBoard}>
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
                            <th style={{ width: '15%' }}>Ngày tạo</th>
                            <th style={{ width: '15%' }}>Tên</th>
                            <th style={{ width: '25%' }}>Email</th>
                            <th style={{ width: '12%' }}>Số điện thoại</th>
                            <th style={{ width: '15%' }}>Quyền</th>
                            <th style={{ width: '13%' }}>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((item, index) => (
                            <tr key={item._id} style={{ verticalAlign: 'middle' }}>
                                <td style={{ textAlign: 'center' }}>{(currentPage - 1) * pageSize + index + 1}</td>
                                <td>{new Date(item.createdAt).toLocaleString('vi-VN')}</td>
                                <td
                                    style={{
                                        maxWidth: '200px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {item.name}
                                </td>
                                <td
                                    style={{
                                        maxWidth: '300px',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {item.email}
                                </td>
                                <td>{item.phone}</td>
                                <td>
                                    <select
                                        value={item.role}
                                        onChange={(e) => handleRoleChange(item._id, e.target.value)}
                                        style={{
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            border: '1px solid #ddd',
                                            width: '100%',
                                        }}
                                    >
                                        <option value="user">Người dùng</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(item._id)}
                                        style={{
                                            padding: '4px 8px',
                                            backgroundColor: '#d32f2f',
                                            color: 'white',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            width: '100%',
                                        }}
                                    >
                                        Xóa
                                    </button>
                                </td>
                            </tr>
                        ))}
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
        </div>
    );
}
