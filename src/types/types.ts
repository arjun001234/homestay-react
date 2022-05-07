import { Homestay, Room, roomCartType, User } from "../redux/reducers/app"

export enum  Errors {
    NOT_FOUND = "NOT_FOUND"
} 

export interface Booking {
    id: string,
    user: User,
    homestay: Homestay,
    bookingDate: string,
    from: string,
    to: string,
    totalPrice: number,
    rooms: {
        quantity: number,
        room: Room
    }[]
}

export type BookingInputType = {
    homestayId: string,
    from: string,
    to: string,
    rooms: {
        qunatity: number,
        room: Room
    }[]
}