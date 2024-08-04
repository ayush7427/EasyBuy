import React, { useContext, useEffect, useState } from 'react'
import myContext from '../../context/context';
import { Layout, Modal } from '../../components/index';
import { useSelector, useDispatch } from "react-redux"
import { removeFromCart } from "../../redux/cartSlice"
import { useNavigate } from "react-router-dom"
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from "../../firebase/firebaseConfig"
import { toast } from 'react-toastify';
import config from '../../config/config';

function Cart() {

    const context = useContext(myContext)
    const { mode } = context;

    const cartItems = useSelector((state) => state.cart)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const deleteItem = (item) => {
        dispatch(removeFromCart(item))
    }
    //  deletion item set new value in localstorage
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    // Calculation for price amount
    const [totalAmount, setTotalAmount] = useState(0);

    const cartPrice = cartItems.map((items) => {
        const price = items.price
        return price.replace(/,/g, "")
    })

    useEffect(() => {
        let temp = 0
        cartPrice.forEach((item) => {

            temp += Number(item)
        })
        setTotalAmount(temp)
    }, [cartItems])

    const shipping = parseInt(99)
    const grandTotal = (totalAmount + shipping).toLocaleString("en-IN")
    const finalAmount = Number(grandTotal.replaceAll(",", ""))

    // For Payment
    const [name, setName] = useState("")
    const [address, setAddress] = useState("");
    const [pincode, setPincode] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")

    const buyNow = async () => {
        if (name === "" || address == "" || pincode == "" || phoneNumber == "") {
            return toast.error("All fields are required", {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            })
        }

        const addressInfo = {
            name,
            address,
            pincode,
            phoneNumber,
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        // console.log(addressInfo);




        // Payment Integration
        let options = {
            key: config.razorPayKey,
            key_secret: config.razorPayKeySecret,
            amount: parseInt(finalAmount * 100),
            currency: "INR",
            order_receipt: 'order_rcptid_' + name,
            name: "EasyBuy",
            description: "for testing purpose",
            handler: function (response) {
                console.log(response)
                toast.success('Payment Successful')

                const paymentId = response.razorpay_payment_id

                const orderInfo = {
                    cartItems,
                    addressInfo,
                    date: new Date().toLocaleString(
                        "en-US",
                        {
                            month: "short",
                            day: "2-digit",
                            year: "numeric",
                        }
                    ),
                    email: JSON.parse(localStorage.getItem("user")).user.email,
                    userid: JSON.parse(localStorage.getItem("user")).user.uid,
                    paymentId
                }

                try {
                    const orderRef = collection(fireDB, "order")
                    addDoc(orderRef, orderInfo)
                } catch (error) {
                    console.log(error);
                }
            },

            theme: {
                color: "#3399cc"
            }
        };

        let pay = new window.Razorpay(options);
        pay.open();
        // console.log(pay)
    }

    return (
        <Layout >
            <div className="h-screen bg-gray-100 pt-5   " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
                <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
                <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0 ">
                    <div className="rounded-lg md:w-2/3 ">

                        {
                            cartItems.length <= 0
                                ?
                                (<div className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                    <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="product-image" className="w-full rounded-lg sm:w-40" />
                                    <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                        <div className="mt-5 sm:mt-0">
                                            <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>Your cart is empty!</h2>
                                            <p className=" text-gray-500" style={{ color: mode === 'dark' ? " text-gray-600" : '' }}>Add items to it now.</p>

                                            <button onClick={() => navigate("/")} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded lg:px-2 lg:py-2 md:px-5 md:py-2 sm:px-4 sm:py-1">Shop now</button>
                                        </div>

                                    </div>
                                </div>)
                                :
                                (
                                    cartItems.map((item, index) => {
                                        const { title, price, description, imageUrl, id } = item
                                        return (
                                            <div key={index} className="justify-between mb-6 rounded-lg border  drop-shadow-xl bg-white p-6  sm:flex  sm:justify-start" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                                                <img onClick={() => navigate(`/productinfo/${id}`)} src={imageUrl} alt="product-image" className="w-full rounded-lg sm:w-40" />
                                                <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                                                    <div className="mt-5 sm:mt-0">
                                                        <h2 className="text-lg font-bold text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}>{title}</h2>
                                                        <h2 className="text-sm  text-gray-900" style={{ color: mode === 'dark' ? 'white' : '' }}> {description} </h2>
                                                        <p className="mt-1 text-xs font-semibold text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}> {price} </p>
                                                    </div>
                                                    <div onClick={() => deleteItem(item)} className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                        </svg>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    })
                                )
                        }

                    </div>

                    <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3" style={{ backgroundColor: mode === 'dark' ? 'rgb(32 33 34)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <div className="mb-2 flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Subtotal</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{totalAmount.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="flex justify-between">
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>Shipping</p>
                            <p className="text-gray-700" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{shipping}</p>
                        </div>
                        <hr className="my-4" />
                        <div className="flex justify-between mb-3">
                            <p className="text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>Total</p>
                            <div className>
                                <p className="mb-1 text-lg font-bold" style={{ color: mode === 'dark' ? 'white' : '' }}>₹{grandTotal}</p>
                            </div>
                        </div>
                        {/* <Modal  /> */}

                        <Modal
                            name={name}
                            address={address}
                            pincode={pincode}
                            phoneNumber={phoneNumber}
                            setName={setName}
                            setAddress={setAddress}
                            setPincode={setPincode}
                            setPhoneNumber={setPhoneNumber}
                            buyNow={buyNow}
                        />
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Cart