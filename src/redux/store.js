import {configureStore} from '@reduxjs/toolkit'
import cartReducer from "./slice"
import productReducer from './productSlice'
const  store =configureStore({
    reducer:{
        cart:cartReducer,
        product:productReducer
    }
})

export default store