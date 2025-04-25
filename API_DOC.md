# Hakuda Store API Documentation

## Base URL

```
http://localhost:5000
```

## Authentication

### Login

-   **URL**: `/auth/login`
-   **Method**: `POST`
-   **Description**: Đăng nhập người dùng
-   **Request Body**:
    ```json
    {
    	"email": "string",
    	"password": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": {
    		"accessToken": "string",
    		"refreshToken": "string"
    	}
    }
    ```

### Register

-   **URL**: `/auth/register`
-   **Method**: `POST`
-   **Description**: Đăng ký tài khoản mới
-   **Request Body**:
    ```json
    {
    	"name": "string",
    	"email": "string",
    	"password": "string",
    	"confirmPassword": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": {
    		"accessToken": "string",
    		"refreshToken": "string"
    	}
    }
    ```

### Logout

-   **URL**: `/auth/logout`
-   **Method**: `POST`
-   **Description**: Đăng xuất người dùng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"refreshToken": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Đăng xuất thành công"
    }
    ```

### Refresh Token

-   **URL**: `/auth/refresh-token`
-   **Method**: `POST`
-   **Description**: Lấy access token mới
-   **Request Body**:
    ```json
    {
    	"refreshToken": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": {
    		"accessToken": "string"
    	}
    }
    ```

## User Management

### Get User Profile

-   **URL**: `/users/:user_id`
-   **Method**: `GET`
-   **Description**: Lấy thông tin người dùng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": {
    		"id": "string",
    		"name": "string",
    		"email": "string",
    		"role": "string",
    		"address": {
    			"name": "string",
    			"phone": "string",
    			"address": "string",
    			"isDefault": "boolean"
    		}
    	}
    }
    ```

### Update Address

-   **URL**: `/users/update-address/:user_id`
-   **Method**: `PUT`
-   **Description**: Cập nhật địa chỉ người dùng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"address": {
    		"name": "string",
    		"phone": "string",
    		"address": "string",
    		"isDefault": "boolean"
    	}
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Cập nhật địa chỉ thành công"
    }
    ```

### Change Password

-   **URL**: `/users/change-password/:user_id`
-   **Method**: `PUT`
-   **Description**: Thay đổi mật khẩu
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"oldPassword": "string",
    	"newPassword": "string",
    	"confirmPassword": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Thay đổi mật khẩu thành công"
    }
    ```

### Get All Users (Admin)

-   **URL**: `/users/all-users`
-   **Method**: `GET`
-   **Description**: Lấy danh sách tất cả người dùng (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": {
    		"users": [
    			{
    				"id": "string",
    				"name": "string",
    				"email": "string",
    				"role": "string"
    			}
    		]
    	}
    }
    ```

### Update Role (Admin)

-   **URL**: `/users/update-role/:user_id`
-   **Method**: `PUT`
-   **Description**: Cập nhật quyền người dùng (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"role": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Cập nhật quyền thành công"
    }
    ```

### Delete User (Admin)

-   **URL**: `/users/delete-user/:user_id`
-   **Method**: `DELETE`
-   **Description**: Xóa người dùng (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": "Xóa người dùng thành công"
    }
    ```

## Product Management

### Get All Products

-   **URL**: `/products/all-products`
-   **Method**: `GET`
-   **Description**: Lấy danh sách tất cả sản phẩm
-   **Response**:
    ```json
    {
    	"result": {
    		"products": [
    			{
    				"id": "string",
    				"name": "string",
    				"price": "number",
    				"description": "string",
    				"image": "string",
    				"category": "string"
    			}
    		]
    	}
    }
    ```

### Get Product

-   **URL**: `/products/:product_id`
-   **Method**: `GET`
-   **Description**: Lấy thông tin chi tiết sản phẩm
-   **Response**:
    ```json
    {
    	"result": {
    		"id": "string",
    		"name": "string",
    		"price": "number",
    		"description": "string",
    		"image": "string",
    		"category": "string"
    	}
    }
    ```

### Search Products

-   **URL**: `/products/search`
-   **Method**: `POST`
-   **Description**: Tìm kiếm sản phẩm
-   **Request Body**:
    ```json
    {
    	"query": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": {
    		"products": [
    			{
    				"id": "string",
    				"name": "string",
    				"price": "number",
    				"description": "string",
    				"image": "string",
    				"category": "string"
    			}
    		]
    	}
    }
    ```

### Add Product (Admin)

-   **URL**: `/products/add`
-   **Method**: `POST`
-   **Description**: Thêm sản phẩm mới (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"name": "string",
    	"price": "number",
    	"description": "string",
    	"image": "string",
    	"category": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Thêm sản phẩm thành công"
    }
    ```

### Update Product (Admin)

-   **URL**: `/products/:product_id`
-   **Method**: `PUT`
-   **Description**: Cập nhật thông tin sản phẩm (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"name": "string",
    	"price": "number",
    	"description": "string",
    	"image": "string",
    	"category": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Cập nhật sản phẩm thành công"
    }
    ```

### Delete Product (Admin)

-   **URL**: `/products/:product_id`
-   **Method**: `DELETE`
-   **Description**: Xóa sản phẩm (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": "Xóa sản phẩm thành công"
    }
    ```

## Cart Management

### Get Cart

-   **URL**: `/cart/cart-list`
-   **Method**: `GET`
-   **Description**: Lấy thông tin giỏ hàng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": {
    		"items": [
    			{
    				"product_id": "string",
    				"name": "string",
    				"price": "number",
    				"quantity": "number",
    				"image": "string"
    			}
    		],
    		"total": "number"
    	}
    }
    ```

### Add to Cart

-   **URL**: `/cart/add-to-cart`
-   **Method**: `POST`
-   **Description**: Thêm sản phẩm vào giỏ hàng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"product_id": "string",
    	"quantity": "number"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Thêm vào giỏ hàng thành công"
    }
    ```

### Update Cart Item

-   **URL**: `/cart/update-product/:product_id`
-   **Method**: `PUT`
-   **Description**: Cập nhật số lượng sản phẩm trong giỏ hàng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"quantity": "number"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Cập nhật giỏ hàng thành công"
    }
    ```

### Delete Cart Item

-   **URL**: `/cart/delete-product/:product_id`
-   **Method**: `DELETE`
-   **Description**: Xóa sản phẩm khỏi giỏ hàng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": "Xóa sản phẩm khỏi giỏ hàng thành công"
    }
    ```

## Order Management

### Create Order

-   **URL**: `/orders/create-order`
-   **Method**: `GET`
-   **Description**: Tạo đơn hàng mới từ giỏ hàng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": {
    		"orderId": "string",
    		"total": "number",
    		"items": [
    			{
    				"product_id": "string",
    				"name": "string",
    				"price": "number",
    				"quantity": "number"
    			}
    		]
    	}
    }
    ```

### Get Orders by User ID

-   **URL**: `/orders/order-list/:user_id`
-   **Method**: `GET`
-   **Description**: Lấy danh sách đơn hàng của người dùng
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": {
    		"orders": [
    			{
    				"id": "string",
    				"status": "string",
    				"total": "number",
    				"items": [
    					{
    						"product_id": "string",
    						"name": "string",
    						"price": "number",
    						"quantity": "number"
    					}
    				],
    				"createdAt": "string"
    			}
    		]
    	}
    }
    ```

### Get All Orders (Admin)

-   **URL**: `/orders/order-list`
-   **Method**: `GET`
-   **Description**: Lấy danh sách tất cả đơn hàng (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": {
    		"orders": [
    			{
    				"id": "string",
    				"userId": "string",
    				"status": "string",
    				"total": "number",
    				"items": [
    					{
    						"product_id": "string",
    						"name": "string",
    						"price": "number",
    						"quantity": "number"
    					}
    				],
    				"createdAt": "string"
    			}
    		]
    	}
    }
    ```

### Update Order Status (Admin)

-   **URL**: `/orders/order-list/:order_id`
-   **Method**: `PUT`
-   **Description**: Cập nhật trạng thái đơn hàng (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Request Body**:
    ```json
    {
    	"status": "string"
    }
    ```
-   **Response**:
    ```json
    {
    	"result": "Cập nhật trạng thái đơn hàng thành công"
    }
    ```

### Delete Order (Admin)

-   **URL**: `/orders/delete-order/:order_id`
-   **Method**: `DELETE`
-   **Description**: Xóa đơn hàng (chỉ admin)
-   **Headers**:
    -   `Authorization`: Bearer {accessToken}
-   **Response**:
    ```json
    {
    	"result": "Xóa đơn hàng thành công"
    }
    ```

## Error Response

Tất cả các API đều có thể trả về lỗi với format sau:

```json
{
	"errors": {
		"field": {
			"msg": "string"
		}
	}
}
```

## Authentication

Tất cả các API yêu cầu xác thực cần thêm header:

```
Authorization: Bearer {accessToken}
```
