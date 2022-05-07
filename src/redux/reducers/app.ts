import { createSlice, Dispatch, PayloadAction } from "@reduxjs/toolkit"
import { fetcher } from "../../utils/axios"
import { userActions } from "./user"

export enum RoomType {
    SINGLE = 'SINGLE',
    DOUBLE = 'DOUBLE',
    SUITE = 'SUITE',
}

export type Homestay = {
    id: string,
    name: string,
    desc: string,
    address: string,
    state: string,
    city: string,
    pincode: string,
    country: string,
    img: string[]
    rooms: Room[]
}

export type Room = {
    id: string,
    homestayId: string,
    roomType: RoomType,
    occupancy: number,
    price: number
}

export type roomCartType = {
    rooms: {
        quantity: number,
        room: Room
    }[],
    totalPrice: number
}

export interface User {
    id: string,
    name: string,
    email: string,
    password: string,
}

type appReducerType = {
    homestays: Homestay[],
    searchedHomestays: Homestay[]
    // roomCart: roomCartType[]
}

const initialValues : appReducerType = {
    homestays: [],
    searchedHomestays: [],
    // roomCart: []
}

export const appSlice = createSlice({
    name: 'app',
    initialState: initialValues,
    reducers: {
        loadHomestays: (state,actions: PayloadAction<Homestay[]>) => {
            state.homestays = actions.payload
            state.searchedHomestays = actions.payload
        },
        searchHomestays: (state,actions: PayloadAction<Homestay[]>) => {
            state.searchedHomestays = actions.payload
        },
        // addRoomToCart: (state,actions: PayloadAction<roomCartType[]>) => {
        //     state.roomCart = actions.payload
        // }
    }
})

export const InitailLoad = () => async (dispatch: Dispatch) => {
    try {
        const res = await fetcher.get("/homestay") 
        if (res.status === 200) {
            dispatch(appActions.loadHomestays(res.data))
        }
        if (!!localStorage.getItem("token")){
            const res2 = await fetcher.get("/user/me",{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res2.status === 200) {
                dispatch(userActions.loadUser(res2.data))
            }else {
                localStorage.removeItem("token")
            }
            const res3 = await fetcher.get(`/booking/user`,{
                headers: {
                    "Authorization" : `Bearer ${localStorage.getItem("token")}`
                }
            })
            if (res3.status === 200) {
                dispatch(userActions.loadBookings(res3.data))
            }
        } 
    } catch (error) {
        console.log(error)
    }
}

export const SearchHomestays = (homestays: any[],key: string,value: any) =>  (dispatch: Dispatch) => {
    const newHomestays = homestays.filter(hs=> hs[key].toLowerCase().includes(value)) as Homestay[]
    dispatch(appActions.searchHomestays(newHomestays))
}

// export const AddRoomToCart = (roomCarts: roomCartType[],homestayId: string,room: Room) => (dispatch: Dispatch) => {
//     const index = roomCarts.findIndex(rc => rc.homestayId === homestayId)
//     if (index === -1) {
//        roomCarts.push({
//            homestayId: homestayId,
//            rooms: [{quantity: 1,room: room}]
//        })
//     }else {
//        const rc = roomCarts[index]
//        const ri = rc.rooms.findIndex(r => r.room.id === room.id)
//        if (ri === -1){
//            rc.rooms.push({quantity: 1,room: room})
//        }else {
//            rc.rooms[ri].quantity++
//        }
//     }
// }

export const appActions = appSlice.actions
export const appReducer = appSlice.reducer