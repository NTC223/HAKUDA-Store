import React, { useState } from 'react';
import styles from './Address.module.scss';
import { toast } from 'react-toastify';
import axiosInstance from '../../../utils/axios';

export default function Address() {
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            console.log('Sending data:', { phone, address });
            const response = await axiosInstance.put('/users/update-address', {
                phone,
                address,
            });
            console.log('Response:', response.data);
            if (response.data) {
                toast.success('Cập nhật địa chỉ thành công!');
                setPhone('');
                setAddress('');
            }
        } catch (error: any) {
            console.error('Error details:', error);
            if (error.response) {
                console.error('Error response:', error.response.data);
                toast.error(error.response.data.message || 'Có lỗi xảy ra khi cập nhật địa chỉ');
            } else if (error.request) {
                console.error('Error request:', error.request);
                toast.error('Không thể kết nối đến server');
            } else {
                console.error('Error message:', error.message);
                toast.error('Có lỗi xảy ra khi cập nhật địa chỉ');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className={styles.titleHeader}>Địa chỉ của bạn</h1>
            <div className={styles.col}>
                <form onSubmit={handleSubmit}>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Số điện thoại
                            <span className={styles.required}> *</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="Số điện thoại"
                            className={styles.formControl}
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                            pattern="[0-9]{10}"
                            title="Vui lòng nhập số điện thoại 10 số"
                        />
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Địa chỉ
                            <span className={styles.required}> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Địa chỉ"
                            className={styles.formControl}
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                            minLength={5}
                            maxLength={255}
                        />
                    </fieldset>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Đang cập nhật...' : 'Cập nhật địa chỉ'}
                    </button>
                </form>
            </div>
        </div>
    );
}
