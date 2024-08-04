import React, { useContext } from "react";
import { useParams } from "react-router";
import { Layout, Loader } from "../../components/index";
import myContext from "../../context/context";
import { useNavigate } from "react-router-dom"
import { addToCart } from "../../redux/cartSlice"
import { useDispatch } from "react-redux"
import { toast } from 'react-toastify'

const CategoryPage = () => {
    const { categoryname } = useParams();

    const context = useContext(myContext)
    const { product, loading, mode } = context

    const navigate = useNavigate();
    const dispatch = useDispatch()

    // filter product 
    const filterProduct = product.filter((obj) => obj.category.includes(categoryname.charAt(0).toUpperCase() + categoryname.slice(1)));

    const addCart = (item) => {
        dispatch(addToCart(item))

        toast.success('Product Added', {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });
    }

    return (
        <Layout>
            <div className="mt-10">
                {/* Heading  */}
                <div className="">
                    <h1 className=" text-center mb-5 text-2xl font-semibold first-letter:uppercase">{categoryname}</h1>
                </div>
                {loading ?

                    <div className="flex justify-center">
                        <Loader />
                    </div>

                    :

                    <section className="text-gray-600 body-font">
                        {/* main 2 */}
                        <div className="container px-5 py-5 mx-auto">
                            {/* main 3  */}
                            <div className="flex flex-wrap -m-4 justify-center">
                                {filterProduct.length > 0 ?
                                    <>
                                        {filterProduct.map((item, index) => {
                                            const { id, title, price, imageUrl } = item;
                                            return (
                                                <div key={index} className="p-4 w-full md:w-1/4">
                                                    <div className="h-full border border-gray-300 rounded-xl overflow-hidden shadow-md cursor-pointer">
                                                        <img
                                                            onClick={() => navigate(`/productinfo/${id}`)}
                                                            className="lg:h-80  h-96 w-full"
                                                            src={imageUrl}
                                                            alt="img"
                                                        />
                                                        <div className="p-6">
                                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>EasyBuy</h2>
                                                            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1" style={{ color: mode === 'dark' ? 'white' : '', }}>
                                                            </h2>
                                                            <h1 style={{ color: mode === 'dark' ? 'white' : '', }} className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                {title.substring(0, 25)}
                                                            </h1>
                                                            <h1 style={{ color: mode === 'dark' ? 'white' : '', }} className="title-font text-lg font-medium text-gray-900 mb-3">
                                                                ₹{price}
                                                            </h1>
                                                            <div className="flex justify-center ">
                                                                <button onClick={() => addCart(item)} className=" bg-blue-600 hover:bg-blue-700 w-full text-white py-[4px] rounded-lg font-bold">
                                                                    cart
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </>

                                    :

                                    <div>
                                        <div className="flex justify-center">
                                            <img className=" mb-2" src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png" alt="" />
                                        </div>
                                        <h1 className=" text-black text-xl">No {categoryname} product found</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>

                }
            </div>
        </Layout>
    );

}

export default CategoryPage;