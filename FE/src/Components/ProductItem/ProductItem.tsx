import React from 'react';
import styles from './ProductItem.module.scss';
import { Link } from 'react-router-dom';

interface productProps {
    name: string;
    price: string;
    originalPrice?: string;
    discountPercent?: number;
    image: string;
    path: string;
}

export default function ProductItem({ name, price, originalPrice, discountPercent, image, path }: productProps) {
    return (
        <div className={styles.container}>
            <div className={styles.productItem}>
                <form action="/cart/add">
                    <Link to={path} style={{ height: 221 }}>
                        <img src={image} alt="" width={221} height={221} />
                    </Link>
                    <div className={styles.infoProduct}>
                        <h3>
                            <Link to={path}>{name}</Link>
                        </h3>
                        <div className={styles.priceBox}>
                            {originalPrice && discountPercent ? (
                                <>
                                    <div className={styles.originalPrice}>{originalPrice}</div>
                                    <div className={styles.priceProduct}>{price}</div>
                                    <div className={styles.discountPercent}>-{discountPercent}%</div>
                                </>
                            ) : (
                                <div className={styles.priceProduct}>{price}</div>
                            )}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
