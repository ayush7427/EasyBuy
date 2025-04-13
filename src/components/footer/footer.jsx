
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import myContext from '../../context/context'

export default function Footer() {
    const context = useContext(myContext)
    const { toggleMode, mode } = context
    return (
        <footer className="text-gray-600 body-font bg-gray-300 dark:bg-gray-900 dark:text-white" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
            <div className="container px-5 py-16 mx-auto flex flex-wrap md:justify-between justify-center">
                <div className="w-full md:w-1/4 mb-6 md:mb-0 px-4">
                    <h2 className="text-lg font-semibold tracking-widest mb-3">CATEGORIES</h2>
                    <nav className="list-none space-y-2">
                        <Link to={"/"}><li><a className="hover:text-gray-400">Home</a></li></Link>

                        <Link to={'/order'}><li><a className="hover:text-gray-400">Order</a></li></Link>

                        <Link to={"/comingsoon"}><li><a className="hover:text-gray-400">Local For Vocal</a></li></Link>

                        <Link to={"/cart"}><li><a className="hover:text-gray-400">Cart</a></li></Link>
                    </nav>
                </div>

                <div className="w-full md:w-1/4 mb-6 md:mb-0 px-4">
                    <h2 className="text-lg font-semibold tracking-widest mb-3">CUSTOMER SERVICE</h2>
                    <nav className="list-none space-y-2">
                        <li><Link to='/returnpolicy' className="hover:text-gray-400">Return Policy</Link></li>
                        <li><Link to={"/comingsoon"} className="hover:text-gray-400">About</Link></li>
                        <li><Link to={"/comingsoon"} className="hover:text-gray-400">Contact Us</Link></li>
                    </nav>
                </div>

                <div className="w-full md:w-1/4 mb-6 md:mb-0 px-4">
                    <h2 className="text-lg font-semibold tracking-widest mb-3">SERVICES</h2>
                    <nav className="list-none space-y-2">
                        <li><Link to='/privacypolicy' className="hover:text-gray-400">Privacy</Link></li>
                    </nav>
                </div>

                <div className="w-full md:w-1/4 px-4 flex items-center justify-center">
                    <img src="https://ecommerce-sk.vercel.app/pay.png" alt="Payment Options" className="w-48" />
                </div>
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-8">
                <div className="container px-5 py-3 mx-auto flex flex-col md:flex-row items-center justify-between">
                    <Link to='/' className='flex items-center'>
                        <h1 className='text-2xl font-bold'>EasyBuy</h1>
                    </Link>
                    <p className="text-sm">© 2024 - 2025 EasyBuy — <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">Ayush Rana</a></p>
                    <div className="flex space-x-4">
                        <a className="hover:text-blue-500" href="#"><i className="fab fa-facebook-f"></i></a>
                        <a className="hover:text-blue-400" href="#"><i className="fab fa-twitter"></i></a>
                        <a className="hover:text-pink-600" href="#"><i className="fab fa-instagram"></i></a>
                        <a className="hover:text-blue-600" href="#"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </div>
            </div>
        </footer>

    )
}