import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null
    },
    reducers: {
        loginAction: (state, action) => {
            state.user = action.payload;
        },

        logoutAction: (state) => {
            state.user = null;
    },
    },
});

export const { loginAction, logoutAction } = authSlice.actions;
export const authReducer = authSlice.reducer;
