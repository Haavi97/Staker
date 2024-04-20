import React from "react";
import { Link } from "react-router-dom";
import hero from "../assets/landing-hero.png";

const Landing = () => {
  return (
    <div className="flex">
      <div className="mt-24 px-20">
        <h1 className="mb-3 font-inter text-7xl font-black text-white">
          STAKING SERVICES
        </h1>
        <h1 className="font-inter text-7xl font-black text-white">
          HERE WE ARE
        </h1>
        <h1 className="py-10 text-4xl font-normal text-white">
          shake the bake the cake the take
        </h1>

        <div className="mt-12 flex justify-start gap-36">
          <button className="h-12 w-52 rounded-full border-2 border-white bg-pink-500 px-10 text-lg font-bold text-white shadow shadow-white/45 transition-all duration-700 ease-out hover:bg-white hover:text-black">
            <Link>REGISTER</Link>
          </button>

          <button className="h-12 w-52 rounded-full border-2 border-white bg-pink-500 px-10 text-lg font-bold text-white shadow shadow-white/45 transition-all duration-700 ease-out hover:bg-white hover:text-black">
            <Link>DASHBOARD</Link>
          </button>
        </div>
      </div>
      <div className="overflow-hidden">
        <img className="max-y-[200px] mt-3 max-h-[550px]" src={hero} />
      </div>
    </div>
  );
};

export default Landing;
