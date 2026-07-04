export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    category_id: number;
    category_name?: string;
    image_url?: string;
}

export interface Category {
    id: number;
    name: string;
}