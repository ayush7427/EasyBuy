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

    const context = useContext(myContext)
    const { loading, setLoading } = context
    const navigate = useNavigate()

    const signup = async () => {
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required" , {
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
            const users = await createUserWithEmailAndPassword(auth, email, password)
            // console.log(users);

            const user = {
                name: name,
                email: users.user.email,
                uid: users.user.uid,
                time: Timestamp.now(),
                phoneNumber: users.user.phoneNumber,
                id: Math.random().toString(36).slice(2 , 9)
            }

            const userRef = collection(fireDB, "users")
            await addDoc(userRef, user)
            toast.success("Account Successfully Created!")
            setName("")
            setEmail("")
            setPassword("")
            setLoading(false)
            navigate("/login")
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
                        <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                    </div>
                    <div>
                        <input type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            name='name'
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Name'
                        />
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
                            onClick={signup}
                            className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'>
                            Signup
                        </button>
                    </div>
                    <div>
                        <h2 className='text-white'>Already have an account? <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Signup