import { Router } from 'express';
import { ProductController } from '../controllers/productController';

class ProductRoutes {
    public router: Router;
    private productController: ProductController;

    constructor() {
        this.router = Router();
        this.productController = new ProductController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        this.router.get('/', this.productController.getAllProducts.bind(this.productController));
        this.router.get('/categories', this.productController.getCategories.bind(this.productController));
        this.router.get('/:id', this.productController.getProductById.bind(this.productController));
    }
}

export default new ProductRoutes().router;