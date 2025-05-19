import React, { useEffect } from 'react';
import ProductItem from '../ProductItem';

interface productListProps {
    startIndex: number;
    endIndex: number;
    onProductCountChange: (count: number) => void;
    products?: productProps[];
}

interface productProps {
    _id: string;
    name: string;
    price: string;
    image: string;
}

export default function ProdutList({ startIndex, endIndex, onProductCountChange, products }: productListProps) {
    useEffect(() => {
        onProductCountChange(products?.length || 0);
    }, [products?.length, onProductCountChange]);

    if (!products || products.length === 0) {
        return <div>Không có sản phẩm nào</div>;
    }

    const currentProducts = products.slice(startIndex, Math.min(endIndex, products.length));

    return (
        <div
            style={{
                marginTop: 20,
                position: 'relative',
                display: 'flex',
                flexWrap: 'wrap',
            }}
        >
            {currentProducts.map((item) => (
                <ProductItem
                    key={item._id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    path={`/product/${item._id}`}
                />
            ))}
        </div>
    );
}
