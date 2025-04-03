import React, { useContext, useEffect, useState } from 'react'
import { Layout, Loader } from "../../components/index"
import myContext from '../../context/context'
import { useParams, useNavigate } from "react-router-dom"
import { doc, getDoc } from "firebase/firestore"
import { toast } from 'react-toastify'
import { addToCart } from "../../redux/cartSlice"
import { fireDB } from "../../firebase/firebaseConfig"
import { useDispatch } from "react-redux"

function ProductInfo() {

    const context = useContext(myContext)
    const { loading, setLoading, mode } = context;
    const [products, setProducts] = useState('')
    const [quantity, setQuantity] = useState(0)
    const params = useParams()

    const getProductData = async () => {

        try {
            setLoading(true)
            const dataItems = await getDoc(doc(fireDB, "products", params.id))
            setProducts(dataItems.data())
            setLoading(false)
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductData()
    }, [])

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const addCart = (items) => {

        dispatch(addToCart(items))
        navigate("/cart")
    }

    return (
        <Layout>
            <section className="text-gray-600 body-font overflow-hidden">
                {loading && <Loader />}
                <div className="container px-5 py-10 mx-auto">
                    {products && (
                        <div className="lg:w-4/5 mx-auto flex flex-wrap">
                            {/* Product Image Section */}
                            <div className="lg:w-1/3 w-full overflow-hidden rounded-lg border-2 border-gray-200 shadow-lg">
                                <img
                                    alt="ecommerce"
                                    className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-300 ease-in-out"
                                    src={products.imageUrl}
                                />
                            </div>

                            {/* Product Details Section */}
                            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                                <h2
                                    className="text-sm tracking-widest uppercase"
                                    style={{ color: mode === 'dark' ? '#A0AEC0' : '#4A5568' }}
                                >
                                    {products.brand || "Brand Name"}
                                </h2>
                                <h1
                                    className="text-3xl font-semibold mb-2"
                                    style={{ color: mode === 'dark' ? '#E2E8F0' : '#1A202C' }}
                                >
                                    {products.title}
                                </h1>

                                {/* Ratings & Social Share */}
                                <div className="flex items-center mb-4">
                                    <div className="flex text-yellow-400">
                                        {Array(5)
                                            .fill()
                                            .map((_, i) => (
                                                <svg
                                                    key={i}
                                                    fill={i < 4 ? "currentColor" : "none"}
                                                    stroke="currentColor"
                                                    strokeWidth={2}
                                                    className="w-5 h-5"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                                </svg>
                                            ))}
                                    </div>
                                    <span className="ml-3" style={{ color: mode === 'dark' ? '#CBD5E0' : '#4A5568' }}>
                                        4.5 Reviews
                                    </span>
                                </div>

                                {/* Product Description */}
                                <p
                                    className="leading-relaxed border-b-2 pb-5 mb-5"
                                    style={{ color: mode === 'dark' ? '#CBD5E0' : '#2D3748' }}
                                >
                                    {products.description}
                                </p>

                                {/* Product Highlights */}
                                <ul className="mb-5 space-y-2">
                                    <li style={{ color: mode === 'dark' ? '#E2E8F0' : '#2D3748' }}>✅ High Quality Material</li>
                                    <li style={{ color: mode === 'dark' ? '#E2E8F0' : '#2D3748' }}>✅ Fast Shipping Available</li>
                                    <li style={{ color: mode === 'dark' ? '#E2E8F0' : '#2D3748' }}>✅ 7 Days Easy Return</li>
                                </ul>

                                {/* Price & Actions */}
                                <div className="flex items-center">
                                    <span
                                        className="title-font font-medium text-2xl"
                                        style={{ color: mode === 'dark' ? '#F7FAFC' : '#1A202C' }}
                                    >
                                        ₹{products.price}
                                    </span>

                                    {/* Quantity Selector */}
                                    <div className="ml-4 flex items-center border border-gray-300 rounded-lg">
                                        <button
                                            className="px-3 py-1 text-lg bg-gray-200 hover:bg-gray-300"
                                            onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
                                        >
                                            -
                                        </button>
                                        <span className="px-4 text-lg" style={{ color: mode === 'dark' ? '#CBD5E0' : '#2D3748' }}>
                                            {quantity}
                                        </span>
                                        <button
                                            className="px-3 py-1 text-lg bg-gray-200 hover:bg-gray-300"
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            +
                                        </button>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button
                                        onClick={() => addCart(products, quantity)}
                                        className="flex ml-auto text-white bg-blue-600 hover:bg-blue-700 transition-all duration-300 px-6 py-2 rounded-lg shadow-md"
                                    >
                                        Add To Cart
                                    </button>

                                    {/* Wishlist Button */}
                                    <button className="ml-4 p-2 border-2 border-gray-300 rounded-full hover:bg-red-500 hover:text-white transition-all duration-300">
                                        ❤️
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </Layout>


    )
}

export default ProductInfo