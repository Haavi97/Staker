import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className=''>
        <div className='px-20 py-44'>
            <h1 className=' text-7xl text-white'>STAKING SERVICES</h1>
            <h1 className='text-4xl text-gray-400 py-10'>Shake the bake the cake the take</h1>
            
            <div className='justify-center flex gap-20'>
            <button className='mt-10 rounded-full py-4 bg-pink-400 border-2 border-white shadow-xl transition-all duration-300 hover:shadow-xl text-white px-10 hover:bg-white hover:text-black'>
                <Link>Register</Link>
            </button>

            <button className='mt-10 rounded-full py-4 bg-pink-400 border-2 border-white shadow-xl transition-all duration-300 hover:shadow-xl text-white px-8 hover:bg-white hover:text-black'>
                <Link>Dashboard</Link>
            </button>
            </div>
        </div>

        
        
    </div>
  )
}

export default Landing