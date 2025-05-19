import React, { useState, useEffect } from 'react';
import styles from './AddProduct.module.scss';
import axiosInstance from '../../../utils/axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface EditProductProps {
    onCancel: () => void;
    productId: string;
}

export default function EditProduct({ onCancel, productId }: EditProductProps) {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [count_in_stock, setCountInStock] = useState('');
    const [category, setCategory] = useState('');
    const [error, setError] = useState<any>({});
    const [previewUrl, setPreviewUrl] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [maker, setMaker] = useState('');
    const [currentImage, setCurrentImage] = useState('');

    useEffect(() => {
        // Lấy thông tin sản phẩm khi component được mount
        const fetchProduct = async () => {
            try {
                const response = await axiosInstance.get(`/products/${productId}`);
                const product = response.data.result;
                setName(product.name);
                setPrice(product.price.toString());
                setDescription(product.description);
                setCountInStock(product.count_in_stock.toString());
                setCategory(product.category);
                setMaker(product.maker);
                setCurrentImage(product.image);
                setPreviewUrl(product.image);
            } catch (error) {
                console.error('Error fetching product:', error);
                toast.error('Không thể tải thông tin sản phẩm');
            }
        };
        fetchProduct();
    }, [productId]);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImage(file);
            // Tạo URL để preview ảnh
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            // Xóa lỗi ảnh nếu có
            setError((prev: any) => ({ ...prev, image: undefined }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError({});

        try {
            const formData = new FormData();
            formData.append('name', name);
            formData.append('price', price);
            formData.append('description', description);
            formData.append('count_in_stock', count_in_stock);
            formData.append('category', category);
            formData.append('maker', maker);
            if (image) {
                formData.append('image', image);
            }

            await axiosInstance.put(`/products/${productId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Hiển thị thông báo thành công
            toast.success('Cập nhật sản phẩm thành công!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });

            // Đóng form sau khi hiển thị thông báo
            setTimeout(() => {
                onCancel();
            }, 2000);
        } catch (error: any) {
            console.error('Error updating product:', error);
            if (error.response?.data?.errors) {
                setError(error.response.data.errors);
            } else {
                setError({ general: { msg: 'Có lỗi xảy ra khi cập nhật sản phẩm' } });
            }
            // Hiển thị thông báo lỗi
            toast.error('Vui lòng kiểm tra lại thông tin sản phẩm!', {
                position: 'top-right',
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className={styles.content}>
            <ToastContainer />
            <div className={styles.title}>Sửa sản phẩm</div>
            <div className={styles.formContainer}>
                <form acceptCharset="UTF-8" noValidate onSubmit={handleSubmit}>
                    {error.general && <p className={styles.error}>{error.general.msg}</p>}
                    <fieldset className={styles.formGroup}>
                        <label>
                            Tên sản phẩm
                            <span className={styles.required}> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Tên sản phẩm"
                            className={styles.formControl}
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setError((prev: any) => ({ ...prev, name: undefined }));
                            }}
                        />
                        {error.name && <p className={styles.error}>{error.name.msg}</p>}
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Giá sản phẩm
                            <span className={styles.required}> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Giá sản phẩm"
                            className={styles.formControl}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                        {error.price && <p className={styles.error}>{error.price.msg}</p>}
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Số lượng sản phẩm
                            <span className={styles.required}> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Số lượng sản phẩm"
                            className={styles.formControl}
                            value={count_in_stock}
                            onChange={(e) => setCountInStock(e.target.value)}
                        />
                        {error.count_in_stock && <p className={styles.error}>{error.count_in_stock.msg}</p>}
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Loại sản phẩm
                            <span className={styles.required}> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Loại sản phẩm"
                            className={styles.formControl}
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        {error.category && <p className={styles.error}>{error.category.msg}</p>}
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Thương hiệu
                            <span className={styles.required}> *</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Thương hiệu"
                            className={styles.formControl}
                            value={maker}
                            onChange={(e) => setMaker(e.target.value)}
                        />
                        {error.maker && <p className={styles.error}>{error.maker.msg}</p>}
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Mô tả sản phẩm
                            <span className={styles.required}> *</span>
                        </label>
                        <textarea
                            className={styles.formControl}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        {error.description && <p className={styles.error}>{error.description.msg}</p>}
                    </fieldset>
                    <fieldset className={styles.formGroup}>
                        <label>
                            Ảnh sản phẩm
                            <span className={styles.required}> *</span>
                        </label>
                        <input
                            type="file"
                            className={styles.formControl}
                            onChange={handleImageChange}
                            accept="image/*"
                        />
                        {error.image && <p className={styles.error}>{error.image.msg}</p>}
                        {previewUrl && (
                            <img src={previewUrl} alt="Preview" style={{ maxWidth: '200px', marginTop: '10px' }} />
                        )}
                    </fieldset>
                    <button className={styles.Btn} style={{ marginRight: 10 }} type="submit" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang cập nhật...' : 'Cập nhật sản phẩm'}
                    </button>
                    <button className={styles.Btn} type="button" onClick={onCancel} disabled={isSubmitting}>
                        Hủy
                    </button>
                </form>
            </div>
        </div>
    );
}
