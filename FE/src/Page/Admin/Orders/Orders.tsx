import React, { useEffect, useState } from 'react';
import styles from './Orders.module.scss';
import axiosInstance from '../../../utils/axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

interface OrderItem {
    product_id: string;
    quantity: number;
    price: number;
}

interface Product {
    _id: string;
    name: string;
}

interface User {
    _id: string;
    name: string;
}

interface Order {
    _id: string;
    user_id: string;
    items: OrderItem[];
    total_amount: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    payment_status: 'unpaid' | 'paid';
    shipping_address: string;
    createdAt: string;
}

const STATUS_OPTIONS = [
    { value: '', label: 'Tất cả' },
    { value: 'pending', label: 'Chờ xác nhận' },
    { value: 'confirmed', label: 'Đã xác nhận' },
    { value: 'shipped', label: 'Đang giao hàng' },
    { value: 'delivered', label: 'Đã giao hàng' },
    { value: 'cancelled', label: 'Đã hủy' },
];

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [products, setProducts] = useState<{ [key: string]: Product }>({});
    const [users, setUsers] = useState<{ [key: string]: User }>({});
    const [searchInput, setSearchInput] = useState('');
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const pageSize = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/orders/order-list', {
                    params: {
                        page: currentPage,
                        pageSize: pageSize,
                        query: search,
                        status: statusFilter,
                    },
                });
                const ordersData = response.data.result.orders;
                setOrders(ordersData);
                setTotalPages(response.data.result.pagination.totalPages);
                // Lấy thông tin người dùng cho tất cả đơn hàng
                const uniqueUserIds = Array.from(new Set<string>(ordersData.map((order: Order) => order.user_id)));
                uniqueUserIds.forEach((userId: string) => {
                    fetchUserDetails(userId);
                });
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
        // eslint-disable-next-line
    }, [currentPage, search, statusFilter]);

    const fetchProductDetails = async (productId: string) => {
        if (products[productId]) return;
        try {
            const response = await axiosInstance.get(`/products/${productId}`);
            setProducts((prev) => ({
                ...prev,
                [productId]: response.data.result,
            }));
        } catch (error) {
            console.error('Error fetching product details:', error);
        }
    };

    const fetchUserDetails = async (userId: string) => {
        if (users[userId]) return;
        try {
            const response = await axiosInstance.get(`/users/${userId}`);
            setUsers((prev) => ({
                ...prev,
                [userId]: response.data.result,
            }));
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const handleOrderClick = async (order: Order) => {
        if (selectedOrder?._id === order._id) {
            setSelectedOrder(null);
        } else {
            setSelectedOrder(order);
            order.items.forEach((item) => {
                fetchProductDetails(item.product_id);
            });
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    };

    const updateOrderStatus = async (orderId: string, status: Order['status']) => {
        try {
            const order = orders.find((o) => o._id === orderId);
            if (!order) return;
            await axiosInstance.put(`/orders/${orderId}`, {
                status,
                payment_status: order.payment_status,
            });
            setOrders(orders.map((order) => (order._id === orderId ? { ...order, status } : order)));
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    const updatePaymentStatus = async (orderId: string, payment_status: Order['payment_status']) => {
        try {
            const order = orders.find((o) => o._id === orderId);
            if (!order) return;
            await axiosInstance.put(`/orders/${orderId}`, {
                payment_status,
                status: order.status,
            });
            setOrders(orders.map((order) => (order._id === orderId ? { ...order, payment_status } : order)));
        } catch (error) {
            console.error('Error updating payment status:', error);
        }
    };

    const deleteOrder = async (orderId: string) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) {
            return;
        }
        try {
            await axiosInstance.delete(`/orders/delete-order/${orderId}`);
            setOrders(orders.filter((order) => order._id !== orderId));
            setSelectedOrder(null);
        } catch (error) {
            console.error('Error deleting order:', error);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setSearch(searchInput);
        setCurrentPage(1);
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    return (
        <div className={styles.productPage}>
            <div className={styles.pageHeader}>
                <h1>Quản lý đơn hàng</h1>
            </div>
            <form className={styles.searchBar} onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Tìm kiếm đơn hàng..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />
                <button type="submit">Tìm kiếm</button>
                <div className={styles.filterWrap}>
                    <span>Lọc theo trạng thái:</span>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        {STATUS_OPTIONS.map((opt) => (
                            <option key={opt.value} value={opt.value}>
                                {opt.label}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
            <div className={styles.tableWrap}>
                <table className={styles.productTable}>
                    <thead>
                        <tr>
                            <th style={{ width: '10%' }}>Ngày tạo</th>
                            <th style={{ width: '20%' }}>Khách hàng</th>
                            <th>Địa chỉ</th>
                            <th style={{ width: '12%' }}>Tổng tiền</th>
                            <th style={{ width: '12%' }}>Trạng thái</th>
                            <th style={{ width: '15%' }}>Thanh toán</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr
                                        onClick={() => handleOrderClick(order)}
                                        className={styles.orderRow}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <td className={styles.createdAtCell}>{formatDate(order.createdAt)}</td>
                                        <td>{users[order.user_id]?.name || 'Đang tải...'}</td>
                                        <td>{order.shipping_address}</td>
                                        <td className={styles.priceCell}>
                                            {order.total_amount.toLocaleString('vi-VN')}₫
                                        </td>
                                        <td>
                                            <select
                                                value={order.status}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    updateOrderStatus(order._id, e.target.value as Order['status']);
                                                }}
                                                className={styles.statusSelect}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <option value="pending">Chờ xác nhận</option>
                                                <option value="confirmed">Đã xác nhận</option>
                                                <option value="shipped">Đang giao hàng</option>
                                                <option value="delivered">Đã giao hàng</option>
                                                <option value="cancelled">Đã hủy</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={order.payment_status}
                                                onChange={(e) => {
                                                    e.stopPropagation();
                                                    updatePaymentStatus(
                                                        order._id,
                                                        e.target.value as Order['payment_status'],
                                                    );
                                                }}
                                                className={styles.statusSelect}
                                                onClick={(e) => e.stopPropagation()}
                                            >
                                                <option value="unpaid">Chưa thanh toán</option>
                                                <option value="paid">Đã thanh toán</option>
                                            </select>
                                        </td>
                                    </tr>
                                    {selectedOrder?._id === order._id && (
                                        <tr className={styles.detailRow}>
                                            <td colSpan={6}>
                                                <div className={styles.orderDetails}>
                                                    <h3>Chi tiết đơn hàng</h3>
                                                    <table>
                                                        <thead>
                                                            <tr>
                                                                <th>Sản phẩm</th>
                                                                <th>Số lượng</th>
                                                                <th>Đơn giá</th>
                                                                <th>Thành tiền</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {order.items.map((item, index) => (
                                                                <tr key={index}>
                                                                    <td>
                                                                        {products[item.product_id]?.name ||
                                                                            'Đang tải...'}
                                                                    </td>
                                                                    <td>{item.quantity}</td>
                                                                    <td>{item.price.toLocaleString('vi-VN')}₫</td>
                                                                    <td>
                                                                        {(item.quantity * item.price).toLocaleString(
                                                                            'vi-VN',
                                                                        )}
                                                                        ₫
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                    <div className={styles.orderActions}>
                                                        <button
                                                            className={styles.deleteButton}
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                deleteOrder(order._id);
                                                            }}
                                                        >
                                                            Xóa đơn hàng
                                                        </button>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6}>
                                    <p>Không có đơn hàng nào.</p>
                                    </td>
                                </tr>
                        )}
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
