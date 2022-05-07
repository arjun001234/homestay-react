import React from 'react'
import Header from './header'

type layoutProps = {
  children: React.ReactNode
}

const Layout : React.FC<layoutProps> = ({children}) => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  )
}

export default Layout