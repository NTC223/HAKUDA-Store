import React, { useEffect } from 'react';
import styles from './Customer.module.scss';
import { useState } from 'react';

interface customerProps {
    id: string;
    date: string;
    name: string;
    email: string;
    phone: string;
}

const pageSize = 10;

export default function Customer() {
    const customerList: customerProps[] = [
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1002',
            date: '01/01/2025 01:01',
            name: 'Phạm Thị Minh Anh',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
        {
            id: '#1001',
            date: '01/01/2025 01:01',
            name: 'Nguyễn Thành Công',
            email: 'thanhcong19092004@gmail.com',
            phone: '0974432848',
        },
    ];

    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(customerList.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const currentProducts = customerList.slice(startIndex, startIndex + pageSize);

    useEffect(() => {
        window.scroll(0, 0);
    }, [currentPage]);

    return (
        <div className={styles.content}>
            <div className={styles.title}>Khách hàng / Tất cả Khách hàng</div>

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
                        <th>Khách hàng</th>
                        <th>Ngày</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Số điện thoại</th>
                        <th></th>
                    </thead>
                    <tbody>
                        {currentProducts.map((item, index) => {
                            return (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                    <td style={{ width: 25, padding: '10px 0' }}>
                                        <input type="checkbox" />
                                    </td>
                                    <td style={{ width: 120 }}>{item.id}</td>
                                    <td style={{ width: 150 }}>{item.date}</td>
                                    <td style={{ width: 200 }}>{item.name}</td>
                                    <td style={{ width: 200 }}>{item.email}</td>
                                    <td style={{ width: 150 }}>{item.phone}</td>
                                    <td style={{ width: 70 }}>Xoá</td>
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
