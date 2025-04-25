import React from 'react';
import styles from './Address.module.scss';

export default function Address() {
    return (
        <div>
            <h1 className={styles.titleHeader}>Địa chỉ của bạn</h1>
            <div className={styles.col}>
                <form action="/" acceptCharset="UTF-8">
                    <fieldset className={styles.formGroup}>
                        <label>
                            Số điện thoại
                            <span className={styles.required}> *</span>
                        </label>
                        <input type="phone" placeholder="Số điện thoại" className={styles.formControl} />
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Tỉnh thành
                            <span className={styles.required}> *</span>
                        </label>
                        <input type="text" placeholder="Tỉnh thành" className={styles.formControl} />
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Quận huyện
                            <span className={styles.required}> *</span>
                        </label>
                        <input type="text" placeholder="Quận huyện" className={styles.formControl} />
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Phường xã
                            <span className={styles.required}> *</span>
                        </label>
                        <input type="text" placeholder="Phường xã" className={styles.formControl} />
                    </fieldset>
                    <button>Thêm địa chỉ</button>
                </form>
            </div>
        </div>
    );
}
