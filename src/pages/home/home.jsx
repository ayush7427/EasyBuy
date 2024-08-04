import React, { useEffect } from 'react'
import { Category, Filter, ImageSection, Layout, ProductCard, Track } from "../../components/index"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

export default function Home(props) {

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    return (
        <Layout>
            <ImageSection />
            <Category/>
            <Filter />
            <ProductCard />
            <div className='flex justify-center mt-10 mb-4'>
                <Link to={"/allproducts"}>
                    <button className='bg-gray-700 px-5 py-2 rounded-lg text-pretty text-xl text-white'>
                        Show more
                    </button>
                </Link>
            </div>
            <Track />
        </Layout>
    )
}
