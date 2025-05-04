import { Request, Response } from 'express'
import productService from '~/services/product.services'

export const addController = async (req: Request, res: Response) => {
    const result = await productService.addProduct(req.body)
    res.json({
        message: 'Product added successfully',
        result
    })
    return
}

//gộp
// export const getProductsController = async (req: Request, res: Response) => {
//     const page = Number(req.query.page) || 1
//     const pageSize = Number(req.query.pageSize) || 10
//     const result = await productService.getProducts(page, pageSize)
//     res.json({
//         message: 'Products fetched successfully',
//         result
//     })
//     return
// }

export const getProductByIdController = async (req: Request, res: Response) => {
    const { product_id } = req.params
    const result = await productService.getProductById(product_id)
    res.json({
        message: 'Product fetched successfully',
        result
    })
    return
}

//gộp
// export const searchProductController = async (req: Request, res: Response) => {
//     const { query } = req.body
//     const page = Number(req.query.page) || 1
//     const pageSize = Number(req.query.pageSize) || 10
//     const result = await productService.searchProduct(query, page, pageSize)
//     res.json({
//         message: 'Product fetched successfully',
//         result
//     })
//     return
// }

export const deleteProductController = async (req: Request, res: Response) => {
    const { product_id } = req.params
    const result = await productService.deleteProduct(product_id)
    res.json({
        message: 'Product deleted successfully',
        result
    })
    return
}

export const updateProductController = async (req: Request, res: Response) => {
    const { product_id } = req.params
    const result = await productService.updateProduct(product_id, req.body)
    res.json({
        message: 'Product updated successfully',
        result
    })
    return
}

export const getProductsWithSearchAndSortController = async (req: Request, res: Response) => {
    const { query = '', page = 1, pageSize = 10, sortBy = 'name', sortOrder = 'asc' } = req.query
    const result = await productService.getProductsWithSearchAndSort(
        query as string,
        Number(page),
        Number(pageSize),
        sortBy as string,
        sortOrder as 'asc' | 'desc'
    )
    res.json({
        message: 'Products fetched successfully',
        result
    })
    return
}
