import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import BreadCrumb from '../../Components/BreadCrumb';
import ProductItem from '../../Components/ProductItem';
import NumberProduct from '../../Components/NumberProduct';
import axiosInstance from '../../utils/axios';
import { toast } from 'react-toastify';

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
    sold: number;
    createdAt: string;
    image: string;
}

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectTag, setSelectTag] = useState(0);
    const [randomProducts, setRandomProducts] = useState<Product[]>([]);
    const [quantity, setQuantity] = useState(1);

    const tagList = ['Thông tin sản phẩm', 'Hướng dẫn mua hàng'];
    const couponList = ['Giảm 5%', 'Giảm 6%', 'Giảm 8%', 'Giảm 10%', 'Giảm 12%'];

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get(`/products/${id}`);
                const productData = response.data.result;
                setProduct(productData);

                // Fetch random products
                const randomResponse = await axiosInstance.get('/products/products', {
                    params: {
                        page: 1,
                        pageSize: 4,
                        sortBy: 'random',
                    },
                });
                setRandomProducts(randomResponse.data.result.products);
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

    const handleAddToCart = async () => {
        try {
            if (!product) return;

            console.log('Adding to cart:', {
                product_id: product._id,
                quantity: quantity,
            });

            const response = await axiosInstance.post('/cart/add-to-cart', {
                product_id: product._id,
                quantity: quantity,
            });

            // Nếu có response từ server, coi như thành công
            if (response.data) {
                toast.success('Đã thêm sản phẩm vào giỏ hàng!');
            } else {
                toast.error('Không thể thêm sản phẩm vào giỏ hàng');
            }
        } catch (error: any) {
            console.error('Error adding to cart:', error.response?.data || error);
            // Nếu có lỗi từ server, hiển thị message lỗi
            if (error.response?.data?.message) {
                toast.error('Hãy đăng nhập để mua hàng');
            } else {
                toast.error('Có lỗi xảy ra khi thêm vào giỏ hàng');
            }
        }
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
            {/* <BreadCrumb /> */}
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
                                                <div className={styles.vendorGroup}>
                                                    <div className={styles.vendor}>
                                                        <span>Số lượng còn lại: </span>
                                                        {product.count_in_stock}
                                                    </div>   
                                                </div>
                                                <div className={styles.groupActionBtn}>
                                                    <div className={styles.topGroup}>
                                                        <div className={styles.priceBox}>
                                                            <div className={styles.priceProduct}>
                                                                {product.price.toLocaleString('vi-VN')}₫
                                                            </div>
                                                        </div>
                                                        {/* <div className={styles.coupon}>
                                                            <div className={styles.listCoupon}>
                                                                {couponList.map((item, idx) => (
                                                                    <div key={idx} className={styles.couponTag}>
                                                                        {item}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                            <div className={styles.couponText}>5 Mã Giảm Giá</div>
                                                        </div> */}
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
                                                                    <NumberProduct
                                                                        value={quantity}
                                                                        onChange={setQuantity}
                                                                    />
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
                                            <p>
                                                Chào mừng quý khách đến với
                                                <strong> hakudastore.com</strong>! Để trải nghiệm mua sắm một cách thuận
                                                tiện và nhanh chóng, xin vui lòng thực hiện theo các bước sau:
                                            </p>
                                            <h3 className={styles.step}>
                                                <strong>Bước 1: Tìm kiếm sản phẩm</strong>
                                            </h3>
                                            <ul>
                                                <li>Quý khách có thể tìm kiếm sản phẩm mong muốn bằng cách:</li>
                                                <ul>
                                                    <li>
                                                        Sử dụng
                                                        <strong> thanh tìm kiếm </strong>ở góc trên cùng của trang web.
                                                    </li>
                                                    <li>
                                                        Duyệt qua các
                                                        <strong> danh mục sản phẩm</strong> đã được phân loại rõ ràng
                                                        trên trang chủ hoặc trong mục menu.
                                                    </li>
                                                    <li>
                                                        Xem các
                                                        <strong> sản phẩm mới nhất</strong>, hoặc
                                                        <strong> sản phẩm khuyến mãi </strong>
                                                        được giới thiệu trên trang chủ.
                                                    </li>
                                                </ul>
                                            </ul>
                                            <h3 className={styles.step}>
                                                <strong>Bước 2: Xem chi tiết sản phẩm</strong>
                                            </h3>
                                            <ul>
                                                <li>
                                                    Nhấp vào sản phẩm mà quý khách quan tâm để xem chi tiết bao gồm:
                                                </li>
                                                <ul>
                                                    <li>
                                                        <strong>Mô tả sản phẩm</strong>: Các thông tin về tính năng,
                                                        kích thước, chất liệu, màu sắc...
                                                    </li>
                                                    <li>
                                                        <strong>Giá bán</strong>: Giá niêm yết của sản phẩm (đã bao gồm
                                                        hoặc chưa bao gồm thuế, phí).
                                                    </li>
                                                    <li>
                                                        <strong>Chính sách bảo hành </strong> và điều kiện đổi trả.
                                                    </li>
                                                    <li>
                                                        <strong>Số lượng sản phẩm</strong> quý khách muốn mua (có thể
                                                        điều chỉnh số lượng trước khi thêm vào giỏ hàng).
                                                    </li>
                                                </ul>
                                            </ul>
                                            <h3 className={styles.step}>
                                                <strong>Bước 3: Thêm sản phẩm vào giỏ hàng</strong>
                                            </h3>
                                            <ul>
                                                <li>
                                                    Khi đã chọn được sản phẩm ưng ý, hãy nhấp vào nút{' '}
                                                    <strong>"Thêm vào giỏ hàng"</strong>.
                                                </li>
                                                <li>
                                                    Quý khách có thể tiếp tục mua sắm các sản phẩm khác hoặc tiến hành
                                                    kiểm tra giỏ hàng để thanh toán.
                                                </li>
                                            </ul>
                                            <h3 className={styles.step}>
                                                <strong>Bước 4: Kiểm tra giỏ hàng</strong>
                                            </h3>
                                            <ul>
                                                <li>
                                                    Sau khi hoàn tất lựa chọn sản phẩm, bấm vào{' '}
                                                    <strong>"Giỏ hàng của bạn"</strong> (biểu tượng giỏ hàng ở góc trên
                                                    bên phải màn hình) để kiểm tra lại các sản phẩm.
                                                </li>
                                                <li>
                                                    Quý khách có thể thay đổi số lượng sản phẩm hoặc xóa sản phẩm không
                                                    cần thiết.
                                                </li>
                                                <li>
                                                    Nếu có <strong>mã giảm giá</strong>, vui lòng nhập mã vào ô "Mã giảm
                                                    giá" để được áp dụng ưu đãi.
                                                </li>
                                            </ul>
                                            <h3 className={styles.step}>
                                                <strong>Bước 5: Tiến hành thanh toán</strong>
                                            </h3>
                                            <ul>
                                                <li>
                                                    Khi đã sẵn sàng, nhấp vào nút <strong>"Thanh toán"</strong> để tiếp
                                                    tục.
                                                </li>
                                                <li>
                                                    Điền <strong>thông tin giao hàng</strong>: Họ tên, địa chỉ nhận
                                                    hàng, số điện thoại liên hệ.
                                                </li>
                                                <li>
                                                    Chọn <strong>phương thức thanh toán</strong>:
                                                    <ul>
                                                        <li>
                                                            <strong>Thanh toán khi nhận hàng (COD)</strong>: Quý khách
                                                            sẽ thanh toán tiền mặt khi nhận hàng.
                                                        </li>
                                                        <li>
                                                            <strong>Chuyển khoản ngân hàng</strong>: Quý khách vui lòng
                                                            chuyển khoản theo thông tin ngân hàng hiển thị trên trang
                                                            thanh toán.
                                                        </li>
                                                    </ul>
                                                </li>
                                            </ul>
                                            <h3 className={styles.step}>
                                                <strong>Bước 6: Xác nhận đơn hàng</strong>
                                            </h3>
                                            <ul>
                                                <li>
                                                    Sau khi hoàn tất nhập thông tin và chọn phương thức thanh toán, quý
                                                    khách hãy kiểm tra lại toàn bộ thông tin đơn hàng lần cuối và nhấp
                                                    vào <strong>"Đặt hàng"</strong>.
                                                </li>
                                                <li>
                                                    Hệ thống sẽ gửi cho quý khách một email hoặc tin nhắn xác nhận đơn
                                                    hàng kèm theo mã đơn hàng.
                                                </li>
                                            </ul>
                                            <h3 className={styles.step}>
                                                <strong>Bước 7: Giao hàng</strong>
                                            </h3>
                                            <ul>
                                                <li>
                                                    <strong>hakudastore.com</strong> sẽ xử lý và gửi hàng trong thời
                                                    gian sớm nhất. Thời gian giao hàng dao động từ{' '}
                                                    <strong>2-5 ngày làm việc</strong> tùy theo khu vực giao hàng.
                                                </li>
                                                <li>
                                                    Quý khách có thể theo dõi trạng thái đơn hàng thông qua đường link
                                                    trong email xác nhận hoặc liên hệ trực tiếp với chúng tôi qua{' '}
                                                    <strong>hotline</strong> để kiểm tra tiến độ giao hàng.
                                                </li>
                                            </ul>
                                            <h3 className={styles.step}>
                                                <strong>Bước 8: Nhận hàng và kiểm tra</strong>
                                            </h3>
                                            <ul>
                                                <li>
                                                    Khi nhận hàng, quý khách vui lòng kiểm tra kỹ tình trạng sản phẩm
                                                    trước khi ký nhận. Nếu có bất kỳ vấn đề nào liên quan đến sản phẩm
                                                    hoặc giao hàng, xin vui lòng liên hệ với chúng tôi qua{' '}
                                                    <strong>hotline</strong> hoặc <strong>email</strong> để được hỗ trợ.
                                                </li>
                                            </ul>
                                            <hr />
                                            <h3 className={styles.step}>
                                                <strong>Thông tin hỗ trợ khách hàng</strong>
                                            </h3>
                                            <ul>
                                                <li>
                                                    <strong>Hotline</strong>: 096 498 3498
                                                </li>
                                                <li>
                                                    <strong>Email</strong>: hakuda.store@gmail.com
                                                </li>
                                            </ul>
                                            <p>
                                                Chúng tôi luôn sẵn sàng giải đáp mọi thắc mắc và hỗ trợ quý khách trong
                                                quá trình mua sắm tại <strong>hakudastore.com</strong>.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div style={{ overflow: 'hidden', clear: 'both', marginTop: 20 }}>
                                <h2 className={styles.title}>Có thể bạn sẽ thích</h2>
                                <div style={{ display: 'flex' }}>
                                    {randomProducts.map((item) => (
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
