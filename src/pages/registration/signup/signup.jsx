import { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import myContext from '../../../context/context'
import { toast } from "react-toastify"
import { Loader, Layout } from "../../../components/index"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { auth, fireDB } from "../../../firebase/firebaseConfig"
import { Timestamp, addDoc, collection } from "firebase/firestore"


function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const context = useContext(myContext)
    const { loading, setLoading } = context
    const navigate = useNavigate()

    const regexExpression = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g

    const passwordRegexExpression = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm

    const phoneNumberRegexExpression = /^[789]\d{9}$/g

    const signup = async () => {
        // validation
        if (name === "" || email === "" || password === "" || phoneNumber === "") {
            return toast.error("All fields are required", {
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

        // password validation
        if (!passwordRegexExpression.test(password)) {
            return (toast.error("Password must be at least 8 characters long, containing at least 1 uppercase letter, 1 lowercase letter, 1 number, and can include special characters."), {
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

        //  phoneNumber validation
        if (!phoneNumberRegexExpression.test(phoneNumber)) {
            return (toast.error("Invalid mobile number. Ensure it is exactly 10 digits long and starts with 7, 8, or 9."), {
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
            setLoading(true)
            const users = await createUserWithEmailAndPassword(auth, email, password)

            console.log(users);


            const user = {
                name: name,
                email: users.user.email,
                uid: users.user.uid,
                time: Timestamp.now(),
                phone: phoneNumber,
                id: Math.random().toString(36).slice(2, 9)
            }

            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user)
            toast.success("Account Successfully Created!")
            setName("")
            setEmail("")
            setPassword("")
            setPhoneNumber("")
            setLoading(false)
            navigate("/login")
        } catch (error) {
            toast.error(error)
            setLoading(false)
        }
    }

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 px-4 py-6">
                {/* Left Side - Image Section */}
                <div className="hidden md:flex w-1/2 justify-center items-center">
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/001/263/897/large_2x/online-shopping-and-digital-marketing-concept-vector.jpg"
                        alt="Signup"
                        className="w-[90%] h-auto object-cover rounded-2xl shadow-xl hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Right Side - Signup Form */}
                <div className="bg-white bg-opacity-10 px-12 py-14 rounded-2xl shadow-2xl w-full md:w-1/3 backdrop-blur-lg border border-gray-600">
                    {loading && <p className="text-center text-white animate-pulse">Loading...</p>}

                    <h1 className="text-center text-white text-4xl font-extrabold mb-6 tracking-wide">Create an Account 🚀</h1>

                    {/* Input Fields */}
                    {[
                        { type: "text", value: name, setter: setName, placeholder: "Enter your name" },
                        { type: "tel", value: phoneNumber, setter: setPhoneNumber, placeholder: "Enter your mobile number" },
                        { type: "email", value: email, setter: setEmail, placeholder: "Enter your email" },
                        { type: "password", value: password, setter: setPassword, placeholder: "Enter your password" }
                    ].map((input, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type={input.type}
                                value={input.value}
                                onChange={(e) => input.setter(e.target.value)}
                                className="bg-gray-700 bg-opacity-40 px-5 py-3 w-full rounded-lg text-white placeholder-gray-300 outline-none focus:ring-2 focus:ring-red-400 transition-all border border-gray-500 hover:border-red-400"
                                placeholder={input.placeholder}
                            />
                        </div>
                    ))}

                    {/* Signup Button */}
                    <button
                        onClick={signup}
                        className="bg-gradient-to-r from-red-500 to-red-700 w-full text-white font-bold py-3 rounded-lg transition-all hover:scale-105 hover:shadow-2xl"
                    >
                        Signup
                    </button>

                    {/* OR Divider */}
                    <div className="flex items-center my-6">
                        <hr className="w-full border-gray-500" />
                        <span className="text-gray-300 mx-3">OR</span>
                        <hr className="w-full border-gray-500" />
                    </div>

                    {/* Social Signup Buttons */}
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

                    {/* Login Link */}
                    <p className="text-white text-center mt-6">
                        Already have an account? <Link className="text-red-400 font-bold hover:underline" to="/login">Login</Link>
                    </p>
                </div>
            </div>
        </Layout>
    )
}

export default Signup