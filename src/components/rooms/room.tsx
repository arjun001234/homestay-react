import React from 'react'
import { Room as RoomType } from '../../redux/reducers/app'

type roomProps = {
  room : RoomType
  addToCart: (room :RoomType) => void
}

const Room : React.FC<roomProps> = ({room,addToCart}) => {

  return (
    <div className="room-container" onClick={addToCart.bind(null,room)}>
      <section>
         <p>{room.roomType}</p>
         <p>Occupancy -{'>'} {room.occupancy}</p>
       </section>
       <section>
         <p>&#8377; {room.price}</p>
       </section>
    </div>
  )
}

export default Room