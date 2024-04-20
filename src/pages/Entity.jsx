import React from 'react'

const Entity = () => {
  return (
    <div className="bg-gradient-to-b from-violet-600 to-black min-h-screen text-white p-4">
      <div className="flex justify-center items-center text-center  mb-4">
        <h1 className="text-4xl font-bold mt-10 ">Mr banana</h1>
    </div>
    <div>
        <span className="absolute right-20 top-10 text-sm bg-blue-500 px-2 py-1 rounded-md">user0x898</span>
      </div>

      <div className='px-40'>
      <h2 className="text-lg font-semibold mb-2">EMPLOYEE</h2>
      <div className="flex gap-20 p-20 flex-col">
        <button className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 w-44 px-4 rounded">
          claim
        </button>
        <button className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 w-44 px-4 rounded">
          send
        </button>
        <button className="bg-blue-500 hover:bg-blue-800 text-white font-semibold py-2 w-44 px-4 rounded">
          $
        </button>
      </div>
      </div>
      <button className="mt-4 text-purple-400 hover:text-purple-300">graph again</button>
    </div>
  )
}

export default Entity