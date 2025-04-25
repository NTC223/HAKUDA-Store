import React from 'react';
import styles from './OverView.module.scss';

export default function OverView() {
    const list = [
        {
            name: 'Khách hàng mới',
            value: '1000',
        },
        {
            name: 'Đơn hàng mới',
            value: '1000',
        },
        {
            name: 'Doanh thu',
            value: '100.000.000đ',
        },
        {
            name: 'Đơn chưa thanh toán',
            value: '0',
        },
    ];

    return (
        <div className={styles.content}>
            <div className={styles.title}>Tổng quan</div>
            <div className={styles.dashBoard}>
                <table>
                    <tbody>
                        {list.map((item, index) => {
                            return (
                                <tr key={index} style={{ verticalAlign: 'middle' }}>
                                    <td>{item.name}</td>
                                    <td>{item.value}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
