import React from "react";
import { Link } from "react-router-dom";
import { AiOutlineSafety } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { ImCross } from "react-icons/im";

const Info = () => {
  return (
    <div className="bg-gradient-to-b from-indigo-900 to-black min-h-screen text-white p-4">
      <nav className="bg-gray-900 fixed w-full z-10 top-0 left-0">
        <div className=" px-4 sm:px-6 lg:px-20">
          <div className="flex items-center justify-between h-24">
            <div className="flex text-2xl hover:text-blue-500 items-center">
              <Link to="/info">Stake Info</Link>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex px-12 mt-40 h-72">
        <div className="w-3/4 bg-gray-700  p-10">
          {/* Content for the left box */}
          <h1 className="text-3xl font-bold mb-4">Deploy</h1>

          <div className="flex flex-col space-y-7 pr-20 ">
            <div className="flex items-center justify-end">
              <label className="px-3 text-white">Rewards</label>
              <input type="checkbox" className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-end">
              <label className="px-3 text-white">Shares</label>
              <input type="checkbox" className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex items-center justify-end">
              <label className="px-3 text-white">Options</label>
              <input type="checkbox" className=" h-5 w-5 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="px-12 flex items-center justify-end">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            General Stats
          </button>
        </div>
      </div>

      <div className="flex px-12 py-32 h-full">
        <div class="h-full  flex w-full gap-20  overflow-x-auto ">
          <table class="w-full text-sm text-left rtl:text-right text-white dark:text-gray-400">
            <thead class="text-xl text-white bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" class="px-6 py-3">
                  Contracts
                </th>
                <th scope="col" class="px-6 py-3">
                  Annotations
                </th>
                <th scope="col" class="px-6 py-3">
                  Funds
                </th>
                <th scope="col" class="px-6 py-3">
                  Add Funds
                </th>
                <th scope="col" class="px-6 py-3">
                  Health
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-white whitespace-nowrap dark:text-white">
                  0x1234...abcd
                </th>
                <td class="px-6 py-4 text-2xl">France</td>
                <td class="px-6 py-4 text-2xl">$3950</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl">+</button></td>
                <td class="px-6 py-4 text-white text-3xl"><IoIosWarning/></td>
              </tr>
              <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-white whitespace-nowrap dark:text-white">
                  0x5678...ef01
                </th>
                <td class="px-6 py-4 text-2xl">Japan</td>
                <td class="px-6 py-4 text-2xl">$347</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl">+</button></td>
                <td class="px-6 py-4 text-3xl text-white"><AiOutlineSafety/></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  0x9abc...2345
                </th>
                <td class="px-6 py-4 text-2xl">Estonia</td>
                <td class="px-6 py-4 text-2xl">$975</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl ">+</button></td>
                <td class="px-6 py-4 text-3xl"><ImCross/></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  0xdef0...6789
                </th>
                <td class="px-6 py-4 text-2xl">India</td>
                <td class="px-6 py-4 text-2xl">$870</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl">+</button></td>
                <td class="px-6 py-4 text-3xl text-white"><AiOutlineSafety/></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  0x0123...cdef
                </th>
                <td class="px-6 py-4 text-2xl">Brazil</td>
                <td class="px-6 py-4 text-2xl">$712</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl">+</button></td>
                <td class="px-6 py-4 text-3xl text-white"><AiOutlineSafety/></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  0x4567...89ab
                </th>
                <td class="px-6 py-4 text-2xl">Ireland</td>
                <td class="px-6 py-4 text-2xl">$1002</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl">+</button></td>
                <td class="px-6 py-4 text-3xl text-white"><AiOutlineSafety/></td>
              </tr><tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  0x89ab...cdef
                </th>
                <td class="px-6 py-4 text-2xl">Norway</td>
                <td class="px-6 py-4 text-2xl">$462</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl">+</button></td>
                <td class="px-6 py-4 text-3xl text-white"><ImCross/></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  0xcdef...0123
                </th>
                <td class="px-6 py-4 text-2xl">Italy</td>
                <td class="px-6 py-4 text-2xl">$341</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl">+</button></td>
                <td class="px-6 py-4 text-3xl text-white"><IoIosWarning/></td>
              </tr>
              <tr class="bg-white dark:bg-gray-800">
                <th
                  scope="row"
                  class="px-6 text-xl py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  0x4567...abc3
                </th>
                <td class="px-6 py-4 text-2xl">Nigeria</td>
                <td class="px-6 py-4 text-2xl">$991</td>
                <td class="px-6 py-4 text-white"><button className="bg-blue-600 rounded-full px-4 text-3xl">+</button></td>
                <td class="px-6 py-4 text-3xl text-white"><AiOutlineSafety/></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Info;
