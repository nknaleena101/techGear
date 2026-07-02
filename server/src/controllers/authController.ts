import { Request, Response } from 'express';
import { UserModel } from '../models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthController {
    // Handle User Registration
    public async signup(req: Request, res: Response): Promise<void> {
        try {
            const { name, email, password } = req.body;

            // Simple validation
            if (!name || !email || !password) {
                res.status(400).json({ message: 'All fields are required.' });
                return;
            }

            // Check if user already exists
            const existingUser = await UserModel.findByEmail(email);
            if (existingUser) {
                res.status(400).json({ message: 'Email already registered.' });
                return;
            }

            // Create user using our Model Class
            const newUser = await UserModel.create({ name, email, password });
            res.status(201).json({ message: 'User registered successfully.', user: newUser });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    // Handle User Login
    public async login(req: Request, res: Response): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required.' });
                return;
            }

            // Find user
            const user = await UserModel.findByEmail(email);
            if (!user) {
                res.status(401).json({ message: 'Invalid email or password.' });
                return;
            }

            // Verify password using bcrypt
            const isMatch = await bcrypt.compare(password, user.password!);
            if (!isMatch) {
                res.status(401).json({ message: 'Invalid email or password.' });
                return;
            }

            // Generate JWT Token
            const token = jwt.sign(
                { id: user.id, role: user.role },
                process.env.JWT_SECRET!,
                { expiresIn: '24h' }
            );

            res.status(200).json({
                message: 'Login successful.',
                token,
                user: { id: user.id, name: user.name, email: user.email, role: user.role }
            });
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
}