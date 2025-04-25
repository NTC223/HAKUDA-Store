import React from 'react';
import styles from './Payment.module.scss';
import { Link } from 'react-router-dom';
import logo from '../../Assets/Image/logo.png';
import account from '../../Assets/Image/account.png';
import prdi from '../../Assets/Image/QuanVu/cbe01aa1-860a-476e-929e-884b9cce368d-1732682826880.webp';
import back from '../../Assets/Image/back.png';

export default function Payment() {
    return (
        <div className={styles.wrap}>
            <main className={styles.main}>
                <header className={styles.mainHeader}>
                    <div className={styles.logo}>
                        <Link to="/">
                            <img src={logo} alt="" style={{ maxWidth: 296.45 }} />
                        </Link>
                    </div>
                </header>
                <div className={styles.mainContent}>
                    <article className={styles.row}>
                        <div className={styles.col}>
                            <section className={styles.section}>
                                <div className={styles.sectionHeader}>
                                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <h2>Thông tin nhận hàng</h2>
                                        <Link to="/login">
                                            <img
                                                src={account}
                                                alt=""
                                                width={25}
                                                style={{ verticalAlign: '-25%', paddingRight: 5 }}
                                            />
                                            <span>Đăng nhập</span>
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.fieldSet}>
                                        <form action="/" acceptCharset="UTF-8">
                                            <fieldset className={styles.formGroup}>
                                                <label>
                                                    Email
                                                    <span className={styles.required}> *</span>
                                                </label>
                                                <input
                                                    type="email"
                                                    placeholder="Email"
                                                    className={styles.formControl}
                                                />
                                            </fieldset>
                                            <fieldset className={styles.formGroup}>
                                                <label>
                                                    Họ và tên
                                                    <span className={styles.required}> *</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Họ và tên"
                                                    className={styles.formControl}
                                                />
                                            </fieldset>
                                            <fieldset className={styles.formGroup}>
                                                <label>
                                                    Số điện thoại
                                                    <span className={styles.required}> *</span>
                                                </label>
                                                <input
                                                    type="phone"
                                                    placeholder="Số điện thoại"
                                                    className={styles.formControl}
                                                />
                                            </fieldset>
                                            <fieldset className={styles.formGroup}>
                                                <label>
                                                    Tỉnh thành
                                                    <span className={styles.required}> *</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Tỉnh thành"
                                                    className={styles.formControl}
                                                />
                                            </fieldset>
                                            <fieldset className={styles.formGroup}>
                                                <label>
                                                    Quận huyện
                                                    <span className={styles.required}> *</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Quận huyện"
                                                    className={styles.formControl}
                                                />
                                            </fieldset>
                                            <fieldset className={styles.formGroup}>
                                                <label>
                                                    Phường xã
                                                    <span className={styles.required}> *</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    placeholder="Phường xã"
                                                    className={styles.formControl}
                                                />
                                            </fieldset>
                                            <fieldset className={styles.formGroup} style={{ marginTop: 20 }}>
                                                <label>Ghi chú</label>
                                                <input
                                                    type="text"
                                                    placeholder="Ghi chú (tuỳ chọn)"
                                                    className={styles.formControl}
                                                />
                                            </fieldset>
                                        </form>
                                    </div>
                                </div>
                            </section>
                        </div>
                        <div className={styles.col}>
                            <section className={styles.ship}>
                                <div className={styles.sectionHeader}>
                                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <h2>Vận chuyển</h2>
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.contentBox}>
                                        <div className={styles.contentBoxRow}>
                                            <div className={styles.radioWrapper}>
                                                <div className={styles.radioInput}>
                                                    <input
                                                        type="radio"
                                                        className={styles.inputRadio}
                                                        name="shippingMethod"
                                                    />
                                                </div>
                                                <label className={styles.radioLabel}>
                                                    <span className={styles.radioLabelPrimary}>
                                                        <span>SPX - Shopee Express</span>
                                                    </span>
                                                    <span className={styles.radioLabelAccessory}>
                                                        <span>Miễn phí</span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.contentBoxRow}
                                            style={{ borderTop: '1px solid #d9d9d9' }}
                                        >
                                            <div className={styles.radioWrapper}>
                                                <div className={styles.radioInput}>
                                                    <input
                                                        type="radio"
                                                        className={styles.inputRadio}
                                                        name="shippingMethod"
                                                    />
                                                </div>
                                                <label className={styles.radioLabel}>
                                                    <span className={styles.radioLabelPrimary}>
                                                        <span>J&T Express - Chuyển phát tiêu chuẩn</span>
                                                    </span>
                                                    <span className={styles.radioLabelAccessory}>
                                                        <span>135.000₫</span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <section className={styles.buy}>
                                <div className={styles.sectionHeader}>
                                    <div style={{ display: 'flex', alignItems: 'baseline' }}>
                                        <h2>Thanh toán</h2>
                                    </div>
                                </div>
                                <div className={styles.content}>
                                    <div className={styles.contentBox}>
                                        <div className={styles.contentBoxRow}>
                                            <div className={styles.radioWrapper}>
                                                <div className={styles.radioInput}>
                                                    <input
                                                        type="radio"
                                                        className={styles.inputRadio}
                                                        name="paymentMethod"
                                                    />
                                                </div>
                                                <label className={styles.radioLabel}>
                                                    <span className={styles.radioLabelPrimary}>
                                                        <span>Thanh toán khi giao hàng (COD)</span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                        <div
                                            className={styles.contentBoxRow}
                                            style={{ borderTop: '1px solid #d9d9d9' }}
                                        >
                                            <div className={styles.radioWrapper}>
                                                <div className={styles.radioInput}>
                                                    <input
                                                        type="radio"
                                                        className={styles.inputRadio}
                                                        name="paymentMethod"
                                                    />
                                                </div>
                                                <label className={styles.radioLabel}>
                                                    <span className={styles.radioLabelPrimary}>
                                                        <span>Chuyển khoản ngân hàng</span>
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </article>
                </div>
            </main>
            <aside className={styles.sideBar}>
                <div className={styles.sideBarHeader}>
                    <h2 className={styles.sideBarTitle}>Đơn hàng (1 sản phẩm)</h2>
                </div>
                <div className={styles.sideBarContent}>
                    <div className={styles.orderSummary}>
                        <div className={styles.orderSummarySection}>
                            <div className={styles.orderSummaryContainer}>
                                <table className={styles.productTable}>
                                    <tbody>
                                        <tr className={styles.product}>
                                            <td>
                                                <div className={styles.productImage}>
                                                    <div className={styles.productImageWrapper}>
                                                        <img src={prdi} alt="" />
                                                    </div>
                                                    <span>1</span>
                                                </div>
                                            </td>
                                            <th className={styles.productDesc}>
                                                <span className={styles.productName}>
                                                    Mô hình Metal Build MNQ XH09X Xích Thố + Quan Vũ - Mô hình chính
                                                    hãng Motor Nuclear
                                                </span>
                                            </th>
                                            <td className={styles.productPrice}>15.000.000₫</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className={styles.orderSummaryContainer}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderTop: '1px solid rgba(175, 175, 175, .34)',
                                }}
                            >
                                <fieldset className={styles.formGroup} style={{ flexGrow: 1, marginBottom: 0 }}>
                                    <input
                                        type="text"
                                        placeholder="Nhập mã giảm giá"
                                        className={styles.formControl}
                                        style={{ marginBottom: 0 }}
                                    />
                                </fieldset>
                                <button type="button" className={styles.btn}>
                                    Áp dụng
                                </button>
                            </div>
                            <div
                                className={styles.orderSummaryContainer}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderTop: '1px solid rgba(175, 175, 175, .34)',
                                }}
                            >
                                <table>
                                    <tbody>
                                        <tr>
                                            <th style={{ paddingTop: 10.5, textAlign: 'left', fontWeight: 'normal' }}>
                                                Tạm tính
                                            </th>
                                            <td style={{ paddingTop: 10.5, textAlign: 'right', fontWeight: 'normal' }}>
                                                15.000.000₫
                                            </td>
                                        </tr>
                                        <tr>
                                            <th style={{ paddingTop: 10.5, textAlign: 'left', fontWeight: 'normal' }}>
                                                Phí vận chuyển
                                            </th>
                                            <td style={{ paddingTop: 10.5, textAlign: 'right', fontWeight: 'normal' }}>
                                                Miễn phí
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div
                                className={styles.orderSummaryContainer}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    borderTop: '1px solid rgba(175, 175, 175, .34)',
                                }}
                            >
                                <table>
                                    <tbody>
                                        <tr>
                                            <th
                                                style={{
                                                    paddingTop: 10.5,
                                                    textAlign: 'left',
                                                    fontWeight: 'normal',
                                                    fontSize: 20,
                                                }}
                                            >
                                                Tổng cộng
                                            </th>
                                            <td
                                                style={{
                                                    paddingTop: 10.5,
                                                    textAlign: 'right',
                                                    fontWeight: 'normal',
                                                    fontSize: 20,
                                                    color: '#2a9dcc',
                                                }}
                                            >
                                                15.000.000₫
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div
                            className={styles.orderSummarySection}
                            style={{
                                paddingTop: 20,
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}
                        >
                            <Link to="/cart">
                                <img src={back} alt="" width={15} style={{ verticalAlign: 'middle' }} />
                                <span style={{ verticalAlign: 'middle', fontSize: 14, color: '#2a9dcc' }}>
                                    Quay về giỏ hàng
                                </span>
                            </Link>
                            <button type="button" className={styles.btn} style={{ opacity: 1 }}>
                                Đặt hàng
                            </button>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    );
}
