import React, { useEffect, useState } from 'react';
import styles from './Admin.module.scss';
import axiosInstance from '../../utils/axios';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface OverviewData {
    totalRevenue: number;
    totalOrders: number;
    totalProducts: number;
    totalUsers: number;
    pendingOrders: number;
    outOfStockProducts: number;
    recentOrders: {
        _id: string;
        total_amount: number;
        status: string;
        createdAt: string;
    }[];
    topSellingProducts: {
        _id: string;
        name: string;
        sold: number;
    }[];
    monthlyRevenue: number[];
}

export default function Dashboard() {
    const [data, setData] = useState<OverviewData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOverviewData = async () => {
            try {
                const response = await axiosInstance.get('/admin/overview');
                setData(response.data.result);
            } catch (error) {
                console.error('Error fetching overview data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchOverviewData();
    }, []);

    if (loading) return <div>Đang tải...</div>;
    if (!data) return <div>Không thể tải dữ liệu</div>;

    const chartData = {
        labels: [
            'Tháng 1',
            'Tháng 2',
            'Tháng 3',
            'Tháng 4',
            'Tháng 5',
            'Tháng 6',
            'Tháng 7',
            'Tháng 8',
            'Tháng 9',
            'Tháng 10',
            'Tháng 11',
            'Tháng 12',
        ],
        datasets: [
            {
                label: 'Doanh thu (VNĐ)',
                data: data.monthlyRevenue,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };
    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { position: 'top' as const },
            title: { display: true, text: 'Doanh thu theo tháng' },
        },
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    callback: function (value: any) {
                        return value.toLocaleString('vi-VN') + '₫';
                    },
                },
            },
        },
    };

    return (
        <div className={styles.dashboardWrap}>
            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <h3>Tổng doanh thu</h3>
                    <p className={styles.value}>{data.totalRevenue.toLocaleString('vi-VN')}₫</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Tổng đơn hàng</h3>
                    <p className={styles.value}>{data.totalOrders}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Tổng sản phẩm</h3>
                    <p className={styles.value}>{data.totalProducts}</p>
                </div>
                <div className={styles.statCard}>
                    <h3>Tổng khách hàng</h3>
                    <p className={styles.value}>{data.totalUsers}</p>
                </div>
            </div>
            <div className={styles.chartCard}>
                <Line data={chartData} options={chartOptions} />
            </div>
            <div className={styles.detailsGrid}>
                <div className={styles.detailCard}>
                    <h3>Đơn hàng gần đây</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Mã đơn</th>
                                <th>Tổng tiền</th>
                                <th>Trạng thái</th>
                                <th>Ngày tạo</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.recentOrders.map((order) => (
                                <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{order.total_amount.toLocaleString('vi-VN')}₫</td>
                                    <td>{order.status}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString('vi-VN')}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className={styles.detailCard}>
                    <h3>Sản phẩm bán chạy</h3>
                    <table>
                        <thead>
                            <tr>
                                <th style={{ width: '80%' }}>Tên sản phẩm</th>
                                <th>Đã bán</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.topSellingProducts.map((product) => (
                                <tr key={product._id}>
                                    <td>{product.name}</td>
                                    <td>{product.sold}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
