import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";

//createAsyncThunk is a middleware which is used to perform async operation :

export const fetchProduct = createAsyncThunk("products",async()=>{
    const resp = await fetch("https://dummyjson.com/products")
    const jsonResp = await resp.json();
    console.log("data fetched: ",jsonResp)
    return jsonResp.products;
})

//initial state of slice :
const initialState={
    items:[],
    status:undefined,
    error: null
}
// create slice :
const productSlice=createSlice({
    name:"productSlice",
    initialState,
    //directly calling api through UI:
    extraReducers:(builder)=>{
        builder.addCase(fetchProduct.pending,(state)=>{
            state.status = "loading";
        })
        builder.addCase(fetchProduct.fulfilled,(state,action)=>{
            state.status='succeeded';
            state.items=action.payload
        })
        builder.addCase(fetchProduct.rejected,(state,action)=>{
            state.status="failed";
            state.error= action.error.message;
            state.items=[];
        })
    }
})

//export reducer:
export default productSlice.reducer