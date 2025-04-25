import React from 'react';
import styles from './Orders.module.scss';

export default function Orders() {
    return (
        <div>
            <h1 className={styles.titleHeader}>Đơn hàng của bạn</h1>
            <div className={styles.dashBoard}>
                <table>
                    <thead>
                        <th>Đơn hàng</th>
                        <th>Ngày</th>
                        <th>Địa chỉ</th>
                        <th>Giá trị đơn hàng</th>
                        <th>TT thanh toán</th>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <p>Không có đơn hàng nào.</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}
