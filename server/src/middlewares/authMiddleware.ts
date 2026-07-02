import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// Extend Express Request interface to include user data safely
export interface AuthRequest extends Request {
    user?: {
        id: number;
        role: string;
    };
}

export class AuthMiddleware {
    // Verify if JWT token is present and valid
    public static verifyToken(req: AuthRequest, res: Response, next: NextFunction): void {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1]; // Format: Bearer <token>

        if (!token) {
            res.status(401).json({ message: 'Access denied. No token provided.' });
            return;
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: number; role: string };
            req.user = decoded; // Attach decoded info to request object
            next();
        } catch (error) {
            res.status(403).json({ message: 'Invalid or expired token.' });
        }
    }

    // Role Check: Verify if user is an Admin
    public static isAdmin(req: AuthRequest, res: Response, next: NextFunction): void {
        if (!req.user || req.user.role !== 'admin') {
            res.status(403).json({ message: 'Access denied. Admins only.' });
            return;
        }
        next();
    }
}