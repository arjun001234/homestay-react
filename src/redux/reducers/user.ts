import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { NavigateFunction } from "react-router-dom";
import { toast } from "react-toastify";
import { Booking } from "../../types/types";
import { fetcher } from "../../utils/axios";
import { User } from "./app";

type userSliceInitialStateType = {
    isAuthenticated: boolean,
    user: null | User
    userBookings: Booking[]
}

const userSliceInitialState : userSliceInitialStateType = {
    isAuthenticated: !!localStorage.getItem("token"),
    user: null,
    userBookings: []
}

export const userSlice = createSlice({
    name: "user",
    initialState: userSliceInitialState,
    reducers: {
        register(state,actions: PayloadAction<User>) {
            state.isAuthenticated = true
            state.user = actions.payload
        },
        login(state,actions: PayloadAction<User>) {
            state.isAuthenticated = true
            state.user = actions.payload
        },
        loadUser(state,actions: PayloadAction<User>) {
            state.isAuthenticated = true
            state.user = actions.payload
        },
        addBooking: (state,actions: PayloadAction<Booking>) => {
            state.userBookings.push(actions.payload)
        },
        loadBookings: (state,actions: PayloadAction<Booking[]>) => {
            state.userBookings = actions.payload
        }
    }
})

export const RegisterUser = (name: string,email: string,password: string,navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
        const res = await fetcher.post("/user/login",{
            name: name,
            email: email,
            password: password
        })     
        if (res.status === 201) {
            toast.success("Registered Successfully")
            dispatch(userActions.register(res.data.user))
            localStorage.setItem("token",res.data.token)
            navigate("/")
        } 
    } catch (error) {
        console.log(error)
        const err = error as AxiosError<{message: string}>
        if (err.response && err.response.data.message) {
            toast.error(err.response.data.message,{position: "top-left"})
        }else {
            toast.error("Registeration failed")
        }
    }
}

export const LoginUser = (email: string,password: string,navigate: NavigateFunction) => async (dispatch: Dispatch) => {
    try {
       const res = await fetcher.post("/user/login",{
           email: email,
           password: password
       })     
       if (res.status === 200) {
           toast.success("LoggedIn Successfully")
           dispatch(userActions.login(res.data.user))
           localStorage.setItem("token",res.data.token)
           navigate("/")
       }
    } catch (error) {
        console.log(error)
        const err = error as AxiosError<{message: string}>
        if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message,{position: "top-right",autoClose: 2000})
        }else {
            toast.error("login failed")
        }
    }
}

export const userActions = userSlice.actions

export const userReducer = userSlice.reducer