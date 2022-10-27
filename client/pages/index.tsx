import { useState, useEffect } from "react";
import { contractAddress } from "../config";
import { ethers } from "ethers";

import library from "../abi/Library.json";

import { NextPage } from "next";

declare let window: any;

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState("");
  const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Metamask not detected");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });
      const goerliChainId = "0x5";
      if (chainId !== goerliChainId) {
        alert("You are not connected to Goerli network");
      }
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log("Error connecting to metamask: ", error);
    }
  };
  return (
    <div className="flex flex-col items-center bg-[#f3f6f4] text-[#6a50aa] min-h-screen pb-20">
      <div className="transition hover:rotate-180 hover:scale-106 transition duration-500 ease-in-out"></div>
      <h2 className="text-3xl font-bold mb-20 mt-12">
        Manage your personal Library
      </h2>
      {
        currentAccount === '' ?(
          <button className="text-2xl font-bold py-3 px-12 bg-[#f1c232] rounded-lg mb-10 hover:scale-105 transition" onClick={connectWallet}>Connect wallet</button>
        ):(
          <div className="text-3xl font-bold mb-20-12">
            <h4>Wallet connected: {currentAccount}</h4>
          </div>
        )
      }
    </div>
  );
};

export default Home;
