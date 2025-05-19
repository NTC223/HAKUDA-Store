export class ProductService {
    // ... existing code ...

    async getRandomProducts(limit: number) {
        try {
            const products = await Product.aggregate([
                { $sample: { size: limit } }
            ]);
            return products;
        } catch (error) {
            throw new Error('Error getting random products');
        }
    }
} 