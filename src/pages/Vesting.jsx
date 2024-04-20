import React, { useState } from "react";
import Lottie from "lottie-react";
import a from "../assets/anim2.json";
import img from "../assets/img.jpeg";
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
import { Pie } from "react-chartjs-2";
import { AiOutlineSafety } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { ImCross } from "react-icons/im";

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

export const data = {
  labels: ["Estonia", "Norway", "Holland", "Poland", "Finland"],
  datasets: [
    {
      label: "# of Tokens",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(54, 162, 235, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
        "rgba(153, 102, 255, 0.5)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const dataHealth = {
  labels: ["Critical", "Warning", "Good"],
  datasets: [
    {
      label: "# of vesting programs",
      data: [1, 2, 28],
      backgroundColor: [
        "rgba(255, 0, 0, 0.4)",
        "rgba(255, 255, 0, 0.5)",
        "rgba(0, 255, 16, 0.6)",
      ],
      borderColor: [
        "rgba(255, 0, 0, 1)",
        "rgba(255, 255, 0, 1)",
        "rgba(0, 255, 16, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

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
    {
      label: "Company liquidity",
      data: [4400, 3900, 3000, 2200, 1300, 500, 100],
      borderColor: "rgb(132, 99, 255)",
      backgroundColor: "rgba(132, 99, 255, 0.5)",
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

const Vesting = () => {
  const [files, setFiles] = useState([""]);
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    console.log("User Data:", userData);
  }, [userData]);

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-b from-pink-600 to-black text-white">
        <LoggedInNav />
        <div className="mb-4 flex items-center justify-center  text-center">
          <h1 className="pt-10 text-2xl font-bold ">
            Logged in as {userData?.details.name}
          </h1>
        </div>

        <div className="flex-center flex justify-center gap-32">
          <div className="w-72 pt-12">
            <Lottie animationData={a} />
          </div>

          <div className="flex-col">
            <h2 className="text-center text-2xl font-bold">
              Funds distribution
            </h2>
            <div className="size-64">
              <Pie data={data} options={options} />
            </div>
          </div>
          <div className="flex-col">
            <h2 className="text-center text-2xl font-bold">Health</h2>
            <div className="size-64">
              <Pie data={dataHealth} options={options} />
            </div>
          </div>
        </div>
        <div className="h-96 max-w-3xl pl-48 ">
          <h2 className="text-center text-2xl font-bold">
            Liquidity and rewards
          </h2>
          <Line data={dataLines} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Vesting;
