import React from 'react';
import { useState } from 'react';
import styles from './NumberProduct.module.scss';

export default function NumberProduct() {
    const [numberProduct, setNumberProduct] = useState('1');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;
        if (value === '' || /^[0-9\b]+$/.test(value)) {
            setNumberProduct(value);
        }
    };
    const handleBlur = () => {
        if (numberProduct === '') {
            setNumberProduct('1'); // Khi mất focus, nếu input rỗng thì đặt lại "1"
        }
    };
    const handleIncNumberProduct = () => {
        setNumberProduct(String(parseInt(numberProduct) + 1));
    };
    const handleDescNumberProduct = () => {
        if (numberProduct > '1') setNumberProduct(String(parseInt(numberProduct) - 1));
    };
    return (
        <div className={styles.numberProduct}>
            <button onClick={handleDescNumberProduct} type="button">
                -
            </button>
            <input
                aria-label="Số lượng"
                type="text"
                value={numberProduct}
                onChange={handleChange}
                onBlur={handleBlur}
            />
            <button onClick={handleIncNumberProduct} type="button">
                +
            </button>
        </div>
    );
}
