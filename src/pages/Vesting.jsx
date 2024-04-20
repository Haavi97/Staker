import React, { useState } from "react";
import Lottie from "lottie-react";
import a from "../assets/anim2.json";
import img from "../assets/img.jpeg";
const Vesting = () => {
  const [files, setFiles] = useState([""]);

  const handleFileChange = (e) => {
    setFiles([...files, ...e.target.files]);
  };
  return (
    <div>
      <div className="text-white min-h-screen bg-gradient-to-b from-pink-600 to-black">
        <h1 className="md:px-20 px-8 py-12 font-extrabold text-4xl">VESTING</h1>

        <div className="absolute right-20 top-10">
          <button className="bg-black text-white rounded-full px-8 py-2">
            user
          </button>
        </div>

        <div className="flex gap-10 lg:gap-36 flex-col justify-between lg:flex-row items-center px-2 md:px-20">
          <div className="px-40 text-center">
            Add files
            <div className="flex justify-center">
              <label className="inline-block cursor-pointer bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded">
                <input
                  id="file-upload-1"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
                Vest
              </label>
              <label className="inline-block cursor-pointer bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded ml-4">
                CSV
                <input
                  id="file-upload-2"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
            <div className="mt-4">
              {files != "" && (
                <div>
                  <h3 className="text-lg font-bold mb-2">Selected Files:</h3>
                </div>
              )}
              <ul>
                {files.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="">
            <div className="w-96 md:mr-72">
              <Lottie animationData={a} />
            </div>
          </div>
        </div>

        <div className="px-20">
            <h1 className="text-2xl">Vesting Chart</h1>
          <img src="/pie.png" style={{ width: 500, height: 300 }} />
        </div>
      </div>
    </div>
  );
};

export default Vesting;
