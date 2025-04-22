import React, { useContext, useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import myContext from '../../../context/context';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { FaUser, FaCartPlus } from 'react-icons/fa';
import { AiFillShopping, AiFillPlusCircle, AiFillDelete } from 'react-icons/ai';
import { useNavigate, Link } from "react-router-dom"
import { Loader } from "../../../components/index"
import { FaBox, FaShoppingCart, FaUsers, FaPlus } from "react-icons/fa";

function DashboardTab() {
    const context = useContext(myContext)
    const { mode, product, edithandle, deleteProduct, user, loading, order } = context



    let [isOpen, setIsOpen] = useState(false)
    const navigate = useNavigate()

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const add = () => {
        navigate("/add-product")
    }
    return (
        <>
            <div className="container mx-auto p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
                {loading && <Loader />}

                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <Tabs defaultIndex={0}>
                        <TabList className="flex flex-wrap justify-center gap-6 mb-6 bg-gray-200 dark:bg-gray-700 p-3 rounded-lg">
                            <Tab>
                                <button className="flex items-center gap-2 px-6 py-2 text-lg font-semibold text-purple-500 border-b-2 border-purple-500 bg-white dark:bg-gray-800 hover:bg-purple-100 dark:hover:bg-purple-900 rounded-lg shadow-md transition">
                                    <FaBox className="text-2xl" /> Products
                                </button>
                            </Tab>
                            <Tab>
                                <button className="flex items-center gap-2 px-6 py-2 text-lg font-semibold text-pink-500 border-b-2 border-pink-500 bg-white dark:bg-gray-800 hover:bg-pink-100 dark:hover:bg-pink-900 rounded-lg shadow-md transition">
                                    <FaShoppingCart className="text-2xl" /> Orders
                                </button>
                            </Tab>
                            <Tab>
                                <button className="flex items-center gap-2 px-6 py-2 text-lg font-semibold text-green-500 border-b-2 border-green-500 bg-white dark:bg-gray-800 hover:bg-green-100 dark:hover:bg-green-900 rounded-lg shadow-md transition">
                                    <FaUsers className="text-2xl" /> Users
                                </button>
                            </Tab>
                        </TabList>

                        {/* Products Tab */}
                        <TabPanel>
                            <h1 className="text-center text-3xl font-semibold text-gray-800 dark:text-white">Product Details</h1>
                            <div className="flex justify-end mt-4">
                                <button onClick={add} className="flex items-center gap-2 px-5 py-2.5 text-white bg-purple-600 hover:bg-purple-700 shadow-lg rounded-lg transition">
                                    Add Product <FaPlus />
                                </button>
                            </div>
                            <div className="overflow-x-auto mt-6">
                                <table className="w-full text-sm text-left text-white bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                    <thead className="text-xs uppercase bg-gray-300 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3">S.No</th>
                                            <th className="px-6 py-3">Image</th>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">Price</th>
                                            <th className="px-6 py-3">Category</th>
                                            <th className="px-6 py-3">Date</th>
                                            <th className="px-6 py-3">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {product.map((item, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4"><img className="w-16 rounded-lg" src={item.imageUrl} alt="Product" /></td>
                                                <td className="px-6 py-4">{item.title}</td>
                                                <td className="px-6 py-4">₹{item.price}</td>
                                                <td className="px-6 py-4">{item.category}</td>
                                                <td className="px-6 py-4">{item.date}</td>
                                                <td className="px-6 py-4 flex space-x-3">
                                                    <Link to="/update-product" onClick={() => edithandle(item)} className="text-blue-500 hover:text-blue-700">Edit</Link>
                                                    <button onClick={() => deleteProduct(item)} className="text-red-500 hover:text-red-700">Delete</button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        {/* Orders Tab */}
                        <TabPanel>
                            <h1 className="text-center text-3xl font-semibold text-gray-800 dark:text-white">Order Details</h1>
                            <div className="overflow-x-auto mt-6">
                                <table className="w-full text-sm text-left text-white bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                    <thead className="text-xs uppercase bg-gray-300 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3">Payment ID</th>
                                            <th className="px-6 py-3">Image</th>
                                            <th className="px-6 py-3">Title</th>
                                            <th className="px-6 py-3">Price</th>
                                            <th className="px-6 py-3">Category</th>
                                            <th className="px-6 py-3">Customer</th>
                                            <th className="px-6 py-3">Phone</th>
                                            <th className="px-6 py-3">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.map((item, index) =>
                                            item.cartItems?.map((items, i) => (
                                                <tr key={i} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                                    <td className="px-6 py-4">{item.paymentId}</td>
                                                    <td className="px-6 py-4"><img className="w-16 rounded-lg" src={items.imageUrl} alt="Order" /></td>
                                                    <td className="px-6 py-4">{items.title}</td>
                                                    <td className="px-6 py-4">₹{items.price}</td>
                                                    <td className="px-6 py-4">{items.category}</td>
                                                    <td className="px-6 py-4">{item.addressInfo.name}</td>
                                                    <td className="px-6 py-4">{item.addressInfo.phoneNumber}</td>
                                                    <td className="px-6 py-4">{item.date}</td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>

                        {/* Users Tab */}
                        <TabPanel>
                            <h1 className="text-center text-3xl font-semibold text-gray-800 dark:text-white">User Details</h1>
                            <div className="overflow-x-auto mt-6">
                                <table className="w-full text-sm text-left text-white bg-white dark:bg-gray-800 shadow-md rounded-lg">
                                    <thead className="text-xs uppercase bg-gray-300 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-6 py-3">S.No</th>
                                            <th className="px-6 py-3">Name</th>
                                            <th className="px-6 py-3">Email</th>
                                            <th className="px-6 py-3">ID</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {user.map((el, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-100 dark:hover:bg-gray-700">
                                                <td className="px-6 py-4">{index + 1}</td>
                                                <td className="px-6 py-4">{el.name}</td>
                                                <td className="px-6 py-4">{el.email}</td>
                                                <td className="px-6 py-4">{el.id}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </TabPanel>
                    </Tabs>
                </div>
            </div>
        </>
    )
}


export default DashboardTab