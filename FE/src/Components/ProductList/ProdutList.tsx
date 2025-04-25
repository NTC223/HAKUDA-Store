import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';

import prdImage from '../../Assets/Image/QuanVu/anh1.webp';

interface productListProps {
    startIndex: number;
    endIndex: number;
    onProductCountChange: (count: number) => void;
}

interface productProps {
    name: string;
    price: string;
    image: string;
    path: string;
}

export default function ProdutList({ startIndex, endIndex, onProductCountChange }: productListProps) {
    const productList: productProps[] = [
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '14.000.000₫',
            image: prdImage,
            path: '/mnqxh09x',
        },
    ];

    useEffect(() => {
        onProductCountChange(productList.length);
    }, [productList.length, onProductCountChange]);

    const currentProducts = productList.slice(startIndex, Math.min(endIndex, productList.length));

    return (
        <div
            style={{
                marginTop: 20,
                position: 'relative',
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            {currentProducts.map((item, index) => {
                return <ProductItem {...item} key={index} />;
            })}
        </div>
    );
}
