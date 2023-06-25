import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      state.push(action.payload);
    },
    initializeCart: (state, action) => {
      return action.payload; // retourne le cart initial
    },
  },
});

export const { addToCart, initializeCart } = cartSlice.actions;
export default cartSlice.reducer;

// name: 'cart',
// initialState: {
//     cartItems: [],
//     shippingAddress: {},
//     paymentMethod: '',
// },
// reducers: {
//     addToCart: (state, action) => {
//         const item = action.payload
//         const existItem = state.cartItems.find((x) => x.product === item.product)
//         if (existItem) {
//             state.cartItems = state.cartItems.map((x) =>
//                 x.product === existItem.product ? item : x
//             )
//         } else {
//             state.cartItems = [...state.cartItems, item]
//         }
//     }
// }