import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from "react-toastify"
import { Loader, Layout } from "../../../components/index"
import myContext from '../../../context/context'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from "../../../firebase/firebaseConfig"

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const context = useContext(myContext)
    const { loading, setLoading } = context
    const navigate = useNavigate()

    const login = async () => {
        if (email === "" || password === "") {
            return (toast.error("All fields are required", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            }))
        }
        try {
            setLoading(true)
            const result = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem("user", JSON.stringify(result))
            toast.success("Login Successful!")
            setEmail("")
            setPassword("")
            setLoading(false)
            navigate("/")
        } catch (error) {
            toast.error(error)
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 px-4">

                {/* Left Side - Image Section */}
                <div className="hidden md:block w-1/2">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/045/386/990/large_2x/illustration-of-ecommerce-vector.jpg"
                        alt="Login"
                        className="w-full h-full object-cover rounded-xl shadow-2xl"
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="bg-gray-800 bg-opacity-90 px-10 py-12 rounded-2xl shadow-2xl w-full md:w-1/3 backdrop-blur-lg">
                    {loading && <p className="text-center text-white">Loading...</p>}

                    <h1 className="text-center text-white text-3xl font-extrabold mb-6 tracking-wide">Welcome Back! 👋</h1>

                    {/* Email Input */}
                    <div className="mb-4">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-700 bg-opacity-60 px-4 py-3 w-full rounded-lg text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                            placeholder="Enter your email"
                        />
                    </div>

                    {/* Password Input */}
                    <div className="mb-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="bg-gray-700 bg-opacity-60 px-4 py-3 w-full rounded-lg text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400 transition-all"
                            placeholder="Enter your password"
                        />
                    </div>

                    {/* Login Button */}
                    <button
                        onClick={login}
                        className="bg-yellow-500 w-full text-black font-bold py-3 rounded-lg transition-all hover:bg-yellow-600 hover:scale-105 shadow-lg"
                    >
                        Login
                    </button>

                    {/* Divider */}
                    <div className="flex items-center my-4">
                        <hr className="w-full border-gray-500" />
                        <span className="text-gray-300 mx-3">OR</span>
                        <hr className="w-full border-gray-500" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex justify-center space-x-4">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                            <i className="fab fa-facebook-f"></i> Facebook
                        </button>
                        <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all">
                            <i className="fab fa-google"></i> Google
                        </button>
                    </div>

                    {/* Signup Link */}
                    <p className="text-white text-center mt-6">
                        Don't have an account?{" "}
                        <Link className="text-yellow-400 font-bold hover:underline" to={"/signup"}>
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Login