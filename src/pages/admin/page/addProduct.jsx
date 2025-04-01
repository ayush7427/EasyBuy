import React, { useContext } from 'react'
import myContext from '../../../context/context'
import { Loader } from "../../../components/index"

function AddProduct() {

    const context = useContext(myContext)
    const { products, setProducts, addProduct, loading } = context

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-900">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-lg">
                <h1 className="text-center text-white text-3xl font-bold mb-6">🛍 Add Product</h1>

                <div className="space-y-4">
                    {/* Product Title */}
                    <div>
                        <label className="text-white block mb-1 font-semibold">Title</label>
                        <input
                            type="text"
                            onChange={(e) => setProducts({ ...products, title: e.target.value })}
                            value={products.title}
                            className="bg-gray-700 px-4 py-2 w-full rounded-lg text-white outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter product title"
                        />
                    </div>

                    {/* Subtitle */}
                    <div>
                        <label className="text-white block mb-1 font-semibold">Sub-title</label>
                        <input
                            type="text"
                            onChange={(e) => setProducts({ ...products, subTitle: e.target.value })}
                            value={products.subTitle}
                            className="bg-gray-700 px-4 py-2 w-full rounded-lg text-white outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter product sub-title"
                        />
                    </div>

                    {/* Price */}
                    <div>
                        <label className="text-white block mb-1 font-semibold">Price ($)</label>
                        <input
                            type="number"
                            onChange={(e) => setProducts({ ...products, price: e.target.value })}
                            value={products.price}
                            className="bg-gray-700 px-4 py-2 w-full rounded-lg text-white outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter product price"
                        />
                    </div>

                    {/* Image Upload */}

                    <div>
                        <label className="text-white block mb-1 font-semibold">Product Image</label>
                        <input type="text"
                            value={products.imageUrl}
                            onChange={(e) => setProducts({ ...products, imageUrl: e.target.value })}
                            name='imageurl'
                            className=' bg-gray-700 px-4 py-2 w-full rounded-lg text-white  outline-none focus:ring-2 focus:ring-yellow-400'
                            placeholder='Product imageUrl'
                        />
                        {products.imageUrl && (
                            <img src={products.imageUrl} alt="Preview" className="mt-2 w-32 h-32 rounded-lg shadow-md" />
                        )}
                    </div>

                    {/* Category */}
                    <div>
                        <label className="text-white block mb-1 font-semibold">Category</label>
                        <select
                            onChange={(e) => setProducts({ ...products, category: e.target.value })}
                            value={products.category}
                            className="bg-gray-700 px-4 py-2 w-full rounded-lg text-white outline-none focus:ring-2 focus:ring-yellow-400"
                        >
                            <option value="" disabled>Select a category</option>
                            <option value="electronics">Electronics</option>
                            <option value="fashion">Fashion</option>
                            <option value="home">Home & Living</option>
                            <option value="beauty">Beauty</option>
                        </select>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="text-white block mb-1 font-semibold">Description</label>
                        <textarea
                            cols="30"
                            rows="4"
                            onChange={(e) => setProducts({ ...products, description: e.target.value })}
                            value={products.description}
                            className="bg-gray-700 px-4 py-2 w-full rounded-lg text-white outline-none focus:ring-2 focus:ring-yellow-400"
                            placeholder="Enter product description"
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={addProduct}
                        className={`bg-yellow-500 text-black font-bold py-3 w-full rounded-lg transition-all flex items-center justify-center 
                        ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-yellow-600 hover:scale-105"}`}
                        disabled={loading}
                    >
                        {loading ? "Adding Product..." : "Add Product"}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AddProduct