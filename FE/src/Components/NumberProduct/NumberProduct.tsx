import React from 'react';
import styles from './NumberProduct.module.scss';

interface NumberProductProps {
    value: number;
    onChange: (value: number) => void;
}

export default function NumberProduct({ value, onChange }: NumberProductProps) {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let newValue = e.target.value;
        if (newValue === '' || /^[0-9\b]+$/.test(newValue)) {
            const numValue = parseInt(newValue) || 1;
            onChange(numValue);
        }
    };

    const handleBlur = () => {
        if (!value) {
            onChange(1);
        }
    };

    const handleIncNumberProduct = () => {
        onChange(value + 1);
    };

    const handleDescNumberProduct = () => {
        if (value > 1) {
            onChange(value - 1);
        }
    };

    return (
        <div className={styles.numberProduct}>
            <button onClick={handleDescNumberProduct} type="button">
                -
            </button>
            <input aria-label="Số lượng" type="text" value={value} onChange={handleChange} onBlur={handleBlur} />
            <button onClick={handleIncNumberProduct} type="button">
                +
            </button>
        </div>
    );
}
