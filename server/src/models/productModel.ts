import Database from '../config/db';
import { IProduct } from '../types/product';

export class ProductModel {
    // OOP: Dynamic product fetching with filters and search
    public static async findAll(search?: string, categoryId?: number): Promise<IProduct[]> {
        const pool = Database.getPool();
        
        let query = `
            SELECT p.*, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE 1=1
        `;
        const values: any[] = [];
        let paramIndex = 1;

        // Apply Search Filter safely
        if (search) {
            query += ` AND (p.name ILIKE $${paramIndex} OR p.description ILIKE $${paramIndex})`;
            values.push(`%${search}%`);
            paramIndex++;
        }

        // Apply Category Filter safely
        if (categoryId) {
            query += ` AND p.category_id = $${paramIndex}`;
            values.push(categoryId);
            paramIndex++;
        }

        query += ' ORDER BY p.created_at DESC;';

        const { rows } = await pool.query(query, values);
        return rows;
    }

    // OOP: Fetch single product details by ID
    public static async findById(id: number): Promise<IProduct | null> {
        const pool = Database.getPool();
        const query = `
            SELECT p.*, c.name as category_name 
            FROM products p
            LEFT JOIN categories c ON p.category_id = c.id
            WHERE p.id = $1;
        `;
        
        const { rows } = await pool.query(query, [id]);
        return rows.length ? rows[0] : null;
    }

    // Bonus Method: Fetch all categories for frontend filters
    public static async findAllCategories(): Promise<{ id: number; name: string }[]> {
        const pool = Database.getPool();
        const query = 'SELECT * FROM categories ORDER BY name ASC;';
        const { rows } = await pool.query(query);
        return rows;
    }
}