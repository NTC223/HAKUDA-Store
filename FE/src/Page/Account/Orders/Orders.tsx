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

interface Order {
    _id: string;
    items: OrderItem[];
    total_amount: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    payment_status: 'unpaid' | 'paid';
    shipping_address: string;
    createdAt: string;
}

export default function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [products, setProducts] = useState<{ [key: string]: Product }>({});
    const pageSize = 10;

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/orders/order-list/userid`, {
                    params: {
                        page: currentPage,
                        pageSize: pageSize,
                    },
                });
                setOrders(response.data.result.orders);
                setTotalPages(response.data.result.pagination.totalPages);
            } catch (error) {
                console.error('Error fetching orders:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [currentPage]);

    const fetchProductDetails = async (productId: string) => {
        if (products[productId]) return; // Đã có thông tin sản phẩm

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

    const handlePayment = async (orderId: string) => {
        try {
            // Xử lý thanh toán ở đây
            console.log('Processing payment for order:', orderId);
        } catch (error) {
            console.error('Error processing payment:', error);
        }
    };

    const formatDate = (dateString: string) => {
        return format(new Date(dateString), 'dd/MM/yyyy HH:mm', { locale: vi });
    };

    const getStatusText = (status: string) => {
        const statusMap: { [key: string]: string } = {
            pending: 'Chờ xác nhận',
            confirmed: 'Đã xác nhận',
            shipped: 'Đang giao hàng',
            delivered: 'Đã giao hàng',
            cancelled: 'Đã hủy',
        };
        return statusMap[status] || status;
    };

    const getPaymentStatusText = (status: string) => {
        return status === 'paid' ? 'Đã thanh toán' : 'Chưa thanh toán';
    };

    const handleOrderClick = async (order: Order) => {
        if (selectedOrder?._id === order._id) {
            setSelectedOrder(null);
        } else {
            setSelectedOrder(order);
            // Lấy thông tin sản phẩm cho tất cả các sản phẩm trong đơn hàng
            order.items.forEach((item) => {
                fetchProductDetails(item.product_id);
            });
        }
    };

    if (loading) {
        return <div>Đang tải...</div>;
    }

    return (
        <div>
            <h1 className={styles.titleHeader}>Đơn hàng của bạn</h1>
            <div className={styles.dashBoard}>
                <table>
                    <thead>
                        <tr>
                            <th>Ngày tạo</th>
                            <th>Địa chỉ</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thanh toán</th>
                            {/* <th>Thao tác</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length > 0 ? (
                            orders.map((order) => (
                                <React.Fragment key={order._id}>
                                    <tr onClick={() => handleOrderClick(order)} className={styles.orderRow}>
                                        <td>{formatDate(order.createdAt)}</td>
                                        <td>{order.shipping_address}</td>
                                        <td>{order.total_amount.toLocaleString('vi-VN')}₫</td>
                                        <td>{getStatusText(order.status)}</td>
                                        <td>{getPaymentStatusText(order.payment_status)}</td>
                                        {/* <td>
                                            {order.payment_status === 'unpaid' && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handlePayment(order._id);
                                                    }}
                                                    className={styles.payButton}
                                                >
                                                    Thanh toán
                                                </button>
                                            )}
                                        </td> */}
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

                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                        >
                            Trước
                        </button>
                        <span>
                            Trang {currentPage} / {totalPages}
                        </span>
                        <button
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                        >
                            Sau
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
