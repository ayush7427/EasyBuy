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
            return toast.error("All fields are required", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
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
            <div className=' flex justify-center items-center h-screen'>
                {loading && <Loader />}
                <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                    <div className="">
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                    </div>
                    <div>
                        <input type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            name='email'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Email'
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Password'
                        />
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            type='submit'
                            onClick={login}
                            className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'>
                            Login
                        </button>
                    </div>
                    <div>
                        <h2 className='text-white'>Don't have an account? <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Login