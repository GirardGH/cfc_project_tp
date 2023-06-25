// import { configureStore } from "@reduxjs/toolkit";
// import { combineReducers } from "redux";
// import thunk from "redux-thunk";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
// import cart from "./cartSlice";

// const reducers = combineReducers({ cart });

// const config = {
//     key: "root",
//     storage, 
// }

// const reducer = persistReducer(config, reducers);

// const store = configureStore({
//     reducer: reducer,
//     devTools: process.env.NODE_ENV !== "production",
//     middleware: [thunk],
    
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import cartReducer, { initializeCart } from "./cartSlice";

const reducers = combineReducers({ cart: cartReducer });

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
  devTools: true,
});

// Initialization du cart
store.dispatch(
  initializeCart([{ id: 1, name: "Product 1", price: 10 }, { id: 2, name: "Product 2", price: 20 }])
);

export default store;