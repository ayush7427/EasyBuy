import React, { useContext } from "react";
import { useParams } from "react-router";
import { Layout, Loader } from "../../components/index";
import myContext from "../../context/context";
import { useNavigate } from "react-router-dom"
import { addToCart } from "../../redux/cartSlice"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'

const CategoryPage = () => {
    const { categoryname } = useParams();

    const context = useContext(myContext)
    const { product, loading, mode } = context

    const navigate = useNavigate();
    const dispatch = useDispatch()

    // filter product 
    const filterProduct = product.filter((obj) => obj.category.includes(categoryname.charAt(0).toUpperCase() + categoryname.slice(1)));

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

    return (
        <Layout>
            <div className="mt-12">
                {/* Section Heading */}
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold capitalize" style={{ color: mode === 'dark' ? 'white' : '#4B5563' }}>
                        🛒 {categoryname}
                    </h1>
                    <div className="mx-auto mt-2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"></div>
                </div>

                {/* Loader */}
                {loading ? (
                    <div className="flex justify-center">
                        <Loader />
                    </div>
                ) : (
                    <section className="text-gray-600 body-font transition-colors duration-300 ease-in-out">
                        <div className="container px-5 py-10 mx-auto">
                            {filterProduct.length > 0 ? (
                                <div className="flex flex-wrap -m-4 justify-center">
                                    {filterProduct.map((item, index) => {
                                        const { id, title, price, imageUrl } = item;
                                        return (
                                            <div key={index} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                                                <div
                                                    className={`h-full rounded-2xl overflow-hidden shadow-md border border-opacity-20 transition duration-300 hover:shadow-xl cursor-pointer ${mode === 'dark'
                                                        ? 'bg-gray-800 border-gray-700 text-white'
                                                        : 'bg-white border-gray-200 text-gray-900'
                                                        }`}
                                                >
                                                    {/* Image */}
                                                    <div onClick={() => navigate(`/productinfo/${id}`)} className="group">
                                                        <img
                                                            className="w-full h-64 object-cover object-center transition-transform duration-300 transform group-hover:scale-105 rounded-t-2xl"
                                                            src={imageUrl}
                                                            alt={title}
                                                        />
                                                    </div>

                                                    {/* Info */}
                                                    <div className="p-5 border-t border-gray-300 dark:border-gray-700">
                                                        <p className="text-xs uppercase font-semibold tracking-wider text-blue-500 mb-1">
                                                            EasyBuy
                                                        </p>
                                                        <h2 className="text-lg font-semibold mb-1 truncate">{title}</h2>
                                                        <p className="text-base font-bold text-blue-600 dark:text-blue-400 mb-4">
                                                            ₹{price}
                                                        </p>

                                                        {/* Button */}
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white text-sm font-semibold py-2 rounded-lg shadow-md transition-all"
                                                        >
                                                            🛒 Add to Cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="flex flex-col items-center justify-center mt-16 text-center">
                                    <img
                                        className="w-20 h-20 mb-4 opacity-70"
                                        src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                        alt="Not found"
                                    />
                                    <h2 className="text-lg font-medium text-gray-700 dark:text-gray-300">
                                        No <span className="capitalize">{categoryname}</span> products found
                                    </h2>
                                </div>
                            )}
                        </div>
                    </section>
                )}
            </div>

        </Layout>
    );

}

export default CategoryPage;