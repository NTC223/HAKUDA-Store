import React from 'react';
import styles from './Main.module.scss';

export default function Main() {
    return (
        <>
            <h1 className={styles.titleHeader}>Thông tin tài khoản</h1>
            <p style={{ marginBottom: 16 }}>
                <strong>Họ tên:</strong> Nguyễn Thành Công
            </p>
            <p>
                <strong>Email:</strong> thanhcong19092004@gmail.com
            </p>
        </>
    );
}
