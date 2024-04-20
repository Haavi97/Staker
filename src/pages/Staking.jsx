import React from "react";

const Staking = () => {
  return (
    <div className="bg-gradient-to-b from-pink-600 to-black min-h-screen flex flex-col">
      <div className="text-white px-20 py-12  ">
        <h1 className="text-4xl font-bold">STAKING</h1>
        <p className="text-lg">Here do staking and stuff</p>
      </div>

      <div className="right-20 top-10 text-xl absolute ">0xA7B2C9F3</div>

      <div className="rounded-lg px-28 mb-8 py-10 shadow-lg">
        <h2 className="text-white text-xl font-semibold mb-4">
          CREATE CONTRACT
        </h2>
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label className="text-white block mb-1">Token selection</label>
            <input
              type="text"
              className="bg-gray-900 text-white rounded-md py-2 px-4"
              placeholder="Enter token"
            />
          </div>
          <div>
            <label className="text-white block mb-1">APY</label>
            <input
              type="text"
              className="bg-gray-900 text-white rounded-md py-2 px-4"
              placeholder="0%"
            />
          </div>
          <div>
            <label className="text-white block mb-1">Time period</label>
            <input
              type="text"
              className="bg-gray-900 text-white rounded-md py-2 px-4"
              placeholder="1 year"
            />
          </div>
          <div>
            <label className="text-white block mb-1">Base award</label>
            <input
              type="text"
              className="bg-gray-900 text-white rounded-md py-2 px-4"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="text-white block mb-1">
              Token fixed yield/rate
            </label>
            <input
              type="text"
              className="bg-gray-900 text-white rounded-md py-2 px-4"
              placeholder="0%"
            />
          </div>
          <div></div>
          <button className="bg-pink-600 mt-10 text-white w-24 h-10  rounded-md hover:bg-pink-700 transition-colors duration-300">
            DEPLOY
          </button>
        </div>
      </div>

      <div className=" rounded-lg px-28 shadow-lg">
        <h2 className="text-white text-xl font-semibold mb-4">
          EXISTING CONTRACTS
        </h2>
        <div className="flex flex-col w-72 gap-4">
          <div className="bg-gray-500 text-white py-4 px-4 rounded-md">
            0x9Fa5...b7dE
          </div>
          <div className="bg-gray-500 text-white py-4 px-4 rounded-md">
            0x2C8B...e4Ff
          </div>
          <div className="bg-gray-500 text-white py-4 px-4 rounded-md">
            0x6D1E...c2A9
          </div>
          <div className="bg-gray-500 text-white py-4 px-4 rounded-md">
            0xBb7C...f3De
          </div>
          <div className="bg-gray-500 text-white py-4 px-4 rounded-md">
            0x4Ec2...a8Bc
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Staking;
