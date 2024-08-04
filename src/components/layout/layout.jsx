import React, { useEffect } from 'react'
import { Footer, Header } from "../index"

export default function Layout({children}) {
    
    useEffect(() => {
        window.scrollTo(0 , 0)
    } , [])

    return (
        <div>
            <Header/>
            <div className='content'>
                {children}
            </div>
            <Footer/>
        </div>
    )
}
