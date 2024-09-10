import { configureStore } from "@reduxjs/toolkit";
import productSlice from "../features/Product/ProductSlice";

export const store = configureStore({
	reducer: {
		product: productSlice,
	},
});
