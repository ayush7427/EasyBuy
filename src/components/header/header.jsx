import { Fragment, useContext, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { FaToggleOn, FaToggleOff, FaRegHeart, FaUserCircle } from "react-icons/fa";
import myContext from '../../context/context'
import { RxCross2 } from 'react-icons/rx'
import config from '../../config/config'
import { useSelector } from "react-redux"
import Marquee from '../marquee/marqueeText'

export default function Header() {
  const [open, setOpen] = useState(false)

  const context = useContext(myContext)
  const { toggleMode, mode, searchkey, setSearchkey } = context
  // console.log(products);

  const user = JSON.parse(localStorage.getItem("user"))
  const admin = JSON.parse(localStorage.getItem("user"))
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear("user")
    navigate("/")
    window.location.reload()
  }

  const cartItem = useSelector((state) => state.cart)


  return (
    <div className="bg-white sticky top-0 z-50  "  >
      {/* Mobile menu */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 z-40 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl" style={{ backgroundColor: mode === 'dark' ? 'rgb(40, 44, 52)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="flex px-4 pb-2 pt-28">
                  <button
                    type="button"
                    className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                    onClick={() => setOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <RxCross2 />
                  </button>
                </div>

                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                  <Link
                    to="/allproducts"
                    className="block text-base font-medium"
                    style={{ color: mode === 'dark' ? 'white' : 'black' }}
                  >
                    All Products
                  </Link>

                  <div className="flow-root">
                    <Link
                      to="/order"
                      className="-m-2 block p-2 text-base font-medium"
                      style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    >
                      Order
                    </Link>
                  </div>

                  {admin?.user?.email === config.adminEmail && (
                    <div className="flow-root">
                      <Link
                        to="/dashboard"
                        className="-m-2 block p-2 text-base font-medium"
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                      >
                        Admin
                      </Link>
                    </div>
                  )}

                  {user ? (
                    <div className="flow-root">
                      <a
                        onClick={logout}
                        className="-m-2 block p-2 text-base font-medium cursor-pointer"
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                      >
                        Logout
                      </a>
                    </div>
                  ) : (
                    <div className="flow-root">
                      <Link
                        to="/signup"
                        className="-m-2 block p-2 text-base font-medium cursor-pointer"
                        style={{ color: mode === 'dark' ? 'white' : 'black' }}
                      >
                        Signup
                      </Link>
                    </div>
                  )}


                  <div className="flow-root">
                    <Link
                      to="/profile"
                      className="-m-2 block p-2 text-base font-medium cursor-pointer "
                      style={{ color: mode === 'dark' ? 'black' : 'white' }}
                    >
                      <FaUserCircle className="w-10 h-8 dark:bg-white rounded-full p-1" />
                    </Link>
                  </div>

                  <div className="flex items-center justify-between gap-4 mt-4">
                    <span
                      className="text-base font-medium"
                      style={{ color: mode === 'dark' ? 'white' : 'black' }}
                    >
                      Dark Mode
                    </span>
                    <button
                      onClick={toggleMode}
                      className={`relative w-16 h-8 rounded-full transition-colors duration-300 
        ${mode === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}
                    >
                      <span
                        className={`absolute top-1 left-1 w-6 h-6 rounded-full bg-white shadow-md transition-all duration-300 transform
        ${mode === 'dark' ? 'translate-x-8' : 'translate-x-0'}`}
                      ></span>
                    </button>
                  </div>
                </div>


                <div className="border-t border-gray-200 px-4 py-6">
                  <a href="#" className="-m-2 flex items-center p-2">
                    <img
                      src="https://as1.ftcdn.net/jpg/07/55/22/20/1000_F_755222053_bJQeoLB6pt3bjlamWwxvBRVT5DDK6G51.webp"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-base font-medium text-gray-900" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                    <span className="sr-only">, change currency</span>
                  </a>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* desktop  */}
      <header className="relative bg-white">
        <Marquee />


        <nav aria-label="Top" className="bg-gray-100 px-4 sm:px-6 lg:px-8 shadow-xl " style={{ backgroundColor: mode === 'dark' ? '#282c34' : '', color: mode === 'dark' ? 'white' : '', }}>
          <div className="">
            <div className="flex h-16 items-center">
              <button
                type="button"
                className="rounded-md bg-white p-2 text-gray-400 lg:hidden"
                onClick={() => setOpen(true)} style={{ backgroundColor: mode === 'dark' ? 'rgb(80 82 87)' : '', color: mode === 'dark' ? 'white' : '', }}
              >
                <span className="sr-only">Open menu</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

              </button>

              {/* Logo */}
              <div className="ml-4 flex lg:ml-0">
                <Link to={'/'} className='flex'>
                  <div className="flex ">
                    <h1 className=' text-2xl font-bold text-black  px-2 py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>EasyBuy</h1>
                  </div>
                </Link>
              </div>

              <div className="ml-auto flex items-center">
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">

                  <Link to={'/allproducts'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    All Products
                  </Link>
                  <Link to={'/order'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                    Order
                  </Link>

                  {admin?.user?.email === config.adminEmail ?
                    (
                      <Link to={'/dashboard'} className="text-sm font-medium text-gray-700 " style={{ color: mode === 'dark' ? 'white' : '', }}>
                        Admin
                      </Link>
                    )
                    : ""}


                  {user ?
                    (
                      <a onClick={logout} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                        Logout
                      </a>
                    ) : (
                      <Link to={'/signup'} className="text-sm font-medium text-gray-700 cursor-pointer  " style={{ color: mode === 'dark' ? 'white' : '', }}>
                        Signup
                      </Link>
                    )}
                </div>

                <div className="hidden lg:ml-8 lg:flex">
                  <a href="#" className="flex items-center text-gray-700 ">
                    <img
                      src="https://ecommerce-sk.vercel.app/img/indiaflag.png"
                      alt=""
                      className="block h-auto w-5 flex-shrink-0"
                    />
                    <span className="ml-3 block text-sm font-medium" style={{ color: mode === 'dark' ? 'white' : '', }}>INDIA</span>
                  </a>
                </div>
                <div className="hidden lg:ml-8 lg:flex">
                  <Link to={"/profile"} className="flex items-center text-gray-700 ">
                    <FaUserCircle className="w-10 h-8 dark:bg-white rounded-full p-1" />
                  </Link>
                </div>

                <div className="relative lg:ml-6">
                  <div className="absolute flex items-center ml-2 h-full">
                    <svg className="w-4 h-4 fill-current text-primary-gray-dark" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.8898 15.0493L11.8588 11.0182C11.7869 10.9463 11.6932 10.9088 11.5932 10.9088H11.2713C12.3431 9.74952 12.9994 8.20272 12.9994 6.49968C12.9994 2.90923 10.0901 0 6.49968 0C2.90923 0 0 2.90923 0 6.49968C0 10.0901 2.90923 12.9994 6.49968 12.9994C8.20272 12.9994 9.74952 12.3431 10.9088 11.2744V11.5932C10.9088 11.6932 10.9495 11.7869 11.0182 11.8588L15.0493 15.8898C15.1961 16.0367 15.4336 16.0367 15.5805 15.8898L15.8898 15.5805C16.0367 15.4336 16.0367 15.1961 15.8898 15.0493ZM6.49968 11.9994C3.45921 11.9994 0.999951 9.54016 0.999951 6.49968C0.999951 3.45921 3.45921 0.999951 6.49968 0.999951C9.54016 0.999951 11.9994 3.45921 11.9994 6.49968C11.9994 9.54016 9.54016 11.9994 6.49968 11.9994Z" />
                    </svg>
                  </div>
                  <input
                    value={searchkey}
                    onChange={(e) => setSearchkey(e.target.value)}
                    type="text"
                    name="searchkey"
                    id="searchkey"
                    placeholder="Search here"
                    className="px-8 py-3 w-full rounded-md bg-violet-0 border-transparent outline-0 text-sm" style={{ backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '', color: mode === 'dark' ? 'white' : '', }} />
                </div>


                <div className="hidden lg:flex ml-4  lg:ml-6 items-center justify-between gap-4">
                  <button
                    onClick={toggleMode}
                    className={`relative w-12 h-6 rounded-full transition-colors duration-300 
      ${mode === 'dark' ? 'bg-blue-600' : 'bg-gray-300'}`}
                  >
                    <span
                      className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-all duration-300 transform
        ${mode === 'dark' ? 'translate-x-6' : 'translate-x-0'}`}
                    ></span>
                  </button>
                </div>

                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={"/comingsoon"}>

                    <FaRegHeart className='w-5 h- ' />
                  </Link>


                </div>
                {/* Cart */}
                <div className="ml-4 flow-root lg:ml-6">
                  <Link to={'/cart'} className="group -m-2 flex items-center p-2" style={{ color: mode === 'dark' ? 'white' : '', }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                    </svg>

                    <span className="ml-2 text-sm font-medium text-gray-700 group-" style={{ color: mode === 'dark' ? 'white' : '', }}>{cartItem.length}</span>
                    <span className="sr-only">items in cart, view bag</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div >
  )
}