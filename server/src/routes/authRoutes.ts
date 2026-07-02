import { Router } from 'express';
import { AuthController } from '../controllers/authController';

class AuthRoutes {
    public router: Router;
    private authController: AuthController;

    constructor() {
        this.router = Router();
        this.authController = new AuthController();
        this.initializeRoutes();
    }

    private initializeRoutes(): void {
        // Bind context so 'this' works correctly inside controller methods
        this.router.post('/signup', this.authController.signup.bind(this.authController));
        this.router.post('/login', this.authController.login.bind(this.authController));
    }
}

export default new AuthRoutes().router;