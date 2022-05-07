import React from 'react'
import { Booking as BookingType } from '../../types/types'

type BookingProps = {
    booking: BookingType
}

const Booking : React.FC<BookingProps> = ({booking}) => {
  return (
    <div className='booking'>
        <section>
            <img src={booking.homestay.img[0]} />
            <p>{booking.homestay.name}</p>
        </section>
        <section>
            <div><p>Rooms:</p> {booking.rooms.map((room) => <p key={room.room.id}>{room.room.roomType} X {room.quantity}</p>)}</div>
        </section>
        <section>
            <p>Booking Date: {booking.bookingDate}</p>
        </section>
        <section>
            <p>Price: {booking.totalPrice}</p>
        </section>
    </div>
  )
}

export default Booking