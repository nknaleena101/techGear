import React, { useEffect, useState } from 'react';
import { apiService } from '../services/apiService';
import type { Product, Category } from '../types/index';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<number | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const cats = await apiService.getCategories();
                setCategories(cats);
            } catch (err) {
                console.error("Failed to load categories", err);
            }
        };
        fetchFilters();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                const data = await apiService.getProducts(search, selectedCategory);
                setProducts(data);
            } catch (err) {
                console.error("Failed to load products", err);
            } finally {
                setLoading(false);
            }
        };

        const delayDebounceFn = setTimeout(() => {
            fetchProducts();
        }, 300); // Debounce to prevent spamming server on every keystroke

        return () => clearTimeout(delayDebounceFn);
    }, [search, selectedCategory]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-6">
            {/* Search and Filters Section */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-center">
                <input 
                    type="text" 
                    placeholder="Search premium tech gear..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
                    <button 
                        onClick={() => setSelectedCategory(undefined)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${!selectedCategory ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                    >
                        All Gear
                    </button>
                    {categories.map(cat => (
                        <button 
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedCategory === cat.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            {loading ? (
                <div className="text-center py-10 font-medium text-gray-500">Loading awesome products...</div>
            ) : products.length === 0 ? (
                <div className="text-center py-10 font-medium text-gray-500">No products found matching your criteria.</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};