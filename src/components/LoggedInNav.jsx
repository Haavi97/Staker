import { Link } from "react-router-dom";
import logo from "../assets/logo1.png";
import LoginCard from "./LoginCard";

function Nav() {
  return (
    <>
      <div className="hidden md:block">
        <div className="flex">
          <img className="h-24 w-24" src={logo} />
          <h1 className="py-8 pl-4 text-3xl text-white">Staker</h1>
        </div>
        <div className="absolute right-12 top-0 m-8 flex justify-end gap-16 ">
          <Link
            to="/staking"
            className="rounded-md py-2 text-xl font-medium text-white hover:text-black"
          >
            Staking
          </Link>
          <Link
            to="/vesting"
            className="rounded-md py-2 text-xl font-medium text-white hover:text-black"
          >
            Statistics
          </Link>
          <Link
            to="/entity"
            className="rounded-md py-2 text-xl font-medium text-white hover:text-black"
          >
            Worker
          </Link>
          <button className="h-10 w-48 rounded-full border-2 border-white bg-pink-500 text-lg font-bold text-white shadow shadow-white/45">
            <LoginCard />
          </button>
        </div>
      </div>
    </>
  );
}

export default Nav;
