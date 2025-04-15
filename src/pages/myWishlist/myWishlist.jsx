import React from "react";
import { AiOutlineHeart, AiFillHeart, AiFillDelete } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { Layout } from "../../components/index.js";


const wishlistItems = [
    {
        id: 1,
        title: "Stylish Sneakers",
        price: "₹799.99",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 2,
        title: "Wireless Headphones",
        price: "₹1499.99",
        image: "https://via.placeholder.com/300x200",
    },
    {
        id: 3,
        title: "Smart Watch",
        price: "₹2199.99",
        image: "https://via.placeholder.com/300x200",
    },
];

const MyWishlist = () => {
    return (
        <Layout>

            <div className="min-h-screen bg-white dark:bg-gray-900 px-4 py-10">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">My Wishlist</h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {wishlistItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
                            >
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="w-full h-48 object-cover rounded-t-2xl"
                                />
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h3>
                                    <p className="text-gray-500 dark:text-gray-300">{item.price}</p>

                                    <div className="flex justify-between items-center mt-4">
                                        <button className="text-red-500 hover:text-red-600 transition text-xl">
                                            <AiFillDelete />
                                        </button>

                                        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full text-sm transition-all">
                                            <FiShoppingCart />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {wishlistItems.length === 0 && (
                        <div className="text-center py-20">
                            <AiOutlineHeart className="text-5xl text-gray-400 mx-auto" />
                            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
                                Your wishlist is empty!
                            </p>
                        </div>
                    )}
                </div>
            </div>

        </Layout>
    );
};

export default MyWishlist;
