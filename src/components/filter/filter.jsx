import React, { useContext, useState, useEffect } from 'react';
import myContext from '../../context/context';

export default function Filter() {
    const context = useContext(myContext);
    const {
        mode,
        product,
        setProduct,
        searchkey,
        filterType,
        setSearchkey,
        setFilterType,
    } = context;

    const [sortOption, setSortOption] = useState('');

    const callMe = () => {
        setSearchkey('');
        setFilterType('');
        setSortOption('');

    };

    // Sorting function
    const sortProducts = (option) => {
        let sortedProducts = [...product];

        switch (option) {
            case 'price-low':
                sortedProducts.sort((a, b) => a.price - b.price);
                break;
            case 'price-high':
                sortedProducts.sort((a, b) => b.price - a.price);
                break;
            case 'title-asc':
                sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                sortedProducts.sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                sortedProducts = [...originalProduct]; // Reset if no option
        }

        setProduct(sortedProducts);
    };

    // Apply sorting when sortOption changes
    useEffect(() => {
        if (sortOption) {
            sortProducts(sortOption);
        }
    }, [sortOption]);

    let categoryItem = [];

    return (
        <div className="container mx-auto px-4 mt-5">
            <div
                className="p-6 rounded-2xl bg-gray-100 dark:bg-gray-800 drop-shadow-lg border border-gray-300 dark:border-gray-700"
            >
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="font-semibold text-xl text-gray-800 dark:text-white">Filters</h2>
                    <button
                        onClick={callMe}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 
                text-gray-800 dark:text-white text-sm font-medium rounded-md transition-all shadow-md"
                    >
                        Reset Filters
                    </button>
                </div>

                {/* Filter Options */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">

                    {/* Category Filter */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Category
                        </label>
                        <select
                            value={filterType}
                            onChange={(e) => setFilterType(e.target.value)}
                            className="px-4 py-2 w-full rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-sm"
                        >
                            <option value="">All Categories</option>
                            {product.map((item) => {
                                if (!categoryItem.includes(item.category)) categoryItem.push(item.category);
                                return null;
                            })}
                            {categoryItem.map((el, index) => (
                                <option key={index} value={el}>
                                    {el}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Sort By */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Sort By
                        </label>
                        <select
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                            className="px-4 py-2 w-full rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-900 dark:text-white text-sm"
                        >
                            <option value="">Sort By</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="title-asc">Title: A to Z</option>
                            <option value="title-desc">Title: Z to A</option>
                        </select>
                    </div>

                </div>
            </div>
        </div>

    );
}
