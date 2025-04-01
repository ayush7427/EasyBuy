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

    const regexExpression = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

    const login = async () => {
        // validation
        if (email === "" || password === "") {
            return (toast.error("All fields are required", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            }))
        }
        // email validation
        if (!regexExpression.test(email)) {
            return (toast.error("Invalid email format."), {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        try {
            console.log(typeof email);
            setLoading(true)
            const result = await signInWithEmailAndPassword(auth, email, password)
            localStorage.setItem("user", JSON.stringify(result))
            toast.success("Login Successful!")
            setEmail("")
            setPassword("")
            setLoading(false)
            navigate("/")
        } catch (error) {
            toast.error(error.message)
            setLoading(false)
        }
    }

    return (
        <Layout>

            <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-6">
                {/* Left Side - Image Section */}
                <div className="hidden md:flex w-1/2 justify-center items-center">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/045/386/990/large_2x/illustration-of-ecommerce-vector.jpg"
                        alt="Login"
                        className="w-[90%] h-auto object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Right Side - Login Form */}
                <div className="bg-white bg-opacity-10 px-12 py-14 rounded-2xl shadow-2xl w-full md:w-1/3 backdrop-blur-lg border border-gray-600">
                    {loading && <p className="text-center text-white animate-pulse">Loading...</p>}

                    <h1 className="text-center text-white text-4xl font-extrabold mb-6 tracking-wide">Welcome Back! 👋</h1>

                    {/* Email & Password Inputs */}
                    {[
                        { type: "email", value: email, setter: setEmail, placeholder: "Enter your email" },
                        { type: "password", value: password, setter: setPassword, placeholder: "Enter your password" }
                    ].map((input, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type={input.type}
                                value={input.value}
                                onChange={(e) => input.setter(e.target.value)}
                                className="bg-gray-700 bg-opacity-40 px-5 py-3 w-full rounded-lg text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-yellow-400 transition-all border border-gray-500 hover:border-yellow-400"
                                placeholder={input.placeholder}
                            />
                        </div>
                    ))}

                    {/* Login Button */}
                    <button
                        onClick={login}
                        className="bg-gradient-to-r from-yellow-500 to-yellow-700 w-full text-white font-bold py-3 rounded-lg transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        Login
                    </button>

                    {/* OR Divider */}
                    <div className="flex items-center my-6">
                        <hr className="w-full border-gray-500" />
                        <span className="text-gray-300 mx-3">OR</span>
                        <hr className="w-full border-gray-500" />
                    </div>

                    {/* Social Login Buttons */}
                    <div className="flex justify-center space-x-4">
                        {[
                            { platform: "Facebook", icon: "fab fa-facebook-f", bg: "bg-blue-600" },
                            { platform: "Google", icon: "fab fa-google", bg: "bg-red-500" }
                        ].map((btn, index) => (
                            <button key={index} className={`${btn.bg} hover:opacity-90 text-white px-5 py-2 rounded-lg flex items-center gap-2 transition-all shadow-lg`}>
                                <i className={btn.icon}></i> {btn.platform}
                            </button>
                        ))}
                    </div>

                    {/* Signup Link */}
                    <p className="text-white text-center mt-6">
                        Don't have an account? <Link className="text-yellow-400  font-bold hover:underline" to="/signup">Sign Up</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Login