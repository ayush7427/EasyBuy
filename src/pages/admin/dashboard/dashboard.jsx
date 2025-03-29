import React, { useContext } from 'react'
import { FaUserCircle } from "react-icons/fa";
import myContext from '../../../context/context';
import { Layout } from '../../../components/index';
import DashboardTab from './dashboardTab';
import { SiProducthunt } from "react-icons/si";
import { LiaOpencart } from "react-icons/lia";
import { RiAdminFill } from "react-icons/ri";
import config from '../../../config/config';

function Dashboard() {
    const context = useContext(myContext)
    const { mode, product, user, order } = context

    const admin = JSON.parse(localStorage.getItem("user"))

    return (
        <Layout>
            <section className="text-gray-600 body-font mt-10 mb-10">
                <div className="container px-5 mx-auto mb-10">
                    <div className="flex flex-wrap -m-4 text-center">

                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className=" border-2 hover:shadow-cyan-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                <div className="text-cyan-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <RiAdminFill size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>
                                    {admin?.user?.email === config.adminEmail ? "1" : "-"}
                                </h2>
                                <p className=" text-cyan-500  font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Admin</p>
                            </div>
                        </div>

                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className=" border-2 hover:shadow-cyan-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <div className="text-cyan-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <SiProducthunt size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>{product.length <= 0 ? "-" : product.length}</h2>
                                <p className=" text-cyan-500  font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Products</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className=" border-2 hover:shadow-cyan-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                <div className="text-cyan-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <LiaOpencart size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>{order.length}</h2>
                                <p className=" text-cyan-500  font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Orders</p>
                            </div>
                        </div>
                        <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
                            <div className=" border-2 hover:shadow-cyan-600 shadow-[inset_0_0_10px_rgba(0,0,0,0.6)] bg-gray-100 border-gray-300    px-4 py-3 rounded-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                <div className="text-cyan-500 w-12 h-12 mb-3 inline-block" viewBox="0 0 24 24">
                                    <FaUserCircle size={50} />
                                </div>
                                <h2 className="title-font font-medium text-3xl text-black fonts1" style={{ color: mode === 'dark' ? 'white' : '' }}>{user.length <= 0 ? "-" : user.length}</h2>
                                <p className=" text-cyan-500  font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total Users</p>
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