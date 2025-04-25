import React from 'react';
import styles from './Footer.module.scss';
import { Link } from 'react-router-dom';
import facebook from '../../../../Assets/Image/LienHe/facebook.jpg';
import instagram from '../../../../Assets/Image/LienHe/instagram.png';
import youtube from '../../../../Assets/Image/LienHe/youtube.png';
import tiltok from '../../../../Assets/Image/LienHe/tiktok.png';
import logoBct from '../../../../Assets/Image/logo_bct.png';
import pin from '../../../../Assets/Image/pin.png';
import phone from '../../../../Assets/Image/phone-call.png';
import mail from '../../../../Assets/Image/email.png';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.footerMedia}>
                <div className={styles.mediaWrap}>
                    <span className={styles.mediaTitle}>Theo dõi HAKUDA Store tại</span>
                    <a href="https://www.facebook.com/hakudahobby" className={styles.mediaLink}>
                        <img src={facebook} alt="" />
                    </a>
                    <a href="https://www.facebook.com/hakudahobby" className={styles.mediaLink}>
                        <img src={instagram} alt="" />
                    </a>
                    <a href="https://www.youtube.com/@hakudastore" className={styles.mediaLink}>
                        <img src={youtube} alt="" />
                    </a>
                    <a href="https://www.tiktok.com/@hakudastore" className={styles.mediaLink}>
                        <img src={tiltok} alt="" />
                    </a>
                </div>
            </div>
            <div className={styles.footerContainer}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.item}>
                            <h4>Về chúng tôi</h4>
                            <div className={styles.descript}>
                                HỘ KINH DOANH HAKUDA GPDK số 01A8034114 cấp ngày 23/03/2023 do UBND quận Ba Đình thành
                                phố Hà Nội. MST: 8429736828-001
                            </div>
                            <a href="http://online.gov.vn/Home/WebDetails/124499?AspxAutoDetectCookieSupport=1">
                                <img src={logoBct} alt="" style={{ maxWidth: 175 }} />
                            </a>
                        </div>
                        <div className={styles.item}>
                            <h4>Hướng dẫn</h4>
                            <ul>
                                <li>
                                    <Link to="/">Hướng dẫn đặt đơn Pre-Order</Link>
                                </li>
                                <li>
                                    <Link to="/">Hướng dẫn mua hàng</Link>
                                </li>
                                <li>
                                    <Link to="/">Hướng dẫn thanh toán</Link>
                                </li>
                                <li>
                                    <Link to="/">Câu hỏi thường gặp - FAQs</Link>
                                </li>
                                <li>
                                    <Link to="/">Trải nghiệm mua sắm 100% hài lòng</Link>
                                </li>
                                <li>
                                    <Link to="/">Ưu đãi dành riêng cho hội viên</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.item}>
                            <h4>Chính sách</h4>
                            <ul>
                                <li>
                                    <Link to="/"> Chính sách chung</Link>
                                </li>
                                <li>
                                    <Link to="/"> Chính sách bảo hành - đổi trả</Link>
                                </li>
                                <li>
                                    <Link to="/"> Chính sách Vận chuyển</Link>
                                </li>
                                <li>
                                    <Link to="/"> Chính sách kiểm hàng</Link>
                                </li>
                                <li>
                                    <Link to="/"> Chính sách bảo mật thông tin</Link>
                                </li>
                            </ul>
                        </div>
                        <div className={styles.item}>
                            <h4>Liên hệ</h4>
                            <p>Nếu bạn cần hỗ trợ hoặc có bất kỳ thắc mắc gì, hãy liên hệ ngay với HAKUDA nhé!</p>
                            <div className={styles.ico}>
                                <img src={pin} alt="" />
                                <p>Số 8 ngõ 118 Đào Tấn, Phường Cống Vị, Quận Ba Đình, Hà Nội, Hà Nội</p>
                            </div>
                            <div className={styles.ico}>
                                <img src={phone} alt="" />
                                <p>096 498 3498</p>
                            </div>
                            <div className={styles.ico}>
                                <img src={mail} alt="" />
                                <p>Hakuda.store@gmail.com</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
