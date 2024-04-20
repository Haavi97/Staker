import React from "react";
import LoggedInNav from "../components/LoggedInNav";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  ArcElement,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const dataLines = {
  labels,
  datasets: [
    {
      label: "Rewards given",
      data: [600, 1100, 2000, 2800, 3700, 4500, 4900],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

const options = {
  plugins: {
    legend: {
      labels: {
        color: "white",
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white",
      },
    },
    y: {
      ticks: {
        color: "white",
      },
    },
  },
  elements: {
    point: {
      backgroundColor: "rgba(255, 255, 255, 1)",
      borderColor: "rgba(255, 255, 255, 1)",
    },
    line: {
      borderColor: "rgba(255, 99, 132, 1)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  },
};

const Entity = () => {
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    console.log("User Data:", userData);
  }, [userData]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-600 to-black text-white">
      <LoggedInNav />
      <div className="mb-4 flex items-center justify-center  text-center">
        <h1 className="mt-10 text-2xl font-bold ">
          Logged in as {userData?.details.name}
        </h1>
      </div>

      <div className="justify-center">
        <div className="align-center max-w-4xl justify-center pl-96">
          <h2 className="text-center font-bold">Accumulated rewards</h2>
          <Line data={dataLines} options={options} />
        </div>
        <div className="align-center pt-18 mt-12 flex justify-center space-x-2">
          <button className="max-h-16 rounded bg-purple-700 px-4 py-2 font-semibold text-white hover:bg-purple-800">
            Claim
          </button>
          <button className="max-h-16 rounded  bg-purple-700 px-4 py-2 font-semibold text-white hover:bg-purple-800">
            Send
          </button>
          <button className="max-h-16    w-20 rounded bg-purple-700  px-4 py-2 font-semibold text-white hover:bg-purple-800">
            $
          </button>
        </div>
      </div>
    </div>
  );
};

export default Entity;
