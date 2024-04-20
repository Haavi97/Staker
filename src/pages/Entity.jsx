import React from 'react'

const Entity = () => {
  return (
    <div className="bg-gradient-to-b from-black to-blue-900 min-h-screen text-white p-4">
      <div className="flex justify-center items-center text-center  mb-4">
        <h1 className="text-4xl font-bold mt-10 ">Mr banana</h1>
    </div>
    <div>
        <span className="absolute right-20 top-10 text-sm bg-blue-500 px-2 py-1 rounded-md">user0x898</span>
      </div>
      <h2 className="text-lg font-semibold mb-2">EMPLOYEE</h2>
      <div className="flex space-x-2">
        <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded">
          claim
        </button>
        <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded">
          send
        </button>
        <button className="bg-purple-700 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded">
          $
        </button>
      </div>
      <button className="mt-4 text-purple-400 hover:text-purple-300">graph again</button>
    </div>
  )
}

export default Entity