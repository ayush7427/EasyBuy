import React, { useContext, useEffect } from 'react'
import myContext from '../../context/context.jsx';
import { useSelector, useDispatch } from "react-redux"
import { addToCart } from '../../redux/cartSlice.js';
import { removeFromWishlist } from '../../redux/wishlist.js';
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import { AiOutlineHeart, AiFillDelete } from "react-icons/ai";
import { FiShoppingCart } from "react-icons/fi";
import { Layout } from "../../components/index.js";



const MyWishlist = () => {

    const context = useContext(myContext)
    const { loading, setLoading, mode } = context;

    const cartItem = useSelector((state) => state.cart)
    const wishlistItem = useSelector((state) => state.wishlist)
    // console.log(wishlistItem)


    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteItem = (item) => {
        dispatch(removeFromWishlist(item))
    }
    //  deletion item set new value in localstorage
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlistItem));
    }, [wishlistItem])

    const addCart = (item) => {
        dispatch(addToCart(item))
        toast.success('Product Added', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItem))
    }, [cartItem])

    return (
        <Layout>
            <div className="min-h-screen px-6 py-12" style={{ color: mode === 'dark' ? 'white' : '#1A202C' }}>

                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                        <h2 className="sm:text-4xl text-3xl font-extrabold mb-3 text-black dark:text-white">
                            ❤️ My Wishlist
                        </h2>
                        <div className="h-1 w-24 bg-gradient-to-r from-red-500 to-pink-500 rounded-full"></div>
                    </div>

                    {/* Wishlist Items */}
                    {wishlistItem?.length > 0 ? (
                        <div className="flex flex-wrap -m-4">
                            {wishlistItem.map((item, index) => (
                                <div key={index} className="p-4 md:w-1/4 w-full">
                                    <div
                                        className={`h-full rounded-2xl overflow-hidden border border-opacity-20 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out ${mode === 'dark'
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        {/* Product Image */}
                                        <div onClick={() => navigate(`/productinfo/${item.id}`)} className="cursor-pointer group">
                                            <img
                                                className="rounded-2xl w-full h-64 object-cover object-center p-2 transform group-hover:scale-105 transition-transform duration-300"
                                                src={item.imageUrl}
                                                alt={item.title}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4 border-t border-gray-300 dark:border-gray-700 flex flex-col justify-between h-[calc(100%-256px)]">
                                            <p className="tracking-wide text-sm uppercase text-red-500 font-medium mb-1">
                                                Wishlist
                                            </p>
                                            <h3 className="text-xl font-semibold truncate">{item.title}</h3>
                                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                                {item.description || "No description available."}
                                            </p>
                                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-3">₹{item.price}</p>

                                            {/* Buttons */}
                                            <div className="mt-4 flex justify-between items-center gap-2">
                                                <button
                                                    onClick={() => deleteItem(item)}
                                                    title="Remove from wishlist"
                                                    className="flex-1 bg-red-100 dark:bg-red-800 text-red-600 dark:text-red-300 px-3 py-2 rounded-lg text-sm hover:scale-105 transition"
                                                >
                                                    <AiFillDelete className="inline-block mr-1" /> Remove
                                                </button>
                                                <button
                                                    onClick={() => addCart(item)}
                                                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white px-3 py-2 rounded-lg text-sm shadow-md"
                                                >
                                                    <FiShoppingCart className="inline-block mr-1" /> Add to Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-24">
                            <AiOutlineHeart className="text-6xl text-gray-400 mx-auto mb-6 animate-bounce" />
                            <p className="text-xl text-gray-600 dark:text-gray-300 font-medium mb-4">
                                Your wishlist is empty.
                            </p>
                            <button
                                onClick={() => navigate("/")}
                                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full text-sm font-medium shadow-md transition"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    )}
                </div>
            </div >
        </Layout >
    );
};

export default MyWishlist;
