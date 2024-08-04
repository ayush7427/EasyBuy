import React, { useContext, useEffect } from 'react';
import { Layout, Loader } from "../../components/index"
import myContext from '../../context/context';
import { auth } from "../../firebase/firebaseConfig"

export default function ProfileSection() {

    let username = auth?.currentUser?.email ?? "user"
    
    useEffect(() => {
        username = auth.currentUser?.email
    }, [auth.currentUser])

    return (
        <Layout>

            <div className="container mx-auto p-4 pt-6 md:p-6 lg:p-12">
                <div className="flex flex-wrap -mx-4">

                    <div className="w-full md:w-1/2 xl:w-1/2 p-4">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-2xl font-bold mb-2">Welcome, <span className="text-orange-500">{username}</span>!</h2>
                            <p className="text-gray-600">Manage your account, track your orders, and more.</p>
                        </div>
                    </div>

                    <div className="w-full md:w-1/2 xl:w-1/2 p-4">
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h2 className="text-2xl font-bold mb-2">Terms and Conditions</h2>
                            <ul className="list-none mb-4">
                                <li className="flex items-center mb-2">
                                    <svg className="w-4 h-4 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5-3l2 2 4-4M9 12l2 2 4-4m5-3l2 2 4-4" />
                                    </svg>
                                    <span className="text-gray-600">By using our services, you agree to our terms and conditions.</span>
                                </li>
                                <li className="flex items-center mb-2">
                                    <svg className="w-4 h-4 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5-3l2 2 4-4M9 12l2 2 4-4m5-3l2 2 4-4" />
                                    </svg>
                                    <span className="text-gray-600">We reserve the right to modify or terminate our services at any time.</span>
                                </li>
                                <li className="flex items-center mb-2">
                                    <svg className="w-4 h-4 text-orange-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5-3l2 2 4-4M9 12l2 2 4-4m5-3l2 2 4-4" />
                                    </svg>
                                    <span className="text-gray-600">You are responsible for maintaining the confidentiality of your account.</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
