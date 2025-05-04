import { Router } from 'express'
import {
    addController,
    deleteProductController,
    getProductByIdController,
    getProductsWithSearchAndSortController,
    updateProductController
} from '~/controllers/product.controller'
import { accessTokenValidator, authorizeadmin, refreshTokenValidator } from '~/middlewares/auth.middlewares'
import { addProductValidator, updateProductValidator } from '~/middlewares/product.middlewares'
import { wrapRequestHandler } from '~/utils/handlers'

const productsRouter = Router()

/**
 * Description: Get all products with search and sort
 * Path: /products
 * Method: GET
 * Query: {
 *   query: string (optional),
 *   page: number (optional, default: 1),
 *   pageSize: number (optional, default: 10),
 *   sortBy: string (optional, default: 'name'),
 *   sortOrder: 'asc' | 'desc' (optional, default: 'asc')
 * }
 */
productsRouter.get('/products', wrapRequestHandler(getProductsWithSearchAndSortController))

/**
 * Description: Get product by id
 * Path: /:product_id
 * Method: GET
 */
productsRouter.get('/:product_id', wrapRequestHandler(getProductByIdController))

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
