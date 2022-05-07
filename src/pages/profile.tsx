import React from 'react'
import Bookings from '../components/booking/bookings'
import ProfileInfo from '../components/profile/info'

const ProfilePage = () => {
  return (
    <div className='profile-container'>
        <ProfileInfo />
        <Bookings />
    </div>
  )
}

export default ProfilePage