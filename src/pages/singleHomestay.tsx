import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { string } from 'yup'
import SingleHomestay from '../components/homestay/singleHomestay'
import BookingModal from '../components/modals/bookingModal'
import Rooms from '../components/rooms/rooms'
import RoomCart from '../components/ui/roomCart'
import {  Homestay as HomestayType, Room, roomCartType } from '../redux/reducers/app'
import { RootState } from '../redux/store'
import {Errors} from '../types/types'

const SingleHomestayPage : React.FC = () => {

  const {id} = useParams()

  const [open,setOpen] = React.useState(false)
  const [roomCart,setRoomCart] = React.useState<roomCartType>({
    rooms: [],
    totalPrice: 0
  })

  const closeModal = () => {
      setOpen(false)
  }

  const addToCart = (room: Room) => {
    const rc = roomCart
        const index = rc.rooms.findIndex(r => r.room.id === room.id)
        if (index !== -1) {
          rc.rooms[index].quantity++
        }else {
          rc.rooms.push({quantity: 1,room: room})
        }
        rc.totalPrice += room.price
    setRoomCart({...rc})
  }

  const removeFromCart = (roomId: string) => {
    const rc = roomCart
    const index = rc.rooms.findIndex(r => r.room.id === roomId)
    if (index !== -1) {
      const room = rc.rooms[index]
      if (room.quantity > 1){
        room.quantity--
      }else {
        rc.rooms.splice(index,1)
      }
      rc.totalPrice -= room.room.price
    }
    setRoomCart({...rc})
  }

  const homestay = useSelector((state: RootState) => {
    const hs = state.app.homestays.find(hs => hs.id === id)
    if (hs){
      return hs
    }else {
      return Errors.NOT_FOUND
    }
  }) 

  if (homestay === Errors.NOT_FOUND){
    return <h1>Not Found</h1>
  }

  if (!homestay) {
    return <h1>Loading...</h1>
  }

  return (
    <div className="single-homestay">
        <SingleHomestay homestay={homestay} />
        <Rooms addToCart={addToCart} rooms={homestay.rooms} />
        <RoomCart removeFromCart={removeFromCart} roomCart={roomCart} />
        <button onClick={() => setOpen(true)}>Book</button>
        {open && <BookingModal closeModal={closeModal} roomCart={roomCart} />}
    </div>
  )
}

export default SingleHomestayPage