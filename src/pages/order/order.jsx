import React, { useContext } from 'react'
import myContext from '../../context/context'
import { Layout, Loader } from "../../components/index"

export default function Order(props) {

    const userid = JSON.parse(localStorage.getItem('user')).user.uid
    const context = useContext(myContext)
    const { mode, loading, order } = context

    return (
        <Layout>
            {loading && <Loader />}
            {order.length > 0 ?
                (
                    <div className="h-full pt-10">
                        {order.filter(obj => obj.userid === userid).map((order, index) => (
                            <div key={index} className="mx-auto max-w-5xl px-6 md:flex md:space-x-6 xl:px-0">
                                <div className="rounded-lg md:w-2/3">
                                    {order.cartItems.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className="flex items-center justify-between mb-6 rounded-lg bg-white p-6 shadow-md transition-transform transform hover:scale-105"
                                            style={{
                                                backgroundColor: mode === 'dark' ? '#282c34' : 'white',
                                                color: mode === 'dark' ? 'white' : 'black',
                                            }}
                                        >
                                            {/* Product Image */}
                                            <img
                                                src={item.imageUrl}
                                                alt="product-image"
                                                className="w-24 h-24 rounded-lg shadow-md"
                                            />

                                            {/* Product Details */}
                                            <div className="flex flex-col flex-grow ml-4">
                                                <h2 className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '#1A202C' }}>
                                                    {item.title}
                                                </h2>
                                                <p className="mt-1 text-sm" style={{ color: mode === 'dark' ? '#CBD5E0' : '#4A5568' }}>
                                                    {item.description}
                                                </p>
                                                <p className="mt-1 text-lg font-semibold text-blue-500">₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Order Summary Section */}
                                <div
                                    className="rounded-md p-6 shadow-xl md:w-1/3 bg-gradient-to-br from-gray-100 to-white dark:from-gray-800 dark:to-gray-900 transition-all duration-300"
                                >
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 pb-2 border-b border-gray-300 dark:border-gray-600">
                                        🧾 Order Summary
                                    </h2>

                                    {/* Total Items */}
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-gray-700 dark:text-gray-300">📦 Total Items:</span>
                                        <span className="font-semibold text-lg text-gray-900 dark:text-white">
                                            {order.cartItems.length}
                                        </span>
                                    </div>

                                    {/* Total Price */}
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-gray-700 dark:text-gray-300">💰 Total Price:</span>
                                        <span className="font-bold text-blue-600 dark:text-blue-400 text-lg">
                                            ₹{order.cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0)}
                                        </span>
                                    </div>

                                    {/* Order Date */}
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-gray-700 dark:text-gray-300">🗓️ Order Date:</span>
                                        <span className="text-gray-800 dark:text-white font-medium">
                                            {new Date(order.date).toLocaleDateString()}
                                        </span>
                                    </div>

                                    {/* Status */}
                                    <div className="flex justify-between items-center mt-4">
                                        <span className="text-gray-700 dark:text-gray-300">🚚 Status:</span>
                                        <span
                                            className={`px-4 py-1 rounded-md text-sm font-semibold text-white shadow-sm bg-green-500 `}
                                        >
                                            Paid
                                        </span>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-[50vh]">
                        <h2 className="text-center text-2xl text-red-700 font-semibold">No Orders Found</h2>
                    </div>
                )}
        </Layout>

    )
}
