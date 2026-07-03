export interface IProduct {
    id?: number;
    name: string;
    description: string;
    price: number;
    stock_quantity: number;
    category_id: number;
    image_url?: string;
    category_name?: string; 
    created_at?: Date;
}