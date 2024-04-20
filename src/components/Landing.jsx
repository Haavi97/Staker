import Lottie from 'lottie-react'
import React from 'react'
import { Link } from 'react-router-dom'
import a from '../assets/anim2.json'

const Landing = () => {
  return (
    <div className='flex md:flex-row flex-col'>
        <div className=' py-20'>
          <div className='px-20'>
            <h1 className="text-7xl bg-clip-text bg-gradient-to-r from-slate-200 to-gray-500 text-transparent">STAKING SERVICES</h1>
            <h1 className='text-4xl text-gray-400 py-10'>Shake the bake the cake the take</h1>
          </div>
            <div className='justify-center flex gap-20'>
            <button className='mt-10 rounded-full py-4 bg-pink-400 border-2 border-white shadow-xl transition-all duration-300 hover:shadow-xl text-white px-10 hover:bg-white hover:text-black'>
                <Link>Register</Link>
            </button>

            <button className='mt-10 rounded-full py-4 bg-pink-400 border-2 border-white shadow-xl transition-all duration-300 hover:shadow-xl text-white px-8 hover:bg-white hover:text-black'>
                <Link>Dashboard</Link>
            </button>
            </div>
        </div>
        <div>
        <div className="w-96 md:mr-72 md:py-20 ml-28">
              <Lottie animationData={a} />
            </div>
        </div>

        
        
    </div>
  )
}

export default Landing