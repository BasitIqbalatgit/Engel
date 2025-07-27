// Updated MenuPage with TanStack Query
"use client";

import React, { useState } from 'react';
import { Product } from '@/types/Product';
import { useProducts } from '@/lib/hooks/useProducts';
import Link from 'next/link';

const MenuPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'price-low' | 'price-high' | 'newest'>('newest');
    const [filterBy, setFilterBy] = useState<'all' | 'in-stock' | 'out-of-stock'>('all');
    const [cart, setCart] = useState<{ [key: string]: number }>({});
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const { data: productsResponse, isLoading, error, refetch } = useProducts({
        visibleOnly: true,
        search: searchTerm || undefined,
        sortBy: sortBy,
        filterBy: filterBy
    });

    const products = productsResponse?.data || [];

    const addToCart = (productId: string) => {
        setCart(prev => ({
            ...prev,
            [productId]: (prev[productId] || 0) + 1
        }));
    };

    const removeFromCart = (productId: string) => {
        setCart(prev => {
            const newCart = { ...prev };
            if (newCart[productId] > 1) {
                newCart[productId] -= 1;
            } else {
                delete newCart[productId];
            }
            return newCart;
        });
    };

    const getTotalCartItems = () => {
        return Object.values(cart).reduce((sum, count) => sum + count, 0);
    };

    const getTotalPrice = () => {
        return Object.entries(cart).reduce((total, [productId, count]) => {
            const product = products.find(p => p.id === productId);
            return total + (product ? product.price * count : 0);
        }, 0);
    };

    const clearFilters = () => {
        setSearchTerm('');
        setFilterBy('all');
        setSortBy('newest');
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-600 border-t-transparent mx-auto"></div>
                    <p className="mt-6 text-xl text-gray-600 font-medium">Loading our amazing products...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
                <div className="text-center">
                    <div className="text-8xl mb-6">❌</div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Oops! Something went wrong</h2>
                    <p className="text-gray-600 text-lg mb-8">Failed to load products</p>
                    <button
                        onClick={() => refetch()}
                        className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors font-semibold"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Header */}
            <header className="bg-white/95 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center space-x-4">
                            <Link href="/customer" className="flex items-center text-blue-600 hover:text-blue-700 transition-colors">
                                <svg className="h-6 w-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                                Back to Home
                            </Link>
                            <div className="h-8 w-px bg-gray-300"></div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                🛍️ Product Menu
                            </h1>
                        </div>

                        {/* Cart */}
                        <div className="relative">
                            <button className="flex items-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m1.6 8L5 3H3m4 10v6a1 1 0 001 1h10a1 1 0 001-1v-6M9 19a1 1 0 102 0 1 1 0 00-2 0zm8 0a1 1 0 102 0 1 1 0 00-2 0z" />
                                </svg>
                                Cart ({getTotalCartItems()})
                                {getTotalCartItems() > 0 && (
                                    <span className="ml-2 text-sm font-semibold">${getTotalPrice().toFixed(2)}</span>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Rest of the MenuPage JSX remains the same... */}
            {/* Products Display and Footer sections continue here */}


            {/* Hero Banner */}
            <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white py-16 overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80"></div>

                {/* Animated Background Elements */}
                <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-bounce"></div>
                <div className="absolute top-32 right-20 w-16 h-16 bg-white/10 rounded-full animate-pulse"></div>
                <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white/10 rounded-full animate-bounce delay-300"></div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
                        Explore Our Complete Collection
                    </h2>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
                        Discover amazing products crafted with love and attention to detail
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full text-sm font-medium flex items-center">
                            <span className="mr-2">🎯</span> Curated Selection
                        </span>
                        <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full text-sm font-medium flex items-center">
                            <span className="mr-2">⚡</span> Fast Delivery
                        </span>
                        <span className="bg-white/20 backdrop-blur px-6 py-3 rounded-full text-sm font-medium flex items-center">
                            <span className="mr-2">💎</span> Premium Quality
                        </span>
                    </div>
                </div>
            </section>

            {/* Filters and Controls */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
                    <div className="flex flex-col lg:flex-row gap-6 items-center">

                        {/* Search Bar */}
                        <div className="flex-1 max-w-md">
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                                />
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center">
                                    <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">Sort by:</label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="newest">Newest</option>
                                <option value="name">Name A-Z</option>
                                <option value="price-low">Price: Low to High</option>
                                <option value="price-high">Price: High to Low</option>
                            </select>
                        </div>

                        {/* Filter Dropdown */}
                        <div className="flex items-center space-x-2">
                            <label className="text-sm font-medium text-gray-700">Filter:</label>
                            <select
                                value={filterBy}
                                onChange={(e) => setFilterBy(e.target.value as any)}
                                className="border-2 border-gray-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="all">All Products</option>
                                <option value="in-stock">In Stock</option>
                                <option value="out-of-stock">Out of Stock</option>
                            </select>
                        </div>

                        {/* View Mode Toggle */}
                        <div className="flex items-center bg-gray-100 rounded-xl p-1">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid'
                                        ? 'bg-white text-blue-600 shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                </svg>
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list'
                                        ? 'bg-white text-blue-600 shadow-md'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4 text-center">
                        <p className="text-gray-600">
                            Showing <span className="font-semibold text-blue-600">{products.length}</span> products
                        </p>
                    </div>
                </div>
            </section>

            {/* Products Display */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
                {products.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="text-8xl mb-6">🔍</div>
                        <h4 className="text-2xl font-bold text-gray-900 mb-4">No products found</h4>
                        <p className="text-gray-600 text-lg mb-8">Try adjusting your search or filter criteria</p>
                        <button
                            onClick={clearFilters}
                            className="bg-blue-600 text-white px-8 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    <div className={viewMode === 'grid'
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
                        : "space-y-6"
                    }>
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`group animate-fade-in ${viewMode === 'grid'
                                        ? "bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
                                        : "bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden flex items-center p-6"
                                    }`}
                                style={{
                                    animationDelay: `${index * 100}ms`
                                }}
                            >
                                {viewMode === 'grid' ? (
                                    <>
                                        <div className="relative overflow-hidden">
                                            <img
                                                src={product.image || '/placeholder-image.jpg'}
                                                alt={product.name}
                                                className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300?text=No+Image'
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur ${product.status === 'In Stock'
                                                    ? 'bg-green-500/80 text-white'
                                                    : 'bg-red-500/80 text-white'
                                                }`}>
                                                {product.status}
                                            </div>
                                        </div>

                                        <div className="p-6">
                                            <h4 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                                                {product.name}
                                            </h4>
                                            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                                {product.excerpt}
                                            </p>

                                            <div className="flex items-center justify-between">
                                                <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                                    ${product.price.toFixed(2)}
                                                </span>

                                                <div className="flex items-center space-x-2">
                                                    {cart[product.id] > 0 && (
                                                        <>
                                                            <button
                                                                onClick={() => removeFromCart(product.id)}
                                                                className="w-9 h-9 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                                                            >
                                                                −
                                                            </button>
                                                            <span className="w-8 text-center font-bold text-lg">
                                                                {cart[product.id]}
                                                            </span>
                                                        </>
                                                    )}

                                                    <button
                                                        onClick={() => addToCart(product.id)}
                                                        disabled={product.status === 'Out of Stock'}
                                                        className={`px-4 py-2 rounded-full font-semibold transition-all duration-300 ${product.status === 'Out of Stock'
                                                                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                                                            }`}
                                                    >
                                                        {product.status === 'Out of Stock' ? 'Unavailable' : cart[product.id] > 0 ? '+' : 'Add to Cart'}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="flex-shrink-0">
                                            <img
                                                src={product.image || '/placeholder-image.jpg'}
                                                alt={product.name}
                                                className="w-32 h-32 object-cover rounded-xl"
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/200x200?text=No+Image'
                                                }}
                                            />
                                        </div>

                                        <div className="flex-1 ml-6">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="text-2xl font-bold text-gray-900 mb-2">
                                                        {product.name}
                                                    </h4>
                                                    <p className="text-gray-600 mb-4 line-clamp-2">
                                                        {product.excerpt}
                                                    </p>
                                                    <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold ${product.status === 'In Stock'
                                                            ? 'bg-green-100 text-green-800'
                                                            : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {product.status}
                                                    </div>
                                                </div>

                                                <div className="text-right ml-6">
                                                    <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                                                        ${product.price.toFixed(2)}
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        {cart[product.id] > 0 && (
                                                            <>
                                                                <button
                                                                    onClick={() => removeFromCart(product.id)}
                                                                    className="w-9 h-9 bg-gray-200 text-gray-700 rounded-full flex items-center justify-center hover:bg-red-500 hover:text-white transition-all duration-300"
                                                                >
                                                                    −
                                                                </button>
                                                                <span className="w-8 text-center font-bold text-lg">
                                                                    {cart[product.id]}
                                                                </span>
                                                            </>
                                                        )}

                                                        <button
                                                            onClick={() => addToCart(product.id)}
                                                            disabled={product.status === 'Out of Stock'}
                                                            className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${product.status === 'Out of Stock'
                                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                                    : 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 shadow-lg hover:shadow-xl'
                                                                }`}
                                                        >
                                                            {product.status === 'Out of Stock' ? 'Unavailable' : cart[product.id] > 0 ? '+' : 'Add to Cart'}
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </section>

            {/* Back to Top Button */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 transition-all duration-300 z-40"
            >
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                </svg>
            </button>
        </div>
    );
};

export default MenuPage;
