import React from 'react'
import Header from './Header'
import Footer from './Footer'

const layout = ({children , setShowLogin}) => {
  return (
    <>
      <Header setShowLogin={setShowLogin}/>
         <div>{children}</div>
      <Footer/>
    </>
  )
}

export default layout
