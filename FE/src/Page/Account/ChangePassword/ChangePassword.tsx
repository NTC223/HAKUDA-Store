import React from 'react';
import styles from './ChangPassword.module.scss';

export default function ChangePassword() {
    return (
        <div>
            <h1 className={styles.titleHeader}>Đổi mật khẩu</h1>
            <div className={styles.row}>
                <div className={styles.col}>
                    <p>Để đảm bảo tính bảo mật bạn vui lòng đặt lại mật khẩu với ít nhất 8 kí tự</p>
                    <form action="/" acceptCharset="UTF-8">
                        <fieldset className={styles.formGroup}>
                            <label>
                                Mật khẩu cũ
                                <span className={styles.required}> *</span>
                            </label>
                            <input type="password" placeholder="Mật khẩu cũ" className={styles.formControl} />
                        </fieldset>
                        <fieldset className={styles.formGroup}>
                            <label>
                                Mật khẩu mới
                                <span className={styles.required}> *</span>
                            </label>
                            <input type="password" placeholder="Mật khẩu mới" className={styles.formControl} />
                        </fieldset>
                        <fieldset className={styles.formGroup}>
                            <label>
                                Xác nhận lại mật khẩu mới
                                <span className={styles.required}> *</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Xác nhận lại mật khẩu mới"
                                className={styles.formControl}
                            />
                        </fieldset>
                        <button className={styles.loginBtn}>Đổi mật khẩu</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
