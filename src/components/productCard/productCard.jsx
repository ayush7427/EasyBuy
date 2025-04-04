import React, { useContext, useEffect } from 'react'
import myContext from '../../context/context'
import Loader from '../loader/loader'
import { addToCart } from "../../redux/cartSlice"
import { useSelector, useDispatch } from "react-redux"
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

function ProductCard() {
    const context = useContext(myContext)
    const { mode, product, loading, searchkey, filterType, filterPrice } = context

    const cartItem = useSelector((state) => state.cart)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
        <section className="text-gray-600 body-font transition-colors duration-500 ease-in-out">
            {loading && <Loader />}

            <div className="container px-5 py-8 md:py-16 mx-auto">
                {/* Section Header */}
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1
                        className="sm:text-4xl text-3xl font-extrabold title-font mb-3"
                        style={{ color: mode === 'dark' ? 'white' : '#1A202C' }}
                    >
                        ✨ Our Latest Collection
                    </h1>
                    <div className="h-1 w-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"></div>
                </div>

                {/* Products Grid */}
                <div className="flex flex-wrap -m-4">
                    {product
                        .filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.category.includes(filterType))
                        .filter((obj) => obj.price.includes(filterPrice))
                        .slice(0, 8)
                        .map((item, index) => {
                            const { title, price, imageUrl, id } = item;
                            return (
                                <div key={index} className="p-4 md:w-1/4 w-full">
                                    <div
                                        className={`h-full rounded-2xl overflow-hidden border border-opacity-20 shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out ${mode === 'dark'
                                            ? 'bg-gray-800 border-gray-700 text-white'
                                            : 'bg-white border-gray-200 text-gray-900'
                                            }`}
                                    >
                                        {/* Product Image */}
                                        <div onClick={() => navigate(`/productinfo/${id}`)} className="cursor-pointer group">
                                            <img
                                                className="rounded-2xl w-full h-64 object-cover object-center p-2 transform group-hover:scale-105 transition-transform duration-300"
                                                src={imageUrl}
                                                alt={title}
                                            />
                                        </div>

                                        {/* Product Info */}
                                        <div className="p-4 border-t border-gray-300 dark:border-gray-700">
                                            <p className="tracking-wide text-sm uppercase text-blue-500 font-medium mb-1">
                                                EasyBuy
                                            </p>
                                            <h2 className="text-xl font-semibold mb-1 truncate">{title}</h2>
                                            <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4">₹{price}</p>

                                            {/* Add to Cart Button */}
                                            <div className="flex justify-center">
                                                <button type="button"
                                                    onClick={() => addCart(item)}
                                                    className="focus:outline-none text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2 transition-all duration-300 ease-in-out shadow-md">
                                                    🛒 Add To Cart
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
        </section>



    )
}

export default ProductCard