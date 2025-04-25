import React from 'react';
import styles from './AddProduct.module.scss';

interface AddProductProps {
    onCancel: () => void;
}

export default function AddProduct({ onCancel }: AddProductProps) {
    return (
        <div className={styles.content}>
            <div className={styles.title}>Thêm sản phẩm mới</div>
            <div className={styles.formContainer}>
                <form>
                    <div className={styles.formGroup}>
                        <label>Tên sản phẩm</label>
                        <input type="text" placeholder="Nhập tên sản phẩm" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Giá</label>
                        <input type="number" placeholder="Nhập giá sản phẩm" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Danh mục</label>
                        <select>
                            <option value="">Chọn danh mục</option>
                            <option value="figures">Figures</option>
                            <option value="accessories">Phụ kiện</option>
                            <option value="clothing">Quần áo</option>
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Nhà cung cấp</label>
                        <input type="text" placeholder="Nhập nhà cung cấp" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Số lượng</label>
                        <input type="number" placeholder="Nhập số lượng" />
                    </div>

                    <div className={styles.formGroup}>
                        <label>Mô tả</label>
                        <textarea rows={4} placeholder="Nhập mô tả sản phẩm"></textarea>
                    </div>

                    <div className={styles.formGroup}>
                        <label>Hình ảnh</label>
                        <input type="file" multiple accept="image/*" />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button type="submit" className={styles.submitBtn}>
                            Thêm sản phẩm
                        </button>
                        <button type="button" className={styles.cancelBtn} onClick={onCancel}>
                            Hủy
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
