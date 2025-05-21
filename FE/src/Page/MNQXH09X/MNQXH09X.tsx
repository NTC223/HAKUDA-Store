import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './MNQXH09X.module.scss';
import Navigation from '../../Components/Layout/DefaultLayout/Navigation';
import BreadCrumb from '../../Components/BreadCrumb';
import ProductItem from '../../Components/ProductItem';
import NewsItem from '../../Components/NewsItem';

import image5 from '../../Assets/Image/QuanVu/anh1.webp';
import image2 from '../../Assets/Image/QuanVu/0ef96b5f-a599-4462-8625-e9aad195cae9-1732682826880.webp';
import image3 from '../../Assets/Image/QuanVu/6e63c345-cdb3-4ee8-91c1-f5f42fb379cd-1732682826880.webp';
import image4 from '../../Assets/Image/QuanVu/963589e0-7bbf-41b8-a1fc-912ef893c728-1732682826880.webp';
import image1 from '../../Assets/Image/QuanVu/9e768d12-032a-456a-ad97-95b2a5eb69bd-1732682826880..webp';
import image6 from '../../Assets/Image/QuanVu/cbe01aa1-860a-476e-929e-884b9cce368d-1732682826880.webp';
import prevBtn from '../../Assets/Image/back.png';
import buyingGuide from '../../Assets/Image/huong-dan-mua-hang.webp';
import sv1 from '../../Assets/Image/ico_sv1.png';
import sv2 from '../../Assets/Image/ico_sv2.png';
import sv3 from '../../Assets/Image/ico_sv3.png';
import sv4 from '../../Assets/Image/ico_sv4.png';
import newsImage from '../../Assets/Image/Blog/cach-lap-rap-mo-hinh-mg-cho-nguoi-moi.webp';
import NumberProduct from '../../Components/NumberProduct';

interface productProps {
    name: string;
    price: string;
    image: string;
    path: string;
}

interface newsProps {
    name: string;
    date: string;
    image: string;
    path: string;
    des: string;
}

export default function MNQXH09X() {
    const productImageList = [image1, image2, image3, image4, image5, image6];
    const couponList = ['Giảm 5%', 'Giảm 6%', 'Giảm 8%', 'Giảm 10%', 'Giảm 12%'];

    const [index, setIndex] = useState(0);
    const handleIncIndex = () => {
        if (index === productImageList.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
    };
    const handleDescIndex = () => {
        if (index === 0) {
            setIndex(productImageList.length - 1);
        } else {
            setIndex(index - 1);
        }
    };

    const [selectTag, setSelectTag] = useState(0);
    const tagList = ['Thông tin sản phẩm', 'Hướng dẫn mua hàng'];

    const productList: productProps[] = [
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '15.000.000₫',
            image: image5,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '15.000.000₫',
            image: image5,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '15.000.000₫',
            image: image5,
            path: '/mnqxh09x',
        },
        {
            name: 'Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính hãng Motor Nuclear',
            price: '15.000.000₫',
            image: image5,
            path: '/mnqxh09x',
        },
    ];

    const newsList: newsProps[] = [
        {
            name: 'Cách Lắp Ráp Mô Hình Gundam MG Cho Người Mới: Hướng Dẫn Chi Tiết Từ A-Z',
            date: '05/03/2025',
            image: newsImage,
            path: '/news',
            des: 'Bạn vừa mua chiếc mô hình Gundam Master Grade (MG) đầu tiên và cảm thấy vừa phấn khích vừa lo lắn...',
        },
        {
            name: 'Cách Lắp Ráp Mô Hình Gundam MG Cho Người Mới: Hướng Dẫn Chi Tiết Từ A-Z',
            date: '05/03/2025',
            image: newsImage,
            path: '/news',
            des: 'Bạn vừa mua chiếc mô hình Gundam Master Grade (MG) đầu tiên và cảm thấy vừa phấn khích vừa lo lắn...',
        },
        {
            name: 'Cách Lắp Ráp Mô Hình Gundam MG Cho Người Mới: Hướng Dẫn Chi Tiết Từ A-Z',
            date: '05/03/2025',
            image: newsImage,
            path: '/news',
            des: 'Bạn vừa mua chiếc mô hình Gundam Master Grade (MG) đầu tiên và cảm thấy vừa phấn khích vừa lo lắn...',
        },
    ];

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
                                                    src={productImageList[index]}
                                                    alt=""
                                                    className={styles.productImage}
                                                />
                                            </div>
                                            <div style={{ position: 'relative' }}>
                                                <div className={styles.swiperContainer}>
                                                    {productImageList.map((item, index) => {
                                                        if (index < 5)
                                                            return (
                                                                <div
                                                                    key={index}
                                                                    className={styles.smallImage}
                                                                    style={{ width: 75.6, marginRight: 10 }}
                                                                >
                                                                    <img src={item} alt="" />
                                                                </div>
                                                            );
                                                    })}
                                                </div>
                                                <div className={styles.swiperBtnPrev} tabIndex={-1}>
                                                    <img
                                                        src={prevBtn}
                                                        alt=""
                                                        width={20}
                                                        height="auto"
                                                        onClick={handleDescIndex}
                                                    />
                                                </div>
                                                <div className={styles.swiperBtnNext} tabIndex={-1}>
                                                    <img
                                                        src={prevBtn}
                                                        alt=""
                                                        width={20}
                                                        height="auto"
                                                        onClick={handleIncIndex}
                                                        style={{ rotate: '180deg' }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.rightContainer}>
                                        <div style={{ overflow: 'hidden', clear: 'both' }}>
                                            <div className={styles.detailPro}>
                                                <h1 className={styles.title}>
                                                    Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính
                                                    hãng Motor Nuclear
                                                </h1>
                                                <div className={styles.vendorGroup}>
                                                    <div className={styles.vendor}>
                                                        <span>Thương hiệu: </span>
                                                        MOTOR NUCLEAR
                                                    </div>
                                                    <div style={{ fontSize: 14, lineHeight: 1.3, fontWeight: 400 }}>
                                                        Mã sản phẩm:
                                                        <strong style={{ fontWeight: 400 }}> MNQXH09X</strong>
                                                    </div>
                                                </div>
                                                <div className={styles.groupActionBtn}>
                                                    <div className={styles.topGroup}>
                                                        <div className={styles.priceBox}>
                                                            <div className={styles.priceProduct}>15.000.000₫</div>
                                                        </div>
                                                        <div className={styles.coupon}>
                                                            <div className={styles.listCoupon}>
                                                                {couponList.map((item, index) => {
                                                                    return (
                                                                        <div key={index} className={styles.couponTag}>
                                                                            {item}
                                                                        </div>
                                                                    );
                                                                })}
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
                                                                    {/* <NumberProduct
                                                                        value={quantity}
                                                                        onChange={setQuantity}
                                                                    /> */}
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
                                                                    <button type="button" className={styles.addToCart}>
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
                                        {tagList.map((item, index) => {
                                            return (
                                                <li
                                                    key={index}
                                                    className={`${styles.tab} ${
                                                        selectTag === index ? styles.current : ''
                                                    }`}
                                                    onClick={() => setSelectTag(index)}
                                                >
                                                    <span>{item}</span>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                    <div className={`${styles.tabContent} ${selectTag === 0 ? styles.current : ''}`}>
                                        <div className={styles.rte}>
                                            <div>
                                                <h3 className={styles.productName}>
                                                    <span>
                                                        1. Tổng quan về mô hình Metal Build MNQ XH09X Lữ Bố + Quan Vũ
                                                    </span>
                                                </h3>
                                                <p style={{ marginTop: 0 }}>
                                                    - Tên sản phẩm: Mô hình MNP XH05 Triệu Vân & Chiếu Dạ Ngọc Sư Tử
                                                    <br />
                                                    - Phân loại: Mô hình lắp sẵn
                                                    <br />
                                                    - Nhà sản xuất: MOTOR NUCLEAR
                                                    <br />
                                                    - Xuất xứ: Trung Quốc
                                                    <br />
                                                    - Năm sản xuất: 2025
                                                    <br />
                                                    - Nhà nhập khẩu và phân phối: Công ty TNHH xuất nhập khẩu Ngọc An
                                                    <br />
                                                    - Thành phần: Nhựa PS
                                                    <br />
                                                    - Tuổi sử dụng: Từ 8 tuổi trở lên
                                                    <br />
                                                    - Chiều cao khi hoàn thành: 50cm
                                                    <br />
                                                    - Là mô hình có khả năng thay đổi nhiều tư thế. Dùng để trưng bày
                                                    hoặc pose dáng chụp ảnh
                                                    <br />- Có base đi kèm
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${styles.tabContent} ${selectTag === 1 ? styles.current : ''}`}>
                                        <div className={styles.rte}>
                                            <p style={{ textAlign: 'center' }}>
                                                <img src={buyingGuide} alt="" />
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
                                <h2 className={styles.title}>Đừng bỏ lỡ</h2>
                                <div style={{ display: 'flex' }}>
                                    {productList.map((item, index) => {
                                        return <ProductItem key={index} {...item} />;
                                    })}
                                </div>
                            </div>
                            <div style={{ overflow: 'hidden', clear: 'both', marginTop: 20 }}>
                                <h2 className={styles.title}>Sản phẩm liên quan</h2>
                                <div style={{ display: 'flex' }}>
                                    {productList.map((item, index) => {
                                        return <ProductItem key={index} {...item} />;
                                    })}
                                </div>
                            </div>
                            <div style={{ overflow: 'hidden', clear: 'both', marginTop: 20 }}>
                                <h2 className={styles.title}>Đã xem gần đây</h2>
                                <div style={{ display: 'flex' }}>
                                    {productList.map((item, index) => {
                                        return <ProductItem key={index} {...item} />;
                                    })}
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
                                            <img src={sv1} alt="" width={40} height={40} />
                                        </div>
                                        <div className={styles.contentsv}>
                                            <h4>Dịch vụ đóng gói riêng</h4>
                                        </div>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <div className={styles.image}>
                                            <img src={sv2} alt="" width={40} height={40} />
                                        </div>
                                        <div className={styles.contentsv}>
                                            <h4>Tích điểm đặc quyền</h4>
                                        </div>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <div className={styles.image}>
                                            <img src={sv3} alt="" width={40} height={40} />
                                        </div>
                                        <div className={styles.contentsv}>
                                            <h4>Quà tặng bí mật</h4>
                                        </div>
                                    </div>
                                    <div className={styles.benefitItem}>
                                        <div className={styles.image}>
                                            <img src={sv4} alt="" width={40} height={40} />
                                        </div>
                                        <div className={styles.contentsv}>
                                            <h4>Mã giảm giá đặc quyền</h4>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ marginTop: 20, background: '#fff', overflow: 'hidden', clear: 'both' }}>
                                    <div className={styles.blockTitle}>
                                        <h2 className={styles.title}>Tin mới nhất</h2>
                                    </div>
                                    {newsList.map((item, index) => {
                                        return <NewsItem key={index} {...item} />;
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
