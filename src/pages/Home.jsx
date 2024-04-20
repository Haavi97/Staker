import { useState } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Landing from '../components/Landing'

function Home() {

  return (
    <>
      <div className=' min-h-screen bg-gradient-to-b from-pink-600 to-black'>
        <h1 className='px-20 py-12 text-3xl'>Staker</h1>
        <Nav/>
        <Landing/>
        
       
   
        {/* <div className='right-20 top-10  absolute'>Wallet</div> */}
      </div>
    </>
  )
}

export default Home
