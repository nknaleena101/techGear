import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Database from './config/db';
import authRoutes from './routes/authRoutes';

dotenv.config();

class App {
    public app: Application;
    public port: number;

    constructor() {
        this.app = express();
        this.port = Number(process.env.PORT) || 5000;

        this.initializeMiddlewares();
        this.initializeDatabase();
        this.initializeRoutes();
    }

    private initializeMiddlewares(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    private initializeDatabase(): void {
        // Test database connection on startup
        Database.getPool();
    }

    private initializeRoutes(): void {
        this.app.get('/', (req: Request, res: Response) => {
            res.send('TechGear API is running smoothly.');
        });

        this.app.use('/api/auth', authRoutes);
    }

    public listen(): void {
        this.app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}

const server = new App();
server.listen();