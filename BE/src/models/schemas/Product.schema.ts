import { ObjectId } from 'mongodb'

interface ProductType {
    _id?: ObjectId
    name: string
    price: number
    description: string
    category: string
    image: string
    count_in_stock: number
    sold: number
    createdAt?: Date
    updatedAt?: Date
}

class Product {
    _id?: ObjectId
    name: string
    price: number
    description: string
    category: string
    image: string
    count_in_stock: number
    sold: number
    createdAt?: Date
    updatedAt?: Date

    constructor(product: ProductType) {
        const date = new Date()
        this._id = product._id || new ObjectId()
        this.name = product.name
        this.price = Number(product.price)
        this.description = product.description
        this.category = product.category
        this.image = product.image
        this.count_in_stock = Number(product.count_in_stock)
        this.sold = Number(product.sold)
        this.createdAt = product.createdAt || date
        this.updatedAt = product.updatedAt || date
    }
}

export default Product
