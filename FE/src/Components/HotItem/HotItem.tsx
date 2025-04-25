import React from 'react';
import styles from './HotItem.module.scss';
import { Link } from 'react-router-dom';

interface hotItemProps {
    image: string;
    name: string;
    path: string;
}

export default function HotItem({ image, name, path }: hotItemProps) {
    return (
        <div className={styles.child}>
            <img src={image} alt="" />
            <h3>
                {name}
                <Link to={path}>Xem chi tiết</Link>
            </h3>
        </div>
    );
}
