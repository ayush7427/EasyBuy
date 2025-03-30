import React from 'react'
import myContext from '../../context/context';
import { useContext } from 'react';

const Marquee = () => {
    const context = useContext(myContext)
    const { mode } = context
    return (
        <div className=" overflow-hidden whitespace-nowrap flex h-10 items-center justify-center  bg-blue-600" style={{ backgroundColor: mode === 'dark' ? '#DE7456' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="inline-block animate-marquee font-bold text-white" >
                🚚 Get FREE Delivery on All Orders Over ₹500 – Don’t Miss Out, Shop Now & Save Big Today! 🛒
            </div>
        </div>
    );
};

export default Marquee;


