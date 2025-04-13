import { Mail } from "lucide-react";
import myContext from '../../context/context';
import { useContext } from 'react'
import { Layout } from '../../components/index';

const ComingSoon = () => {
    const { mode } = useContext(myContext);

    const backgroundClass =
        mode === "dark"
            ? "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white"
            : "bg-gradient-to-br from-white via-blue-50 to-purple-50 text-gray-800";

    return (
        <Layout>
            <div
                className={`${backgroundClass} bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white flex items-center justify-center min-h-screen px-6 py-20 transition-colors duration-300`}
            >
                <div className="text-center max-w-xl space-y-8 animate-fade-in">
                    {/* Logo or Icon */}
                    <div className="flex justify-center">
                        <div className="bg-blue-600 text-white p-4 rounded-full shadow-lg">
                            <Mail size={40} />
                        </div>
                    </div>

                    {/* Main Heading */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                        Something Awesome is Coming Soon 🚀
                    </h1>

                    {/* Description */}
                    <p className="text-lg sm:text-xl font-medium text-gray-700 dark:text-gray-200 leading-relaxed">
                        We’re <span className="text-blue-600 dark:text-blue-400 font-semibold">working hard</span> to launch our
                        <span className="text-purple-600 dark:text-purple-400 font-semibold"> new experience</span>.
                        <br className="hidden sm:block" />
                        Sign up below and <span className="text-green-600 dark:text-green-400 font-semibold">be the first to know</span> when we go live!
                    </p>

                    {/* Email Signup Form */}
                    <form className="flex flex-col sm:flex-row items-center justify-center gap-3">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="w-full sm:w-auto px-5 py-3 rounded-xl text-gray-800 outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
                        >
                            Notify Me
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        We respect your privacy. No spam ever.
                    </p>
                </div>
            </div >
        </Layout >
    );
};

export default ComingSoon;
