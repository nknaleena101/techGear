import axios from 'axios';
import type { Product, Category } from '../types/index';

class ApiService {
    private client;

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:5000/api',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        // Automatically attach JWT token to headers if it exists
        this.client.interceptors.request.use((config) => {
            const token = localStorage.getItem('token');
            if (token && config.headers) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

    }

    // Product endpoints
    public async getProducts(search?: string, categoryId?: number): Promise<Product[]> {
        const params: any = {};
        if (search) params.search = search;
        if (categoryId) params.category = categoryId;
        
        const response = await this.client.get<Product[]>('/products', { params });
        return response.data;
    }

    public async getProductById(id: string): Promise<Product> {
        const response = await this.client.get<Product>(`/products/${id}`);
        return response.data;
    }

    public async getCategories(): Promise<Category[]> {
        const response = await this.client.get<Category[]>('/products/categories');
        return response.data;
    }
}

export const apiService = new ApiService();