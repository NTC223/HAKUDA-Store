import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Thêm interceptor cho request
axiosInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken');
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

// Thêm interceptor cho response
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 và chưa thử refresh token
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:5000/auth/refresh-token', {
                    refresh_token: refreshToken,
                });

                const { accessToken } = response.data.result;
                localStorage.setItem('accessToken', accessToken);

                // Thử lại request ban đầu với token mới
                originalRequest.headers.Authorization = `Bearer ${accessToken}`;
                return axiosInstance(originalRequest);
            } catch (refreshError) {
                // Nếu refresh token cũng lỗi, xóa token và chuyển hướng về trang đăng nhập
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);

export default axiosInstance;
