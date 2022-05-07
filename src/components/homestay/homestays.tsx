import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import Homestay from './homestay'

const Homestays = () => {

  const app = useSelector((state: RootState) => state.app)

  if (app.searchedHomestays.length === 0) {
      <div>
          <h1>Not Found</h1>
      </div>
  }

  return (
    <div className="homestays">
       {app.searchedHomestays.map((hs) => {
           return <Homestay homestay={hs} key={hs.id} />
       })}
    </div>
  )
}

export default Homestays