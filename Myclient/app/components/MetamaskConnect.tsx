"use client";
import React, { useState, useEffect } from "react";
import { useWalletContext } from "../store/Wallet";
import Web3 from "web3";

const MetamaskConnect = () => {
  const { connect, accounts } = useWalletContext();
  const [balance, setBalance] = useState<any>("");
  const web3 = new Web3(window.ethereum);

  useEffect(() => {
    const getBalance = async () => {
      console.log("test");
      if (accounts && accounts.length > 0) {
        const balance = await web3.eth.getBalance(accounts[0]);
        const erc20 = new web3.eth.Contract(
          [
            {
              constant: true,
              inputs: [],
              name: "name",
              outputs: [
                {
                  name: "",
                  type: "string",
                },
              ],
              type: "function",
            },
          ],
          "0x0000000000000000000000000000000000000000"
        );

        setBalance(web3.utils.fromWei(balance, "ether"));
      }
    };
    getBalance();
  }, [accounts]);

  return (
    <div className="flex flex-col">
      <div className=" flex-col"></div>
      <div className=" overflow-hidden text-ellipsis space-y-2 mt-2">
        <h2>First Account Balance: {balance}</h2>
        <div>
          Account List:
          {accounts.map((account, _i) => (
            <div key={account}>
              <span> {`${_i}: ${account}`}</span>
              <span>{}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MetamaskConnect;
