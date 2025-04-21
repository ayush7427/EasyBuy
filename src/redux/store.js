import { configureStore } from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"
import wishlistSlice from "./wishlist"

const store = configureStore({
    reducer: {
        cart: cartSlice,
        wishlist: wishlistSlice
    },
    devTools: true
})

export default store