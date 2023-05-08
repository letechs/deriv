import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { startTransition } from 'react';
import apiService from './apiService';

const initialState = {
    user: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}
export const authorize = createAsyncThunk('api/auth',
    async (token, thunkAPI) => {
        try {
            return await apiService.ticks("R_100");
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)||error.message;
            return thunkAPI.rejectWithValue(message);
        }
    })
    export const ticks = createAsyncThunk('api/auth',
    async (tick, thunkAPI) => {
        try {
            return await apiService.ticks(tick);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message)||error.message;
            return thunkAPI.rejectWithValue(message);
        }
    })


export const apiSlice = createSlice({
    name: 'api',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorize.pending, (state) => {
                startTransition.isLoading = true;
            })
            .addCase(authorize.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
                state.user = action.payload;
            })
            .addCase(authorize.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    },
});

export const { reset } = apiSlice.actions;
export default apiSlice.reducer;
