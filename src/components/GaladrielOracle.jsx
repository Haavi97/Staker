import React, { useState } from "react";

import { Contract, ethers, Wallet } from "ethers";

import { ChatGpt } from "../constants/sc";

const rpcUrl = import.meta.env.VITE_RPC_URL;
if (!rpcUrl) throw Error("Missing RPC_URL in .env");
const privateKey = import.meta.env.VITE_PK;
if (!privateKey) throw Error("Missing PRIVATE_KEY in .env");
const contractAddress = import.meta.env.VITE_CHAT_CONTRACT_ADDRESS;
if (!contractAddress) throw Error("Missing CHAT_CONTRACT_ADDRESS in .env");

const provider = new ethers.providers.JsonRpcProvider(rpcUrl);
const wallet = new Wallet(privateKey, provider);
const contract = new Contract(contractAddress, ChatGpt.ABI, wallet);

function getChatId(receipt, contract) {
  let chatId;
  for (const log of receipt.logs) {
    try {
      const parsedLog = contract.interface.parseLog(log);
      if (parsedLog && parsedLog.name === "ChatCreated") {
        // Second event argument
        chatId = ethers.toNumber(parsedLog.args[1]);
      }
    } catch (error) {
      // This log might not have been from your contract, or it might be an anonymous log
      console.log("Could not parse log:", log);
      chatId = Number(log.topics[2]);
      console.log(`Chat ID: ${chatId}`);
    }
  }
  return chatId;
}

const GaladrielOracle = ({ provider, address }) => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [chatId, setChatId] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleClick = () => {
    sendMessage();
  };

  const sendMessage = async () => {
    try {
      if (!message) window.alert("Please fill in all fields");
      const prompt =
        "Extract the main vesting parameters from this legal contract to deploy a smart contract. Give a very short answer just containing a list of comma separated values but without any units: tokenAdress,timePeriod,tokenFixedSwapRate,APY,baseReward\n\n\n";
      const toSend = prompt + message;
      console.log(`Sending message: "${toSend}"`);
      const transactionResponse = await contract.startChat(toSend);
      const receipt = await transactionResponse.wait();
      console.log(`Message sent, receipt: `, receipt);
      console.log(`Message sent, tx hash: ${receipt.transactionHash}`);
      setTxHash(receipt.transactionHash);
      console.log(`Chat started with message: "${message}"`);
      const chatId = await getChatId(receipt, contract);
      console.log(`Created chat ID: ${chatId}`);
      setChatId(chatId);
      getMessageResponse(chatId);
    } catch (e) {
      console.log(e);
    }
  };
  const getMessageResponse = async (_chatId) => {
    try {
      console.log("Getting message response");
      if (_chatId) setChatId(_chatId);

      const messages = await contract.getMessageHistoryContents(
        _chatId ? _chatId : chatId,
      );
      console.log(messages);
      // const roles = await contract.getMessageHistoryRoles(chatId);
      const messageResponse = messages[messages.length - 1];
      console.log(messageResponse);
      setResponse(messageResponse);
    } catch (e) {
      console.log(e);
      console.log("Retrying in 2 seconds");
      console.log("Chat ID: ", chatId);
      if (chatId) setTimeout(getMessageResponse, 2000);
    }
  };

  return (
    <div className="erc20-button">
      <p>
        Ask the Galadriel oracle for the parameters inserting your legal
        agreement here:{" "}
      </p>
      <input
        type="text"
        placeholder="Chat"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        className="mt-10 h-10 rounded-md bg-pink-600  text-white transition-colors duration-300 hover:bg-pink-700"
        onClick={handleClick}
      >
        Send message
      </button>
      {/* <div>
        Message:
        <p>{message}</p>
      </div> */}
      <div>
        Response:
        <p>{response}</p>
      </div>
      <div>
        Galadriel tx hash:
        <p>{txHash}</p>
      </div>
    </div>
  );
};

export default GaladrielOracle;
