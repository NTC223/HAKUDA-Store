import { Router } from 'express'
import {
    addController,
    deleteProductController,
    getProductByIdController,
    getProductsController,
    searchProductController,
    updateProductController
} from '~/controllers/product.controller'
import { accessTokenValidator, authorizeadmin, refreshTokenValidator } from '~/middlewares/auth.middlewares'
import { addProductValidator, updateProductValidator } from '~/middlewares/product.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const productsRouter = Router()

/**
 * Description: Get all products
 * Path: /all-products
 * Method: GET
 * Query: { page: number, pageSize: number }
 */
productsRouter.get('/all-products', wrapRequestHandler(getProductsController))

/**
 * Description: Get product by id
 * Path: /:product_id
 * Method: GET
 */
productsRouter.get('/:product_id', wrapRequestHandler(getProductByIdController))

/**
 * Description: Search product
 * Path: /search
 * Method: POST
 * Body: { query: string }
 * Query: { page: number, pageSize: number }
 */
productsRouter.post('/search', wrapRequestHandler(searchProductController))

/**
 * Description: Add product (Admin)
 * Path: /add
 * Method: POST
 * Body: { name: string, price: number, description: string, image: string, category: string }
 */
productsRouter.post(
    '/add',
    accessTokenValidator,
    authorizeadmin,
    addProductValidator,
    wrapRequestHandler(addController)
)

/**
 * Description: Delete product (Admin)
 * Path: /:product_id
 * Method: DELETE
 */
productsRouter.delete('/:product_id', accessTokenValidator, authorizeadmin, wrapRequestHandler(deleteProductController))

/**
 * Description: Update product (Admin)
 * Path: /:product_id
 * Method: PUT
 * Body: { name: string, price: number, description: string, image: string, category: string }
 */
productsRouter.put(
    '/:product_id',
    accessTokenValidator,
    authorizeadmin,
    updateProductValidator,
    wrapRequestHandler(updateProductController)
)

export default productsRouter
