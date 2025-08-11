import { createSlice } from "@reduxjs/toolkit";

const ProductSlice = createSlice({
    name : "product",
    initialState: {
        allProducts : [],
        cartItem : [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.allProducts = action.payload;
        },
        setCartItem: (state, action) => {
            state.cartItem = [...state.cartItem, action.payload];
        },
        removeCartItem:(state,action) => {
            state.cartItem = state.cartItem.filter(item => item.id !== action.payload)
        }
    }
})

export const {setProducts,setCartItem, removeCartItem} = ProductSlice.actions;
export default ProductSlice.reducer;