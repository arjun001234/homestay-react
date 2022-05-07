import React from 'react'
import { useSelector } from 'react-redux'
import { roomCartType } from '../../redux/reducers/app'
import { RootState } from '../../redux/store'
import Room from '../rooms/room'
import {FiMinus} from 'react-icons/fi'

type roomCartProps = {
  roomCart: roomCartType
  removeFromCart: (roomId: string) => void
}

const RoomCart : React.FC<roomCartProps> = ({roomCart,removeFromCart}) => {

  return (
    <div className="room-cart">
      {roomCart.rooms.length === 0 && <h1>Click on room to add</h1>}
      {roomCart.rooms.map((r) => {
         return <section className='cart-item' key={r.room.id}>
           <div>
           <p>{r.room.roomType}</p>
           <p>X</p>
           <p>{r.quantity}</p>
           </div>
           <div>
             <p>&#8377; {r.room.price}</p>
           </div>
           <div>
             <FiMinus onClick={removeFromCart.bind(null,r.room.id)} />
           </div>
         </section>
      })}
      <section className='cart-total'>
         <p>Total</p>
         <p>&#8377; {roomCart.totalPrice}</p>
      </section>
    </div>
  )
}

export default RoomCart