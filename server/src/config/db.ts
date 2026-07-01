import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// Using OOP: Database connection managed via a Singleton-like class structure
class Database {
    private static pool: pg.Pool;

    private constructor() {} 

    public static getPool(): pg.Pool {
        if (!Database.pool) {
            Database.pool = new pg.Pool({
                user: process.env.DB_USER,
                host: process.env.DB_HOST,
                database: process.env.DB_NAME,
                password: process.env.DB_PASSWORD,
                port: Number(process.env.DB_PORT) || 5432,
            });
            console.log("Database Pool initialized successfully.");
        }
        return Database.pool;
    }
}

export default Database;