import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Booking from './booking'

const Bookings = () => {

  const bookings = useSelector((state: RootState) => state.user.userBookings)

  if (bookings.length === 0) {
       return <div>
           <p>No Bookings made yet</p>
       </div>
  }

  return (
    <div className='booking-container'>
        <h1>Bookings</h1>
        {bookings.map((booking,index) => {
            return <Booking key={booking.id} booking={booking}/>
        })}
    </div>
  )
}

export default Bookings