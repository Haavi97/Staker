import { React, useState } from "react";

import { encodeFunctionData, parseEther, formatEther } from "viem";

import { ERC20 } from "../constants/sc";

const SendERC20Button = ({ provider, address }) => {
  const [receiver, setReceiver] = useState("");
  const [amount, setAmount] = useState("");

  const handleClick = () => {
    sendERC20();
  };

  const sendERC20 = async () => {
    try {
      if (!receiver || !amount) window.alert("Please fill in all fields");
      const { hash: uoHash } = await provider.sendUserOperation({
        uo: {
          target: address,
          data: encodeFunctionData({
            abi: ERC20.ABI,
            functionName: "transfer",
            args: [receiver, parseEther(amount.toString())],
          }),
        },
      });
      console.log("UserOperation hash:", uoHash);
      const txHash = await provider.waitForUserOperationTransaction({
        hash: uoHash,
      });
      console.log("txHash", txHash);
      if (txHash) {
        window.alert(
          "ERC 20 successfully sent to: " +
            receiver +
            " Amount: " +
            amount +
            ". Tx:" +
            txHash,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="erc20-button">
      <button
        className="mt-10 h-10 rounded-md bg-pink-600  text-white transition-colors duration-300 hover:bg-pink-700"
        onClick={handleClick}
      >
        Send ERC20
      </button>
      <input
        type="text"
        placeholder="Receiver"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  );
};

export default SendERC20Button;
