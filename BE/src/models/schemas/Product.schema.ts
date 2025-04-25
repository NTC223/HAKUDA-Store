import { ObjectId } from 'mongodb'
interface ProductType {
    _id?: ObjectId
    name: string
    price: number
    description: string
    category: string
    brand: string
    image: string[]
    stock: number
    sold: number
    isActive: boolean
    discount: number
    createdAt?: Date
    updatedAt?: Date
}

class Product {
    _id?: ObjectId
    name: string
    price: number
    description: string
    category: string
    brand: string
    image: string[]
    stock: number
    sold: number
    isActive: boolean
    discount: number
    createdAt?: Date
    updatedAt?: Date
    constructor(product: ProductType) {
        const date = new Date()
        this._id = product._id || new ObjectId()
        this.name = product.name
        this.price = product.price
        this.description = product.description
        this.category = product.category
        this.brand = product.brand
        this.image = product.image
        this.stock = product.stock
        this.sold = product.sold
        this.isActive = product.isActive
        this.discount = product.discount
        this.createdAt = product.createdAt || date
        this.updatedAt = product.updatedAt || date
    }
}

export default Product
