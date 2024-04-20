import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "../components/Nav";
import Landing from "../components/Landing";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function Home() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    const isUserLoggedIn = localStorage.getItem("userLoggedIn");
    console.log(isUserLoggedIn);
    if (isUserLoggedIn === "true") {
      navigate("/staking");
    } else {
      console.log(
        "In homepage user is not logged in, so we are doing nothing.",
      );
    }
  }, [userData]);

  return (
    <>
      <div className=" min-h-screen bg-gradient-to-b from-fuchsia-600 to-black">
        <Nav />
        <Landing />

        {/* <div className='right-20 top-10  absolute'>Wallet</div> */}
      </div>
    </>
  );
}

export default Home;
