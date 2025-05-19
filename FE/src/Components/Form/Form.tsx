import React, { useState } from 'react';
import styles from './Form.module.scss';
import { Link } from 'react-router-dom';
import fbbtn from '../../Assets/Image/fbbtn.png';
import gpbtn from '../../Assets/Image/gpbtn.png';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

interface FormProps {
    type: 'login' | 'register';
}

export default function Form({ type }: FormProps) {
    const isLogin = type === 'login';
    const navigate = useNavigate();
    const { checkLoginStatus } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState<any>({});

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            let response;
            if (isLogin) {
                response = await axios.post('http://localhost:5000/auth/login', {
                    email,
                    password,
                });
            } else {
                response = await axios.post('http://localhost:5000/auth/register', {
                    name,
                    phone: phone.trim(),
                    email,
                    password,
                    confirmPassword,
                });
            }
            const { accessToken, refreshToken } = response.data.result;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);

            const userData = await checkLoginStatus();

            if (userData?.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (error: any) {
            setError(error.response.data.errors);
        }
    };

    return (
        <>
            <div className={styles.pageContent}>
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.formContainer}>
                            <div className={styles.group}>
                                <div className={styles.leftCol}>
                                    <div className={styles.groupLogin}>
                                        <h1 className={styles.title}>
                                            {isLogin ? 'Đăng nhập tài khoản' : 'Đăng ký tài khoản'}
                                        </h1>
                                        {isLogin ? (
                                            <>
                                                <form acceptCharset="UTF-8" noValidate onSubmit={handleSubmit}>
                                                    <p className={styles.error}>{error.email?.msg}</p>
                                                    <fieldset className={styles.formGroup}>
                                                        <label>
                                                            Email
                                                            <span className={styles.required}> *</span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder="Email"
                                                            className={styles.formControl}
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </fieldset>
                                                    <fieldset className={styles.formGroup}>
                                                        <label>
                                                            Mật khẩu
                                                            <span className={styles.required}> *</span>
                                                        </label>
                                                        <input
                                                            type="password"
                                                            autoComplete="on"
                                                            placeholder="Mật khẩu"
                                                            className={styles.formControl}
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </fieldset>
                                                    <button className={styles.loginBtn} type="submit">
                                                        Đăng nhập
                                                    </button>
                                                </form>
                                            </>
                                        ) : (
                                            <>
                                                <form acceptCharset="UTF-8" noValidate onSubmit={handleSubmit}>
                                                    <input name="FormType" type="hidden" />
                                                    <input name="utf8" type="hidden" />
                                                    <p className={styles.error}>
                                                        {error.name?.msg ||
                                                            error.phone?.msg ||
                                                            error.email?.msg ||
                                                            error.password?.msg ||
                                                            error.confirmPassword?.msg}
                                                    </p>
                                                    <fieldset className={styles.formGroup}>
                                                        <label>
                                                            Tên
                                                            <span className={styles.required}> *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Tên"
                                                            className={styles.formControl}
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                        />
                                                    </fieldset>
                                                    <fieldset className={styles.formGroup}>
                                                        <label>
                                                            Số điện thoại
                                                            <span className={styles.required}> *</span>
                                                        </label>
                                                        <input
                                                            type="text"
                                                            placeholder="Số điện thoại"
                                                            className={styles.formControl}
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                        />
                                                    </fieldset>
                                                    <fieldset className={styles.formGroup}>
                                                        <label>
                                                            Email
                                                            <span className={styles.required}> *</span>
                                                        </label>
                                                        <input
                                                            type="email"
                                                            placeholder="Email"
                                                            className={styles.formControl}
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                        />
                                                    </fieldset>
                                                    <fieldset className={styles.formGroup}>
                                                        <label>
                                                            Mật khẩu
                                                            <span className={styles.required}> *</span>
                                                        </label>
                                                        <input
                                                            type="password"
                                                            autoComplete="on"
                                                            placeholder="Mật khẩu"
                                                            className={styles.formControl}
                                                            value={password}
                                                            onChange={(e) => setPassword(e.target.value)}
                                                        />
                                                    </fieldset>
                                                    <fieldset className={styles.formGroup}>
                                                        <label>
                                                            Xác nhận mật khẩu
                                                            <span className={styles.required}> *</span>
                                                        </label>
                                                        <input
                                                            type="password"
                                                            autoComplete="on"
                                                            placeholder="xác nhận mật khẩu"
                                                            className={styles.formControl}
                                                            value={confirmPassword}
                                                            onChange={(e) => setConfirmPassword(e.target.value)}
                                                        />
                                                    </fieldset>
                                                    <button className={styles.loginBtn} type="submit">
                                                        Đăng ký
                                                    </button>
                                                </form>
                                            </>
                                        )}
                                        <div className={styles.socialLogin}>
                                            <p>
                                                <span>Hoặc đăng nhập bằng</span>
                                            </p>
                                            <a href="facebook.com">
                                                <img src={fbbtn} alt="" width={129} height={37} />
                                            </a>
                                            <a href="Google.com">
                                                <img src={gpbtn} alt="" width={129} height={37} />
                                            </a>
                                        </div>
                                        <p>
                                            Bạn quên mật khẩu bấm
                                            <Link to="/"> vào đây</Link>
                                        </p>
                                    </div>
                                </div>
                                <div className={styles.rightCol}>
                                    <h4>Quyền lợi với thành viên</h4>
                                    <div>
                                        <p>🔥Dịch vụ đóng gói riêng</p>
                                        <p>🔥Tích điểm đặc quyền</p>
                                        <p>🔥Quà tặng bí mật</p>
                                        <p>🔥Chăm sóc khách hàng 1-1</p>
                                        <p>
                                            👉Chi tiết hơn về chương trình hội viên, bạn có thể
                                            <Link to="/">
                                                <span style={{ color: '#3498db' }}>xem tại đây</span>
                                            </Link>
                                        </p>
                                    </div>
                                    <Link to={isLogin ? '/register' : '/login'} className={styles.registerBtn}>
                                        {isLogin ? 'Đăng ký' : 'Đăng nhập'}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
