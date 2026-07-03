import { Request, Response } from 'express';
import { ProductModel } from '../models/productModel';

export class ProductController {
    // Get all products with optional filters
    public async getAllProducts(req: Request, res: Response): Promise<void> {
        try {
            const search = req.query.search as string;
            const categoryId = req.query.category ? Number(req.query.category) : undefined;

            const products = await ProductModel.findAll(search, categoryId);
            res.status(200).json(products);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get product details by ID
    public async getProductById(req: Request, res: Response): Promise<void> {
        try {
            const productId = Number(req.params.id);
            if (isNaN(productId)) {
                res.status(400).json({ message: 'Invalid product ID.' });
                return;
            }

            const product = await ProductModel.findById(productId);
            if (!product) {
                res.status(404).json({ message: 'Product not found.' });
                return;
            }

            res.status(200).json(product);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Get list of all categories
    public async getCategories(req: Request, res: Response): Promise<void> {
        try {
            const categories = await ProductModel.findAllCategories();
            res.status(200).json(categories);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}