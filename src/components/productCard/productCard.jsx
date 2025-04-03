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
        <section className="text-gray-600 body-font">
            {loading && <Loader />}
            <div className="container px-5 py-8 md:py-16 mx-auto">
                <div className="lg:w-1/2 w-full mb-6 lg:mb-10">
                    <h1 className="sm:text-4xl text-3xl font-extrabold title-font mb-2 text-gray-900"
                        style={{ color: mode === 'dark' ? 'white' : '' }}>
                        Our Latest Collection
                    </h1>
                    <div className="h-1 w-24 bg-blue-600 rounded"></div>
                </div>

                <div className="flex flex-wrap -m-4">
                    {product
                        .filter((obj) => obj.title.toLowerCase().includes(searchkey))
                        .filter((obj) => obj.category.includes(filterType))
                        .filter((obj) => obj.price.includes(filterPrice))
                        .slice(0, 8)
                        .map((item, index) => {
                            const { title, price, imageUrl, id } = item;
                            return (
                                <div key={index} className="p-4 md:w-1/4 drop-shadow-lg">
                                    <div className="h-full border-2 hover:shadow-xl transition-shadow duration-300 ease-in-out border-gray-200 border-opacity-60 rounded-2xl overflow-hidden"
                                        style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '' }}>

                                        <div onClick={() => navigate(`/productinfo/${id}`)}
                                            className="flex justify-center cursor-pointer group">
                                            <img className="rounded-2xl w-full h-80 p-2 transform group-hover:scale-110 transition-transform duration-300 ease-in-out"
                                                src={imageUrl}
                                                alt="product-image" />
                                        </div>

                                        <div className="p-5 border-t-2">
                                            <h2 className="tracking-widest text-xs title-font font-semibold text-gray-500 mb-1 uppercase"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                EasyBuy
                                            </h2>
                                            <h1 className="title-font text-lg font-bold text-gray-900 mb-3"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                {title}
                                            </h1>
                                            <p className="leading-relaxed mb-3 text-lg font-semibold text-blue-700"
                                                style={{ color: mode === 'dark' ? 'white' : '' }}>
                                                ₹{price}
                                            </p>
                                            <div className="flex justify-center">
                                                <button type="button"
                                                    onClick={() => addCart(item)}
                                                    className="focus:outline-none text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm w-full py-2 transition-all duration-300 ease-in-out shadow-md">
                                                    Add To Cart
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