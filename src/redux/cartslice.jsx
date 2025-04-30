import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            state.items.push(action.payload);
        },
        // optionally: removeFromCart, clearCart
    },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;