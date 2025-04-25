import React, { useEffect } from 'react';
import styles from './Orders.module.scss';
import { useState } from 'react';

interface ordersProps {
    id: string;
    date: string;
    name: string;
    status: string;
    ship: string;
    total: string;
}

const pageSize = 10;

export default function Orders() {
    const orderList: ordersProps[] = [
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Chưa thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang giao',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Giao hàng thành công',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            status: 'Đã thanh toán',
            ship: 'Đang chuẩn bị hàng',
            total: '15.000.000₫',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(orderList.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentProducts = orderList.slice(startIndex, startIndex + pageSize);

    useEffect(() => {
        window.scroll(0, 0);
    }, [currentPage]);

    return (
        <div className={styles.content}>
            <div className={styles.title}>Đơn hàng / Tất cả Đơn hàng</div>

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
                        <th>Đơn hàng</th>
                        <th>Ngày đặt</th>
                        <th>Khách hàng</th>
                        <th>Trạng thái</th>
                        <th>Giao hàng</th>
                        <th>Tổng tiền</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {currentProducts.map((item, index) => {
                            return (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                    <td style={{ width: 25, padding: '10px 0' }}>
                                        <input type="checkbox" />
                                    </td>
                                    <td style={{ width: 100 }}>{item.id}</td>
                                    <td style={{ width: 130 }}>{item.date}</td>
                                    <td style={{ width: 170 }}>{item.name}</td>
                                    <td style={{ width: 130 }}>{item.status}</td>
                                    <td style={{ width: 170 }}>{item.ship}</td>
                                    <td style={{ width: 100 }}>{item.total}</td>
                                    <td style={{ width: 50 }}>Xem</td>
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
        </div>
    );
}
