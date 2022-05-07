import React from 'react'
import { Homestay as HomestayType } from '../../redux/reducers/app'
import {AiOutlineArrowRight} from 'react-icons/ai'

type singleHomestayProps = {
   homestay: HomestayType
}

const SingleHomestay : React.FC<singleHomestayProps> = ({homestay}) => {
  return (
    <section className='homestay-info'>
      <div>
         <img src={homestay.img[0]} />
      </div>
      <div>
         <h1>{homestay.name}</h1>
         <p>{homestay.desc}</p>
         <span>
            <p>Country</p>
            <AiOutlineArrowRight />
            <p>{homestay.country}</p>
         </span>
         <span>
            <p>State</p>
            <AiOutlineArrowRight />
            <p>{homestay.state}</p>
         </span>
         <span>
            <p>City</p>
            <AiOutlineArrowRight />
            <p>{homestay.city}</p>
         </span>
         <span>
            <p>Address</p>
            <AiOutlineArrowRight height={30} width={30} />
            <p>{homestay.address}</p>
         </span>
      </div>
   </section>
  )
}

export default SingleHomestay