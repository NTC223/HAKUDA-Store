import React, { useState, useEffect } from 'react';
import styles from './Main.module.scss';
import axiosInstance from '../../../utils/axios';
import { toast } from 'react-toastify';

interface UserInfo {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    verify: number;
}

export default function Main() {
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get('/users/me');
                if (response.data.message === 'User fetched successfully') {
                    setUserInfo(response.data.result);
                } else {
                    setError('Không thể tải thông tin người dùng');
                    toast.error('Không thể tải thông tin người dùng');
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
                setError('Không thể tải thông tin người dùng');
                toast.error('Không thể tải thông tin người dùng');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return <div className={styles.loading}>Đang tải thông tin...</div>;
    }

    if (error) {
        return <div className={styles.error}>{error}</div>;
    }

    return (
        <>
            <h1 className={styles.titleHeader}>Thông tin tài khoản</h1>
            <p style={{ marginBottom: 16 }}>
                <strong>Họ tên:</strong> {userInfo?.name || 'Chưa cập nhật'}
            </p>
            <p style={{ marginBottom: 16 }}>
                <strong>Email:</strong> {userInfo?.email || 'Chưa cập nhật'}
            </p>
            <p style={{ marginBottom: 16 }}>
                <strong>Số điện thoại:</strong> {userInfo?.phone || 'Chưa cập nhật'}
            </p>
            <p style={{ marginBottom: 16 }}>
                <strong>Địa chỉ:</strong> {userInfo?.address || 'Chưa cập nhật'}
            </p>
        </>
    );
}
