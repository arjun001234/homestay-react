import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'

const ProfileInfo = () => {

  const user = useSelector((state: RootState) => state.user.user)

  if (!user) {
      return <div>Not Found</div>
  }

  return (
    <div className='profile-info'>
        <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
    </div>
  )
}

export default ProfileInfo