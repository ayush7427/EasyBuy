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
            <div className={`h-screen pt-5 bg-gray-100 ${mode === 'dark' ? 'bg-gray-900 text-white' : ''}`}>
                <h1 className="mb-10 text-center text-3xl font-bold">Your Cart</h1>
                <div className="mx-auto max-w-5xl text-white flex flex-col md:flex-row md:space-x-6 px-6 xl:px-0">
                    <div className="rounded-lg md:w-2/3 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="flex flex-col items-center bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                <img src="https://rukminim2.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90" alt="Empty Cart" className="w-40" />
                                <h2 className="mt-5 text-lg font-bold">Your cart is empty!</h2>
                                <p className="text-gray-500">Add items to it now.</p>
                                <button onClick={() => navigate("/")} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-all">
                                    Shop Now
                                </button>
                            </div>
                        ) : (
                            cartItems.map((item, index) => (
                                <div key={index} className="flex items-center justify-between bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                                    <img onClick={() => navigate(`/productinfo/${item.id}`)} src={item.imageUrl} alt="Product" className="w-20 h-20 object-cover rounded-lg cursor-pointer" />
                                    <div className="flex flex-col w-full ml-4">
                                        <h2 className="text-lg font-bold">{item.title}</h2>
                                        <p className="text-sm text-gray-500">{item.description}</p>
                                        <p className="text-lg font-semibold">₹{item.price}</p>
                                    </div>
                                    <button onClick={() => deleteItem(item)} className="text-red-500 hover:text-red-700 transition-all">
                                        ❌
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Order Summary */}
                    <div className="mt-6 md:mt-0 md:w-1/3 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                        <div className="flex justify-between text-gray-700 dark:text-white mb-2">
                            <p>Subtotal</p>
                            <p>₹{totalAmount.toLocaleString("en-IN")}</p>
                        </div>
                        <div className="flex justify-between text-gray-700 dark:text-white">
                            <p>Shipping</p>
                            <p>₹{shipping}</p>
                        </div>
                        <hr className="my-4 border-gray-300" />
                        <div className="flex justify-between font-bold text-lg">
                            <p>Total</p>
                            <p>₹{grandTotal}</p>
                        </div>
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
            );
        </Layout>
    )
}

export default Cart