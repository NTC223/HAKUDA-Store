import React, { useState } from 'react';
import styles from './ChangPassword.module.scss';
import axiosInstance from '../../../utils/axios';
import { toast } from 'react-toastify';

export default function ChangePassword() {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<any>({});

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axiosInstance.put('/users/change-password', {
                oldPassword,
                newPassword,
                confirmNewPassword,
            });

            if (response.data) {
                toast.success('Đổi mật khẩu thành công!');
                setOldPassword('');
                setNewPassword('');
                setConfirmNewPassword('');
                setError({});
            }
        } catch (error: any) {
            setError(error.response.data.errors);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1 className={styles.titleHeader}>Đổi mật khẩu</h1>
            <div className={styles.row}>
                <div className={styles.col}>
                    <p>Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 8 kí tự</p>
                    <form onSubmit={handleSubmit} noValidate>
                        <p className={styles.error}>{error.oldPassword?.msg}</p>
                        <fieldset className={styles.formGroup}>
                            <label>
                                Mật khẩu cũ
                                <span className={styles.required}> *</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Mật khẩu cũ"
                                className={styles.formControl}
                                value={oldPassword}
                                onChange={(e) => setOldPassword(e.target.value)}
                                required
                            />
                        </fieldset>
                        <p className={styles.error}>{error.newPassword?.msg}</p>
                        <fieldset className={styles.formGroup}>
                            <label>
                                Mật khẩu mới
                                <span className={styles.required}> *</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Mật khẩu mới"
                                className={styles.formControl}
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                        </fieldset>
                        <p className={styles.error}>{error.confirmNewPassword?.msg}</p>
                        <fieldset className={styles.formGroup}>
                            <label>
                                Xác nhận lại mật khẩu mới
                                <span className={styles.required}> *</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Xác nhận lại mật khẩu mới"
                                className={styles.formControl}
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                required
                                minLength={8}
                            />
                        </fieldset>
                        <button type="submit" className={styles.loginBtn} disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Đổi mật khẩu'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
