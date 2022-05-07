import React from 'react'
import {  Room as RoomType } from '../../redux/reducers/app'
import Room from './room'


type roomsProps = {
  rooms: RoomType[]
  addToCart: (room :RoomType) => void
}

const Rooms : React.FC<roomsProps> = ({rooms,addToCart}) => {
  return (
    <>
    {rooms.map((r) => {
    return <Room key={r.id} room={r} addToCart={addToCart} />
    })}
    </>
  )
}

export default Rooms