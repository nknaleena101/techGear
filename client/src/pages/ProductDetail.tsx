import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import type { Product } from '../types/index';

export const ProductDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return;
            try {
                const data = await apiService.getProductById(id);
                setProduct(data);
            } catch (err) {
                console.error("Product not found", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <div className="text-center py-10">Loading gear details...</div>;
    if (!product) return <div className="text-center py-10 text-red-500">Product not found.</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 bg-white shadow-md rounded-lg mt-6">
            <button onClick={() => navigate(-1)} className="text-blue-600 hover:underline mb-6 inline-block font-medium">&larr; Back to Shop</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <img 
                    src={product.image_url || 'https://via.placeholder.com/500'} 
                    alt={product.name} 
                    className="w-full h-80 object-cover rounded-lg shadow"
                />
                <div className="flex flex-col justify-between">
                    <div>
                        <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">{product.category_name}</span>
                        <h1 className="text-3xl font-bold mt-2 text-gray-900">{product.name}</h1>
                        <p className="text-2xl font-extrabold text-blue-600 mt-2">${Number(product.price).toFixed(2)}</p>
                        <p className="text-gray-600 mt-4 leading-relaxed">{product.description}</p>
                    </div>
                    <div className="mt-6 border-t pt-4">
                        <p className={`text-sm font-medium ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                            {product.stock_quantity > 0 ? `In Stock: ${product.stock_quantity} units available` : 'Out of Stock'}
                        </p>
                        <button 
                            disabled={product.stock_quantity <= 0}
                            className={`w-full mt-4 text-white font-bold py-3 px-6 rounded-lg transition-colors ${product.stock_quantity > 0 ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}
                        >
                            {product.stock_quantity > 0 ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};