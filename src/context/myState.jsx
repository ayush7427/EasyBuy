import React, { useEffect, useState } from 'react'
import myContext from './context'
import { Timestamp, addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc } from 'firebase/firestore';
import { fireDB } from "../firebase/firebaseConfig"
import { toast } from 'react-toastify';


export default function MyState(props) {

    const [mode, setMode] = useState("Light")

    const toggleMode = () => {
        if (mode === "Light") {
            setMode("dark")
            document.body.style.backgroundColor = "rgb(17 , 24 , 39)"
        }
        else {
            setMode("Light")
            document.body.style.backgroundColor = "white"
        }
    }

    const [loading, setLoading] = useState(false)


    const [products, setProducts] = useState({
        title: "",
        price: "",
        imageUrl: "",
        subTitle: "",
        category: "",
        description: "",
        time: Timestamp.now(),
        id: Math.random().toString(36).slice(2, 9),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    })
    // Add Products
    const addProduct = async () => {

        if (products.title == "" || products.price == "" || products.imageUrl == "" || products.category == "" || products.description == "" || products.subTitle == "") {
            return toast.error('All fields are required')
        }

        setLoading(true)
        try {
            const productRef = collection(fireDB, "products")
            await addDoc(productRef, products)
            toast.success("Product Added")
            setTimeout(() => {
                window.location.href = "/"
            }, 800)
            getProductData()
            setLoading(false)
        } catch (error) {
            toast.error(error)
            setLoading(false)
        }
        setProducts("")
    }

    // Get Product Items
    const [product, setProduct] = useState([]);
    const getProductData = async () => {

        try {
            setLoading(true)

            const q = query(
                collection(fireDB, "products"),
                orderBy("time")
            )

            const data = onSnapshot(q, (QuerySnapshot) => {
                let productsArray = [];
                QuerySnapshot.forEach((doc) => {
                    productsArray.push({ ...doc.data(), id: doc.id })
                })
                setProduct(productsArray)
                setLoading(false)
            })

            return () => data
        } catch (error) {
            toast.error(error)
            setLoading(false)
        }
    }

    // update Product Item
    const edithandle = (item) => {
        setProducts(item)
    }

    const updateProduct = async () => {
        try {
            setLoading(true)
            await setDoc(doc(fireDB, "products", products.id), products)
            toast.success("Product Updated successfully")
            getProductData();
            setLoading(false)
            window.location.href = "/"

        } catch (error) {
            toast.error(error)
            setLoading(false)
        }
        setProducts("")
    }

    //  delete Product
    const deleteProduct = async (item) => {
        try {
            setLoading(true)
            await deleteDoc(doc(fireDB, "products", item.id))
            toast.success('Product Deleted')
            setLoading(false)
            getProductData()
        } catch (error) {
            toast.error(error)
            setLoading(false)
        }
    }

    // Get userData 
    const [user, setUser] = useState([])
    const getUserData = async () => {

        try {
            setLoading(true)
            const ref = collection(fireDB, "users")
            const res = await getDocs(ref)

            let userData = []
            res.docs.forEach((el) => {
                userData.push({ ...el.data(), uid: el.uid })
            })

            setUser(userData)
            setLoading(false)
        } catch (error) {
            toast.error(error);
            setLoading(false)
        }

    }


    const [searchkey, setSearchkey] = useState('')
    const [filterType, setFilterType] = useState('')
    const [filterPrice, setFilterPrice] = useState('')


    //  order details

    const [order, setOrder] = useState([])
    const getOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "order"))
            const ordersArray = [];
            result.forEach((doc) => {
                ordersArray.push(doc.data());
                setLoading(false)
            });
            setOrder(ordersArray);
            // console.log(ordersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const [userOrderData, setUserOrderData] = useState([]);
    const getUserOrderData = async () => {
        setLoading(true)
        try {
            const result = await getDocs(collection(fireDB, "user"))
            const usersArray = [
                {
                    name: "12",
                    email: "12",
                    uid: "dhf",
                    date: "12 Aug"
                }
            ];
            result.forEach((doc) => {
                usersArray.push(doc.data());
                setLoading(false)
            });
            setUserOrderData(usersArray);
            // console.log(usersArray)
            setLoading(false);
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getProductData()
        getUserData()
        getOrderData()
        getUserOrderData()
    }, [])

    return (
        <myContext.Provider value={{ mode, toggleMode, loading, setLoading, products, setProducts, addProduct, product, edithandle, updateProduct, deleteProduct, user, searchkey, filterType, filterPrice, setSearchkey, setFilterPrice, setFilterType, setProduct, userOrderData, order }}>
            {props.children}
        </myContext.Provider>
    )
}
