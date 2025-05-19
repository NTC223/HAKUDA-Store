import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import BreadCrumb from '../../Components/BreadCrumb';
import ProductItem from '../../Components/ProductItem';
import NewsItem from '../../Components/NewsItem';
import NumberProduct from '../../Components/NumberProduct';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';

import prevBtn from '../../Assets/Image/back.png';
import buyingGuide from '../../Assets/Image/huong-dan-mua-hang.webp';
import sv1 from '../../Assets/Image/ico_sv1.png';
import sv2 from '../../Assets/Image/ico_sv2.png';
import sv3 from '../../Assets/Image/ico_sv3.png';
import sv4 from '../../Assets/Image/ico_sv4.png';

interface Product {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    maker: string;
    description: string;
    count_in_stock: number;
    createdAt: string;
    image: string;
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectTag, setSelectTag] = useState(0);
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

    const tagList = ['Thông tin sản phẩm', 'Hướng dẫn mua hàng'];
    const couponList = ['Giảm 5%', 'Giảm 6%', 'Giảm 8%', 'Giảm 10%', 'Giảm 12%'];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/products/${id}`);
                const productData = response.data.result;
                setProduct(productData);

                // Fetch related products
                const relatedResponse = await axiosInstance.get('/products/products', {
                    params: {
                        category: productData.category,
                        page: 1,
                        pageSize: 4,
                    },
                });
                setRelatedProducts(relatedResponse.data.result.products);
            } catch (err: any) {
                setError('Không thể tải thông tin sản phẩm');
                console.error('Error fetching product:', err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleAddToCart = () => {
        // TODO: Implement add to cart functionality
        toast.success('Đã thêm sản phẩm vào giỏ hàng!');
    };

    if (loading) {
        return (
            <div>
                <Navigation active="" />
                <BreadCrumb />
                <div className={styles.loading}>Đang tải...</div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div>
                <Navigation active="" />
                <BreadCrumb />
                <div className={styles.error}>{error || 'Không tìm thấy sản phẩm'}</div>
            </div>
        );
    }

    return (
        <main>
            <Navigation active="" />
            <BreadCrumb />
            <div style={{ marginBottom: 20 }}></div>
            <section className={styles.productDetail}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.lefCol}>
                            <div style={{ overflow: 'hidden', clear: 'both' }}>
                                <div className={styles.row}>
                                    <div className={styles.lefContainer}>
                                        <div className={styles.productImageDetail}>
                                            <div className={styles.galleryTop}>
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className={styles.productImage}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.rightContainer}>
                                        <div style={{ overflow: 'hidden', clear: 'both' }}>
                                            <div className={styles.detailPro}>
                                                <h1 className={styles.title}>{product.name}</h1>
                                                <div className={styles.vendorGroup}>
                                                    <div className={styles.vendor}>
                                                        <span>Thương hiệu: </span>
                                                        {product.maker}
                                                    </div>
                                                    <div style={{ fontSize: 14, lineHeight: 1.3, fontWeight: 400 }}>
                                                        Mã sản phẩm:
                                                        <strong style={{ fontWeight: 400 }}> {product._id}</strong>
                                                    </div>
                                                </div>
                                                <div className={styles.groupActionBtn}>
                                                    <div className={styles.topGroup}>
                                                        <div className={styles.priceBox}>
                                                            <div className={styles.priceProduct}>
                                                                {product.price.toLocaleString('vi-VN')}₫
                                                            </div>
                                                        </div>
                                                        <div className={styles.coupon}>
                                                            <div className={styles.listCoupon}>
                                                                {couponList.map((item, idx) => (
                                                                    <div key={idx} className={styles.couponTag}>
                                                                        {item}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className={styles.couponText}>5 Mã Giảm Giá</div>
                                                        </div>
                                                    </div>
                                                    <form>
                                                        <div className={styles.formProduct}>
                                                            <div className={styles.formActionAddCart}>
                                                                <div className={styles.btnNumber}>
                                                                    <label
                                                                        style={{ display: 'block', marginBottom: 5 }}
                                                                    >
                                                                        Số lượng:
                                                                    </label>
                                                                    <NumberProduct />
                                                                </div>
                                                                <div
                                                                    className={styles.btnBuy}
                                                                    style={{ marginTop: 15, display: 'flex' }}
                                                                >
                                                                    <button type="button" className={styles.buyNow}>
                                                                        <Link to="/payment" className={styles.buyNow}>
                                                                            MUA NGAY
                                                                        </Link>
                                                                    </button>
                                                                    <button
                                                                        type="button"
                                                                        className={styles.addToCart}
                                                                        onClick={handleAddToCart}
                                                                    >
                                                                        THÊM VÀO GIỎ
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </form>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ overflow: 'hidden', clear: 'both', marginTop: 20 }}>
                                <div className={styles.productTab}>
                                    <ul className={styles.tabsTitle}>
                                        {tagList.map((item, idx) => (
                                            <li
                                                key={idx}
                                                className={`${styles.tab} ${selectTag === idx ? styles.current : ''}`}
                                                onClick={() => setSelectTag(idx)}
                                            >
                                                <span>{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className={`${styles.tabContent} ${selectTag === 0 ? styles.current : ''}`}>
                                        <div className={styles.rte}>
                                            <div>
                                                <h3 className={styles.productName}>
                                                    <span>Thông tin chi tiết sản phẩm</span>
                                                </h3>
                                                <p style={{ marginTop: 0 }}>{product.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.tabContent} ${selectTag === 1 ? styles.current : ''}`}>
                                        <div className={styles.rte}>
                                            <p style={{ textAlign: 'center' }}>
                                                <img src={buyingGuide} alt="Hướng dẫn mua hàng" />
                                            </p>
                                            {/* Copy nội dung hướng dẫn mua hàng từ MNQXH09X.tsx */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ overflow: 'hidden', clear: 'both', marginTop: 20 }}>
                                <h2 className={styles.title}>Sản phẩm liên quan</h2>
                                <div style={{ display: 'flex' }}>
                                    {relatedProducts.map((item) => (
                                        <ProductItem
                                            key={item._id}
                                            name={item.name}
                                            price={item.price.toLocaleString('vi-VN') + '₫'}
                                            image={item.image}
                                            path={`/product/${item._id}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={styles.rightCol}>
                            <div className={styles.fixPage}>
                                <div style={{ background: '#fff', overflow: 'hidden', clear: 'both' }}>
                                    <div className={styles.blockTitle}>
                                        <h2 className={styles.title}>ưu đãi thành viên</h2>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <div className={styles.image}>
                                            <img src={sv1} alt="Dịch vụ đóng gói riêng" width={40} height={40} />
                                        </div>
                                        <div className={styles.contentsv}>
                                            <h4>Dịch vụ đóng gói riêng</h4>
                                        </div>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <div className={styles.image}>
                                            <img src={sv2} alt="Tích điểm đặc quyền" width={40} height={40} />
                                        </div>
                                        <div className={styles.contentsv}>
                                            <h4>Tích điểm đặc quyền</h4>
                                        </div>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <div className={styles.image}>
                                            <img src={sv3} alt="Quà tặng bí mật" width={40} height={40} />
                                        </div>
                                        <div className={styles.contentsv}>
                                            <h4>Quà tặng bí mật</h4>
                                        </div>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <div className={styles.image}>
                                            <img src={sv4} alt="Mã giảm giá đặc quyền" width={40} height={40} />
                                        </div>
                                        <div className={styles.contentsv}>
                                            <h4>Mã giảm giá đặc quyền</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
