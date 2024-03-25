"use client";
import React, { useState, useEffect } from "react";
import { useWalletContext } from "../store/Wallet";
import Web3 from "web3";
import Button from "./Button";
import MortageABI from "../contracts/MortgageContract.json";
import InitiateContract from "./InitialContract";
import OwnerAgreed from "./OwnerAgreed";
import { Contract } from "web3";

const Mortage = () => {
  const { connect, accounts } = useWalletContext();
  const [balance, setBalance] = useState<any>("");
  const [contractAddress, setContractAddress] = useState(
    "0x1fFa09AcB2739339a4F50043F612E642982d619d"
  );
  const [contract, setContract] = useState<Contract>(null);

  const [inInitiate, setInInitiate] = useState("");

  const ganache_url = "http://127.0.0.1:7545";
  // const web3 = new Web3(window.ethereum);
  const web3 = new Web3(ganache_url);

  const handleInputChange = (event) => {
    setContractAddress(event.target.value);
  };

  const addContract = () => {
    const contractla = new web3.eth.Contract(MortageABI.abi, contractAddress);
    setContract(contractla);
    console.log("contract instance success", contractla);
  };

  return (
    <div className="flex flex-col ">
      <div className=" flex-col"></div>
      <div className=" overflow-hidden text-ellipsis space-y-2 mt-2">
        <h2>First Account Balance: {balance}</h2>
        <h1>Mortgage Contract</h1>

        {accounts.length > 0 && (
          <div className="space-y-4">
            <div className="space-x-2">
              address:
              <input
                className="text-black"
                type="text"
                value={contractAddress}
                onChange={handleInputChange}
                placeholder="Enter Contract Address"
              />
              <Button
                mode="primaryContainedShadow"
                onClick={() => addContract()}
              >
                set address
              </Button>
            </div>

            {contract && (
              <InitiateContract
                contractAddress={contractAddress}
                contract={contract}
                setInInitiate={setInInitiate}
              />
            )}
            { (
              <OwnerAgreed contract={contract} />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mortage;
