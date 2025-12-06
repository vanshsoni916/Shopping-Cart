import {createSlice} from '@reduxjs/toolkit'

const initialState ={
    items:localStorage.getItem('cart')?JSON.parse(localStorage.getItem('cart')):[]
}

const addtocart =createSlice({
    name:"cart",
    initialState,
    //reducer:
    reducers:{
        //action:
        addItem:(state,action)=>{
            //print the data accessed through the action of reducer from UI Data:
            console.log(action.payload)
            state.items.push(action.payload)
            //use localStorage to persist data in redux store and in its state:
            localStorage.setItem('cart',JSON.stringify(state.items))
        },
        removeItem:(state,action)=>{
            //remove your undesired cart from the state of items as well as from the local storage:
            const cartData = state.items.filter(item=>item.id!=action.payload.id)
            state.items = cartData
            //also from local storage:
            localStorage.setItem('cart',JSON.stringify(cartData))
        },
        clearAllItems:(state)=>{
            state.items=[];
        }
    }
})
//export action:
export const {addItem,removeItem,clearAllItems} =addtocart.actions;
//export reducer:
export default addtocart.reducer