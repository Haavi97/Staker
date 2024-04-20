import React from "react";
import { useEffect } from "react";
//import { useUserData } from "../context/UserContext.jsx";
import { useSelector } from "react-redux";

const Staking = () => {
  const userData = useSelector((state) => state.userData); // Adjust the path as necessary

  useEffect(() => {
    console.log("User Data in Staking Page:", userData);
  }, [userData]); // Logging the userData when it changes

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-pink-600 to-black">
      <div className="px-20 py-12 text-white  ">
        <h1 className="text-4xl font-bold">STAKING</h1>
        <p className="text-lg">Here do staking and stuff</p>
      </div>

      <div className="absolute right-20 top-10 text-xl ">
        {userData ? userData.address : "test"}
      </div>

      {/* <div className="absolute right-20 top-10 text-xl ">0xA7B2C9F3</div> */}

      <div className="mb-8 rounded-lg px-28 py-10 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">
          CREATE CONTRACT
        </h2>
        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label className="mb-1 block text-white">Token selection</label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="Enter token"
            />
          </div>
          <div>
            <label className="mb-1 block text-white">APY</label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="0%"
            />
          </div>
          <div>
            <label className="mb-1 block text-white">Time period</label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="1 year"
            />
          </div>
          <div>
            <label className="mb-1 block text-white">Base award</label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="0.00"
            />
          </div>
          <div>
            <label className="mb-1 block text-white">
              Token fixed yield/rate
            </label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="0%"
            />
          </div>
          <div></div>
          <button className="mt-10 h-10 w-24 rounded-md bg-pink-600  text-white transition-colors duration-300 hover:bg-pink-700">
            DEPLOY
          </button>
        </div>
      </div>

      <div className=" rounded-lg px-28 shadow-lg">
        <h2 className="mb-4 text-xl font-semibold text-white">
          EXISTING CONTRACTS
        </h2>
        <div className="flex w-72 flex-col gap-4">
          <div className="rounded-md bg-gray-500 px-4 py-4 text-white">
            0x9Fa5...b7dE
          </div>
          <div className="rounded-md bg-gray-500 px-4 py-4 text-white">
            0x2C8B...e4Ff
          </div>
          <div className="rounded-md bg-gray-500 px-4 py-4 text-white">
            0x6D1E...c2A9
          </div>
          <div className="rounded-md bg-gray-500 px-4 py-4 text-white">
            0xBb7C...f3De
          </div>
          <div className="rounded-md bg-gray-500 px-4 py-4 text-white">
            0x4Ec2...a8Bc
          </div>
          <div className="rounded-md bg-gray-500 px-4 py-4 text-white"></div>
          <div className="rounded-md bg-gray-500 px-4 py-4 text-white"></div>
          <div className="rounded-md bg-gray-500 px-4 py-4 text-white"></div>
          <div className="bg-gray-00 rounded-md px-4 py-4 text-white"></div>
        </div>
      </div>
    </div>
  );
};

export default Staking;
