// Import necessary functions from Redux Toolkit
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Helper function to load cart data from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem("cart");
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error("Failed to load cart from localStorage:", error);
    return [];
  }
};

// Helper function to save cart data to localStorage
const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem("cart", serializedCart);
  } catch (error) {
    console.error("Failed to save cart to localStorage:", error);
  }
};

// Initial state with products array
const initialState = {
  products: [],
  cart: loadCartFromLocalStorage(),
  status: "idle",
  error: null,
};

// Fetch products action
export const fetchProducts = createAsyncThunk(
  "productData/fetchProducts",
  async () => {
    const response = await fetch("https://dummyjson.com/products");
    const data = await response.json();
    return data.products;
  }
);

// Create a slice with async actions handled in extraReducers
export const productSlice = createSlice({
  name: "productData",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      state.cart.push(action.payload);
      saveCartToLocalStorage(state.cart); // Save updated cart to localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { addToCart } = productSlice.actions;

export default productSlice.reducer;
