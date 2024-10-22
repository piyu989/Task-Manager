import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, api, setAuthHeader } from "../api/api";
import axios from "axios";

// Existing async thunks (login, register, logout, getUserProfile, getUserList)...
export const login = createAsyncThunk("auth/login", async (userData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signin`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("login successfully", data);
        return data;
    } catch (error) {
        console.log("catch error", error);
        throw Error(error.response.data.error);
    }
});

export const register = createAsyncThunk("auth/register", async (userData) => {
    try {
        const { data } = await axios.post(`${BASE_URL}/auth/signup`, userData);
        localStorage.setItem("jwt", data.jwt);
        console.log("register success", data);
        return data;
    } catch (error) {
        console.log("catch error", error);
        throw Error(error.response.data.error);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    try {
        localStorage.clear();
    } catch (error) {
        console.log("catch error", error);
        throw Error(error.response.data.error);
    }
});

export const getUserProfile = createAsyncThunk("auth/getUserProfile", async (jwt) => {
    setAuthHeader(jwt, api);
    try {
        const { data } = await api.get(`/api/user/profile`);
        console.log("user profile retrieved", data);
        return data;
    } catch (error) {
        console.log("catch error", error);
        throw Error(error.response.data.error);
    }
});

export const getUserList = createAsyncThunk("auth/getUserList", async () => {
    setAuthHeader(localStorage.getItem("jwt"), api);
    try {
        const response = await api.get(`/api/user`);
        console.log("user list success", response.data);
        return response.data;
    } catch (error) {
        console.log("catch error", error);
        throw Error(error.response.data.error);
    }
});

export const sendOtp = createAsyncThunk("auth/sendOtp", async (email) => {
    try {
        const { data } = await axios.post(`http://localhost:8081/api/auth/send-otp`, { email }); // Send email in body
        console.log("OTP sent successfully", data);
        return data; // Return success message
    } catch (error) {
        console.log("Error sending OTP", error);
        throw Error(error.response.data.error || "Failed to send OTP");
    }
});


export const verifyOtp = createAsyncThunk("auth/verifyOtp", async ({ email, otp }) => {
    try {
        const { data } = await axios.post(`http://localhost:8081/api/auth/verify-otp`, { email, otp }); // Send email and otp in body
        console.log("OTP verified successfully", data);
        return data; // Return success message or user data if needed
    } catch (error) {
        console.log("Error verifying OTP", error);
        throw Error(error.response.data.error || "Failed to verify OTP");
    }
});


// Update the authSlice
const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        loggedIn: false,
        loading: false,
        error: null,
        jwt: null,
        users: [],
        otpLoading: false,
        otpError: null,
        otpSuccess: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        // Existing reducers...

        // Handle sending OTP
        builder
            .addCase(sendOtp.pending, (state) => {
                state.otpLoading = true;
                state.otpError = null;
                state.otpSuccess = false;
            })
            .addCase(sendOtp.fulfilled, (state) => {
                state.otpLoading = false;
                state.otpSuccess = true; // Indicate OTP was sent successfully
            })
            .addCase(sendOtp.rejected, (state, action) => {
                state.otpLoading = false;
                state.otpError = action.error.message; // Store error message
            });

        // Handle verifying OTP
        builder
            .addCase(verifyOtp.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(verifyOtp.fulfilled, (state, action) => {
                state.loading = false;
                state.jwt = action.payload.jwt; // If JWT is returned on successful verification
                state.loggedIn = true; // User is logged in now
            })
            .addCase(verifyOtp.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message; // Store error message for OTP verification
            });
    }
});

export default authSlice.reducer;
