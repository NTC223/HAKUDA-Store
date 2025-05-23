import React, { useRef, useState } from 'react';
import styles from './Admin.module.scss';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';

export default function Header() {
    const today = new Date();
    const dateStr = today.toLocaleDateString('vi-VN', { day: '2-digit', month: 'long', year: 'numeric' });
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { checkLoginStatus } = useAuth();
    const refreshToken = localStorage.getItem('refreshToken') || '';

    // Ẩn menu khi click ra ngoài
    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setShowMenu(false);
            }
        }
        if (showMenu) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showMenu]);

    const handleLogout = async () => {
        try {
            await axiosInstance.post('/auth/logout', { refresh_token: refreshToken });
        } catch (error) {
            // ignore error
        }
        localStorage.setItem('accessToken', '');
        localStorage.setItem('refreshToken', '');
        checkLoginStatus();
        navigate('/');
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerTitle}></div>
            <div className={styles.headerRight}>
                <span>{dateStr}</span>
                <div className={styles.avatarWrap} ref={menuRef}>
                    <div className={styles.avatar} onClick={() => setShowMenu((v) => !v)} style={{ cursor: 'pointer' }}>
                        A
                    </div>
                    {showMenu && (
                        <div className={styles.avatarMenu}>
                            <button onClick={handleLogout}>Đăng xuất</button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}
