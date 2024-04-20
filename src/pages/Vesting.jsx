import React from 'react'
import Lottie from 'lottie-react'
import a from '../assets/anim2.json'
const Vesting = () => {
  return (
    <div>
        <div className=' min-h-screen bg-gradient-to-b from-cyan-600 to-slate-800'>
        <h1 className='px-20 py-12 text-3xl'>VESTING</h1>
        <div className='p-44'>
        <div className='w-96 '><Lottie animationData={a}/></div>
        </div>
        </div>
    </div>
  )
}

export default Vesting