import React from 'react';
import styles from './SmallNewsItem.module.scss';
import { Link } from 'react-router-dom';

interface newsProps {
    name: string;
    date: string;
    image: string;
    path: string;
    des: string;
}

export default function SmallNewsItem({ name, date, image, path, des }: newsProps) {
    return (
        <article className={styles.smallNews}>
            <Link to={path}>
                <img src={image} alt="" />
            </Link>
            <div className={styles.content}>
                <h3>
                    <Link to={path}>{name}</Link>
                </h3>
                <span>{date}</span>
                <p>{des}</p>
            </div>
        </article>
    );
}
