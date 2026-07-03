import axios from 'axios';

// Singleton-like pattern for API service
class ApiService {
    private client;

    constructor() {
        this.client = axios.create({
            baseURL: 'http://localhost:5000/api',
            headers: {
                'Content-Type': 'application/json',
            }
        });
    }

    public async getProducts() {
        return await this.client.get('/products');
    }

    public async getProductById(id: string) {
        return await this.client.get(`/products/${id}`);
    }

    // Auth methods can be added here...
}

export const apiService = new ApiService();