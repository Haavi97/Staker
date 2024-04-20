import React from "react";
import { useCallback, useEffect, useState } from "react";
import LoggedInNav from "../components/LoggedInNav";
import SendERC20Button from "../components/SendERC20Button";

import {
  encodeFunctionData,
  parseAbiItem,
  getContract,
  parseEther,
  formatEther,
} from "viem";

import { VestingFactory, Vesting, ERC20 } from "../constants/sc";

import { useSelector } from "react-redux";
import LoginCard from "../components/LoginCard";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { AiOutlineSafety } from "react-icons/ai";
import { IoIosWarning } from "react-icons/io";
import { ImCross } from "react-icons/im";

const Staking = () => {
  const [init, setInit] = useState(false);
  const [tokenAddress, setTokenAddress] = useState(ERC20.ADDRESS);
  const [apy, setApy] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [baseReward, setBaseReward] = useState("");
  const [swapRate, setSwapRate] = useState("");
  const [lastDeployed, setLastDeployed] = useState("");
  const [txHash, setTxHash] = useState("");

  const userData = useSelector((state) => state.user.userData);

  const [provider, setProvider] = useState();

  useEffect(() => {
    try {
      console.log("User Data in Staking Page:", userData);
      console.log("Provider in Staking Page:", provider);
      if (userData.provider) setProvider(userData.provider);
    } catch (e) {
      console.log(e);
    }
  }, [userData, provider]);

  const getEvents = async () => {
    const filter = await provider.createEventFilter({
      address: VestingFactory.ADDRESS,
      event: parseAbiItem(
        "event VestingContractCreated(address indexed vestingContract, address indexed owner)",
      ),
    });
    const logs = await provider.getFilterLogs({ filter });
    console.log("logs", logs);
  };

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = (container) => {
    console.log(container);
  };

  useEffect(() => {
    console.log("User Data in Staking Page:", userData);
  }, [userData]);

  useEffect(() => {
    if (provider) {
      getEvents();
    }
  }, [provider]);

  const handleDeploy = () => {
    deployVestingContract();
  };

  const deployVestingContract = async () => {
    try {
      if (!baseReward || !apy || !swapRate || !timePeriod) {
        window.alert("Please fill in all fields");
        return;
      }
      console.log("Deploying contract");
      console.log("Token address:", tokenAddress);
      console.log("Base reward:", baseReward);
      console.log("APY:", apy);
      console.log("Swap rate:", swapRate);
      console.log("Time period:", timePeriod);
      console.log("VestingFactory:", VestingFactory.ADDRESS);
      console.log(
        "encoded:",
        encodeFunctionData({
          abi: VestingFactory.ABI,
          functionName: "createVestingContract",
          args: [tokenAddress, baseReward, apy, swapRate, timePeriod],
        }),
      );
      const { hash: uoHash } = await provider.sendUserOperation({
        uo: {
          target: VestingFactory.ADDRESS,
          data: encodeFunctionData({
            abi: VestingFactory.ABI,
            functionName: "createVestingContract",
            args: [tokenAddress, baseReward, apy, swapRate, timePeriod],
          }),
        },
      });
      console.log("UserOperation hash:", uoHash);
      const txHash = await provider.waitForUserOperationTransaction({
        hash: uoHash,
      });
      console.log("txHash", txHash);
      setTxHash(txHash);
      const tx = await provider.getTransactionReceipt({ hash: txHash });
      console.log("tx", tx);
      const contract = getContract({
        address: VestingFactory.ADDRESS,
        abi: VestingFactory.ABI,
        client: provider,
      });

      console.log("contract", contract);
      const logs = await contract.getEvents.VestingContractCreated();
      console.log("logs", logs);
      let count = await contract.read.count();
      console.log("count", count);
      count = parseInt(count.toString());
      console.log("count to Number", count);
      const deployedAddress = (
        await contract.read.getDeployedVestingContracts()
      )[count - 1];
      console.log("deployedAddress", deployedAddress);
      setLastDeployed(deployedAddress);
      if (txHash) {
        window.alert(
          "Contract deployed successfully. Tx: " +
            txHash +
            ". Address: " +
            deployedAddress,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-pink-600 to-black">
      <LoggedInNav />

      {/* <div className="absolute right-20 top-20 text-xl ">
        {userData ? userData.address : "NO USER"}
      </div> */}
      <h1 className="pt-10 text-center text-2xl font-bold text-white">
        Logged in as {userData?.details.name}
      </h1>
      <div className="mb-8 rounded-lg px-28 py-10 shadow-lg">
        <h2 className="mb-4 text-center text-xl font-semibold text-white">
          CREATE CONTRACT
        </h2>

        <div className="grid grid-cols-2 gap-4 ">
          <div>
            <label className="mb-1 block text-white">Token selection</label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="Enter token"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-white">APY</label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="0%"
              value={apy}
              onChange={(e) => setApy(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-white">Time period</label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="60 months"
              value={timePeriod}
              onChange={(e) => setTimePeriod(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-white">Base reward</label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="0.00"
              value={baseReward}
              onChange={(e) => setBaseReward(e.target.value)}
            />
          </div>
          <div>
            <label className="mb-1 block text-white">
              Token fixed swap rate
            </label>
            <input
              type="text"
              className="rounded-md bg-gray-900 px-4 py-2 text-white"
              placeholder="0 USDC per vested/staked token"
              value={swapRate}
              onChange={(e) => setSwapRate(e.target.value)}
            />
          </div>
          <div></div>
          <button
            className="mt-10 h-10 w-24 rounded-md bg-pink-600  text-white transition-colors duration-300 hover:bg-pink-700"
            onClick={handleDeploy}
          >
            DEPLOY
          </button>
          {/* <SendERC20Button provider={provider} address={ERC20.ADDRESS} /> */}
        </div>
      </div>
      <div className=" rounded-lg px-28 shadow-lg">
        <h2 className="mb-4 text-center text-xl font-semibold text-white">
          EXISTING CONTRACTS
        </h2>
        <div className="align-center flex justify-center">
          <table class="text-sm text-white  dark:text-gray-400">
            <thead class="bg-gray-700 text-xl text-white dark:bg-gray-700 dark:text-gray-400">
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
              <tr class="bg-gray-800 bg-gray-800 dark:bg-gray-800">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 text-xl font-medium text-white dark:text-white"
                >
                  0x9abc...2345
                </th>
                <td class="px-6 py-4 text-2xl">55</td>
                <td class="px-6 py-4 text-2xl">$975</td>
                <td class="px-6 py-4 text-white">
                  <button className="rounded-full bg-blue-600 px-4 text-3xl ">
                    +
                  </button>
                </td>
                <td class="px-6 py-4 text-3xl">
                  <ImCross />
                </td>
              </tr>
              <tr class="bg-gray-800  dark:bg-gray-800">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 text-xl font-medium text-white dark:text-white"
                >
                  0xdef0...6789
                </th>
                <td class="px-6 py-4 text-2xl">27</td>
                <td class="px-6 py-4 text-2xl">$870</td>
                <td class="px-6 py-4 text-white">
                  <button className="rounded-full bg-blue-600 px-4 text-3xl">
                    +
                  </button>
                </td>
                <td class="px-6 py-4 text-3xl text-white">
                  <AiOutlineSafety />
                </td>
              </tr>
              <tr class="bg-gray-800  dark:bg-gray-800">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 text-xl font-medium text-white dark:text-white"
                >
                  0x0123...cdef
                </th>
                <td class="px-6 py-4 text-2xl">41</td>
                <td class="px-6 py-4 text-2xl">$712</td>
                <td class="px-6 py-4 text-white">
                  <button className="rounded-full bg-blue-600 px-4 text-3xl">
                    +
                  </button>
                </td>
                <td class="px-6 py-4 text-3xl text-white">
                  <AiOutlineSafety />
                </td>
              </tr>
              <tr class="bg-gray-800  dark:bg-gray-800">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 text-xl font-medium text-white dark:text-white"
                >
                  0x4567...89ab
                </th>
                <td class="px-6 py-4 text-2xl">24</td>
                <td class="px-6 py-4 text-2xl">$1002</td>
                <td class="px-6 py-4 text-white">
                  <button className="rounded-full bg-blue-600 px-4 text-3xl">
                    +
                  </button>
                </td>
                <td class="px-6 py-4 text-3xl text-white">
                  <AiOutlineSafety />
                </td>
              </tr>
              <tr class="bg-gray-800  dark:bg-gray-800">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 text-xl font-medium text-white dark:text-white"
                >
                  0x89ab...cdef
                </th>
                <td class="px-6 py-4 text-2xl">49</td>
                <td class="px-6 py-4 text-2xl">$462</td>
                <td class="px-6 py-4 text-white">
                  <button className="rounded-full bg-blue-600 px-4 text-3xl">
                    +
                  </button>
                </td>
                <td class="px-6 py-4 text-3xl text-white">
                  <ImCross />
                </td>
              </tr>
              <tr class="bg-gray-800  dark:bg-gray-800">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 text-xl font-medium text-white dark:text-white"
                >
                  0xcdef...0123
                </th>
                <td class="px-6 py-4 text-2xl">12</td>
                <td class="px-6 py-4 text-2xl">$341</td>
                <td class="px-6 py-4 text-white">
                  <button className="rounded-full bg-blue-600 px-4 text-3xl">
                    +
                  </button>
                </td>
                <td class="px-6 py-4 text-3xl text-white">
                  <IoIosWarning />
                </td>
              </tr>
              <tr class="bg-gray-800  dark:bg-gray-800">
                <th
                  scope="row"
                  class="whitespace-nowrap px-6 py-4 text-xl font-medium text-white dark:text-white"
                >
                  0x4567...abc3
                </th>
                <td class="px-6 py-4 text-2xl">8</td>
                <td class="px-6 py-4 text-2xl">$991</td>
                <td class="px-6 py-4 text-white">
                  <button className="rounded-full bg-blue-600 px-4 text-3xl">
                    +
                  </button>
                </td>
                <td class="px-6 py-4 text-3xl text-white">
                  <AiOutlineSafety />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {init && (
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={{
            fpsLimit: 120,
            interactivity: {
              events: {
                onClick: {
                  enable: true,
                  mode: "push",
                },
                onHover: {
                  enable: true,
                  mode: "repulse",
                },
                resize: true,
              },
              modes: {
                push: {
                  quantity: 4,
                },
                repulse: {
                  distance: 200,
                  duration: 0.4,
                },
              },
            },
            particles: {
              color: {
                value: "#ffffff",
              },
              links: {
                color: "#ffffff",
                distance: 150,
                enable: true,
                opacity: 0.5,
                width: 1,
              },
              move: {
                direction: "none",
                enable: true,
                outModes: {
                  default: "bounce",
                },
                random: false,
                speed: 5,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 400,
                },
                value: 30,
              },
              opacity: {
                value: 0.5,
              },
              shape: {
                type: "circle",
              },
              size: {
                value: { min: 1, max: 6 },
              },
            },
            detectRetina: true,
          }}
        />
      )}
    </div>
  );
};

export default Staking;
