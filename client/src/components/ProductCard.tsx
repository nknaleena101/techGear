import React from 'react';
import { Link } from 'react-router-dom';
import type { Product } from '../types/index';

interface ProductCardProps {
    product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between p-4">
            <img 
                src={product.image_url || 'https://via.placeholder.com/300'} 
                alt={product.name} 
                className="w-full h-48 object-cover mb-4 rounded"
            />
            <div>
                <span className="text-xs font-semibold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded">
                    {product.category_name || 'Tech'}
                </span>
                <h3 className="text-lg font-bold mt-2 text-gray-800 line-clamp-1">{product.name}</h3>
                <p className="text-gray-600 text-sm mt-1 line-clamp-2">{product.description}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
                <span className="text-xl font-extrabold text-blue-600">${Number(product.price).toFixed(2)}</span>
                <Link 
                    to={`/products/${product.id}`} 
                    className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors"
                >
                    View Details
                </Link>
            </div>
        </div>
    );
};