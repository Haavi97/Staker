import React from "react";
import { useEffect, useState } from "react";
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

const Staking = () => {
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
      <div className="px-20 py-12 text-white  ">
        <h1 className="text-4xl font-bold">STAKING</h1>
        <p className="text-lg">Here do staking and stuff</p>
      </div>

      <div className="absolute right-20 top-20 text-xl ">
        {userData ? userData.scaAddress : "NO USER"}
      </div>

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
