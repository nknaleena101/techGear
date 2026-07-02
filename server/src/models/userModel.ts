import Database from '../config/db';
import { IUser } from '../types/user';
import bcrypt from 'bcrypt';

export class UserModel {
    // OOP: Method to create a new user (Signup)
    public static async create(user: IUser): Promise<IUser> {
        const pool = Database.getPool();
        
        // Hash the password before saving to the database
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(user.password!, saltRounds);

        const query = `
            INSERT INTO users (name, email, password) 
            VALUES ($1, $2, $3) 
            RETURNING id, name, email, role, created_at;
        `;
        const values = [user.name, user.email, hashedPassword];

        const { rows } = await pool.query(query, values);
        return rows[0];
    }

    // OOP: Method to find a user by email (Login & Validation)
    public static async findByEmail(email: string): Promise<IUser | null> {
        const pool = Database.getPool();
        const query = 'SELECT * FROM users WHERE email = $1;';
        
        const { rows } = await pool.query(query, [email]);
        return rows.length ? rows[0] : null;
    }

    // OOP: Method to find a user by ID (for Auth Middleware)
    public static async findById(id: number): Promise<IUser | null> {
        const pool = Database.getPool();
        const query = 'SELECT id, name, email, role, created_at FROM users WHERE id = $1;';
        
        const { rows } = await pool.query(query, [id]);
        return rows.length ? rows[0] : null;
    }
}