import React from "react"
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom"
import { AddProduct, AllProducts, Cart, CategoryPage, ComingSoon, Dashboard, Home, Login, MyWishlist, NoPage, Order, PrivacyPolicy, ProductInfo, ProfileSection, ReturnPolicy, Signup, UpdateProduct } from "./pages/index"
import MyState from "./context/myState"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import config from "./config/config";

function App() {

  return (
    <MyState>
      <Router>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/allproducts" element={<AllProducts />} />
          <Route path="/order" element={
            <ProtectedRoutes>
              <Order />
            </ProtectedRoutes>} />
          <Route path="/dashboard" element={
            <ProtectedRoutesForAdmin>
              <Dashboard />
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/add-product" element={
            <ProtectedRoutesForAdmin>
              <AddProduct />
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/update-product" element={
            <ProtectedRoutesForAdmin>
              <UpdateProduct />
            </ProtectedRoutesForAdmin>
          } />
          <Route path="/cart" element={
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          } />
          <Route path="/productinfo/:id" element={<ProductInfo />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/*" element={<NoPage />} />
          <Route path="/category/:categoryname" element={<CategoryPage />} />
          <Route path="/profile" element={<ProfileSection />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="/returnpolicy" element={<ReturnPolicy />} />
          <Route path="/comingsoon" element={<ComingSoon />} />
          <Route path="/my-wishlist" element={<MyWishlist />} />

        </Routes>
        <ToastContainer />
      </Router>
    </MyState >
  )
}

// All user
export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem("user")) {
    return children
  }
  else {
    return <Navigate to="/login" />
  }
}

//  For Admin
export const ProtectedRoutesForAdmin = ({ children }) => {
  const admin = JSON.parse(localStorage.getItem("user"))

  if (admin.user.email === config.adminEmail) {
    return children
  } else {
    return <Navigate to="/login" />
  }
}
export default App
