import React, { useContext } from 'react'
import myContext from '../../../context/context';
import { Layout } from '../../../components/index';
import DashboardTab from './dashboardTab';
import config from '../../../config/config';
import { FaUserTie, FaBoxOpen, FaShoppingCart, FaUsers } from "react-icons/fa";

function Dashboard() {
    const context = useContext(myContext)
    const { mode, product, user, order } = context

    const admin = JSON.parse(localStorage.getItem("user"))

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap justify-center gap-6">

                        {/* Admin Card */}
                        <div className="p-4 w-full sm:w-[22%]">
                            <div className="relative border border-gray-500 bg-opacity-10 backdrop-blur-lg px-6 py-6 rounded-xl shadow-md transition-all transform hover:scale-105 hover:shadow-blue-500 bg-white dark:bg-gray-800">
                                <FaUserTie size={60} className="text-blue-500 mx-auto mb-3" />
                                <h2 className="title-font font-bold text-4xl text-black dark:text-white">
                                    {admin?.user?.email === config.adminEmail ? "1" : "-"}
                                </h2>
                                <p className="text-blue-400 font-semibold">Admin</p>
                            </div>
                        </div>

                        {/* Total Products Card */}
                        <div className="p-4 w-full sm:w-[22%]">
                            <div className="relative border border-gray-500 bg-opacity-10 backdrop-blur-lg px-6 py-6 rounded-xl shadow-md transition-all transform hover:scale-105 hover:shadow-green-500 bg-white dark:bg-gray-800">
                                <FaBoxOpen size={60} className="text-green-500 mx-auto mb-3" />
                                <h2 className="title-font font-bold text-4xl text-black dark:text-white">
                                    {product.length <= 0 ? "-" : product.length}
                                </h2>
                                <p className="text-green-400 font-semibold">Total Products</p>
                            </div>
                        </div>

                        {/* Total Orders Card */}
                        <div className="p-4 w-full sm:w-[22%]">
                            <div className="relative border border-gray-500 bg-opacity-10 backdrop-blur-lg px-6 py-6 rounded-xl shadow-md transition-all transform hover:scale-105 hover:shadow-red-500 bg-white dark:bg-gray-800">
                                <FaShoppingCart size={60} className="text-red-500 mx-auto mb-3" />
                                <h2 className="title-font font-bold text-4xl text-black dark:text-white">
                                    {order.length}
                                </h2>
                                <p className="text-red-400 font-semibold">Total Orders</p>
                            </div>
                        </div>

                        {/* Total Users Card */}
                        <div className="p-4 w-full sm:w-[22%]">
                            <div className="relative border border-gray-500 bg-opacity-10 backdrop-blur-lg px-6 py-6 rounded-xl shadow-md transition-all transform hover:scale-105 hover:shadow-purple-500 bg-white dark:bg-gray-800">
                                <FaUsers size={60} className="text-purple-500 mx-auto mb-3" />
                                <h2 className="title-font font-bold text-4xl text-black dark:text-white">
                                    {user.length <= 0 ? "-" : user.length}
                                </h2>
                                <p className="text-purple-400 font-semibold">Total Users</p>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            <DashboardTab />
        </Layout>
    )
}

export default Dashboard