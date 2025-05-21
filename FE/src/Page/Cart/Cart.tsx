import React, { useState, useEffect } from 'react';
import styles from './Cart.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import NumberProduct from '../../Components/NumberProduct';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';

interface Product {
    _id: string;
    name: string;
    price: number;
    image: string;
}

interface CartItem {
    product_id: string;
    quantity: number;
    product?: Product;
}

interface CartResponse {
    message: string;
    result: {
        items: CartItem[];
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    };
}

export default function Cart() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalAmount, setTotalAmount] = useState(0);
    const navigate = useNavigate();

    const fetchProductDetails = async (productId: string) => {
        try {
            const response = await axiosInstance.get(`/products/${productId}`);
            return response.data.result;
        } catch (error) {
            console.error('Error fetching product details:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchCartItems = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get<CartResponse>('/cart/cart-list', {
                    params: {
                        page: 1,
                        pageSize: 10,
                    },
                });

                if (response.data.message === 'Cart retrieved successfully') {
                    // Lấy thông tin chi tiết cho từng sản phẩm
                    const itemsWithDetails = await Promise.all(
                        response.data.result.items.map(async (item) => {
                            const productDetails = await fetchProductDetails(item.product_id);
                            return {
                                ...item,
                                product: productDetails,
                            };
                        }),
                    );

                    setCartItems(itemsWithDetails);

                    // Tính tổng tiền
                    const total = itemsWithDetails.reduce((sum, item) => {
                        return sum + (item.product?.price || 0) * item.quantity;
                    }, 0);
                    setTotalAmount(total);
                } else {
                    toast.error('Không thể tải giỏ hàng');
                }
            } catch (error) {
                console.error('Error fetching cart:', error);
                toast.error('Không thể tải giỏ hàng');
            } finally {
                setLoading(false);
            }
        };

        fetchCartItems();
    }, []);

    const handleQuantityChange = async (productId: string, newQuantity: number) => {
        try {
            const response = await axiosInstance.put(`/cart/update-product/${productId}`, {
                quantity: newQuantity,
            });

            if (
                response.data.message === 'Product updated in cart successfully' &&
                response.data.result.modifiedCount === 1
            ) {
                setCartItems((prevItems) =>
                    prevItems.map((item) =>
                        item.product_id === productId ? { ...item, quantity: newQuantity } : item,
                    ),
                );

                // Tính lại tổng tiền
                const newTotal = cartItems.reduce((sum, item) => {
                    if (item.product_id === productId) {
                        return sum + (item.product?.price || 0) * newQuantity;
                    }
                    return sum + (item.product?.price || 0) * item.quantity;
                }, 0);
                setTotalAmount(newTotal);
            } else {
                toast.error('Không thể cập nhật số lượng sản phẩm');
            }
        } catch (error) {
            console.error('Error updating product quantity:', error);
            toast.error('Không thể cập nhật số lượng sản phẩm');
        }
    };

    const handleDeleteProduct = async (productId: string) => {
        try {
            const response = await axiosInstance.delete(`/cart/delete-product/${productId}`);

            if (
                response.data.message === 'Product deleted from cart successfully' &&
                response.data.result.modifiedCount === 1
            ) {
                // Xóa sản phẩm khỏi state
                setCartItems((prevItems) => prevItems.filter((item) => item.product_id !== productId));

                // Tính lại tổng tiền
                const newTotal = cartItems
                    .filter((item) => item.product_id !== productId)
                    .reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0);
                setTotalAmount(newTotal);

                toast.success('Đã xóa sản phẩm khỏi giỏ hàng');
            } else {
                toast.error('Không thể xóa sản phẩm khỏi giỏ hàng');
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            toast.error('Không thể xóa sản phẩm khỏi giỏ hàng');
        }
    };

    const handleCreateOrder = async () => {
        if (window.confirm('Bạn có chắc chắn muốn đặt hàng?')) {
            try {
                const response = await axiosInstance.get('/orders/create-order');
                if (response.data.message === 'Order created successfully') {
                    toast.success('Đặt hàng thành công!');
                }
            } catch (error: any) {
                console.log(error);
                if (error.response?.data?.error === 'Address is not found') {
                    toast.error('Vui lòng cập nhật địa chỉ trong phần thông tin tài khoản');
                    navigate('/account');
                } else {
                    toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi đặt hàng');
                }
            }
        }
    };

    if (loading) {
        return (
            <div>
                <Navigation active="" />
                <div className={styles.loading}>Đang tải giỏ hàng...</div>
            </div>
        );
    }

    return (
        <div>
            <Navigation active="" />
            <section className={styles.mainCartPage}>
                <div className={styles.container}>
                    <div>
                        <div className={styles.headerCart}>
                            <h1 className={styles.title}>Giỏ hàng của bạn</h1>
                        </div>
                        <div className={styles.cartPage}>
                            <div className={styles.row}>
                                <div className={styles.lefCol}>
                                    <form>
                                        <div className={styles.cartHeaderInfo}>
                                            <div>Thông tin sản phẩm</div>
                                            <div>Đơn giá</div>
                                            <div>Số lượng</div>
                                            <div>Thành tiền</div>
                                        </div>
                                        <div className={styles.cartContent}>
                                            {cartItems.map((item) => (
                                                <div key={item.product_id} className={styles.groupRow}>
                                                    <div className={styles.cartProduct}>
                                                        <Link
                                                            to={`/product/${item.product_id}`}
                                                            className={styles.cartImage}
                                                        >
                                                            <img
                                                                src={item.product?.image || ''}
                                                                alt={item.product?.name || ''}
                                                            />
                                                        </Link>
                                                        <div className={styles.cartInfo}>
                                                            <div className={styles.cartName}>
                                                                <Link to={`/product/${item.product_id}`}>
                                                                    {item.product?.name || 'Đang tải...'}
                                                                </Link>
                                                                <button
                                                                    onClick={() => handleDeleteProduct(item.product_id)}
                                                                    style={{
                                                                        color: 'var(--main-color)',
                                                                        fontWeight: 300,
                                                                        background: 'none',
                                                                        border: 'none',
                                                                        cursor: 'pointer',
                                                                        padding: 0,
                                                                        marginLeft: 10,
                                                                    }}
                                                                >
                                                                    Xóa
                                                                </button>
                                                            </div>
                                                            <div className={styles.grid}>
                                                                <div className={styles.cartPrice}>
                                                                    <span>
                                                                        {item.product?.price.toLocaleString('vi-VN') ||
                                                                            '0'}
                                                                        ₫
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <div className={styles.grid}>
                                                                <NumberProduct
                                                                    value={item.quantity}
                                                                    onChange={(newQuantity) =>
                                                                        handleQuantityChange(
                                                                            item.product_id,
                                                                            newQuantity,
                                                                        )
                                                                    }
                                                                />
                                                            </div>
                                                            <div className={styles.grid}>
                                                                <span>
                                                                    {(
                                                                        (item.product?.price || 0) * item.quantity
                                                                    ).toLocaleString('vi-VN')}
                                                                    ₫
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </form>
                                </div>
                                <div className={styles.rightCol}>
                                    <div className={styles.vat}>
                                        <div className={styles.cartTotal}>
                                            <div style={{ fontWeight: 'bold' }}>Tổng tiền:</div>
                                            <span style={{ color: 'var(--price)' }}>
                                                {totalAmount.toLocaleString('vi-VN')}₫
                                            </span>
                                        </div>
                                        <div className={styles.buy}>
                                            <button onClick={handleCreateOrder}>Đặt hàng</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
