import React from 'react'
import Header from './Header'
import Footer from './Footer'

const layout = ({children , setShowArea}) => {
  return (
    <>
      <Header setShowArea={setShowArea}/>
         <div>{children}</div>
      <Footer/>
    </>
  )
}

export default layout
