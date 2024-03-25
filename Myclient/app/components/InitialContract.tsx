import { useState } from "react";
import Button from "./Button";
import { useWalletContext } from "../store/Wallet";

const InitiateContract = ({ contractAddress, contract, setInInitiate }) => {
  const [requirement, setRequirement] = useState("this is a mortage test");
  const [owerUsdtAmount, setOwerUsdtAmount] = useState(10);
  const [expirationTime, setExpirationTime] = useState(
    new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString()
  );

  const { connect, accounts } = useWalletContext();

  const initiateContract = async () => {
    if (contract) {
      try {
        const expirationTimestamp = Math.floor(
          new Date(expirationTime).getTime() / 1000
        );

        console.log(
          "account",
          accounts[1],
          "requirement",
          requirement,
          "owerUsdtAmount",
          owerUsdtAmount,
          "expirationTimestamp",
          expirationTimestamp
        );

        const result = await contract.methods
          .initiateContract(
            accounts[1],
            requirement,
            owerUsdtAmount,
            expirationTimestamp
          )
          .send({ from: accounts[0], gas: 3000000 });

        setInInitiate(result);
        console.log(result);
        // Contract initiated successfully
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="space-y-4">
      <Button
        disabled={contractAddress === ""}
        mode="primaryContainedShadow"
        onClick={initiateContract}
      >
        Initiate Contract
      </Button>

      <div>
        <label>Owner Address:</label>
        <>{accounts[1]}</>
      </div>

      <div>
        <label>thrid party Address:</label>
        <>{accounts[0]}</>
      </div>

      <div>
        <label>Requirement:</label>
        <input
          className="text-black"
          type="text"
          value={requirement}
          onChange={(e) => setRequirement(e.target.value)}
        />
      </div>
      <div>
        <label>USDT Amount:</label>
        <input
          className="text-black"
          type="number"
          value={owerUsdtAmount}
          onChange={(e) => setOwerUsdtAmount(e.target.value)}
        />
      </div>
      <div>
        <label>Expiration Time:</label>
        <input
          className="text-black"
          type="datetime-local"
          value={expirationTime}
          onChange={(e) => setExpirationTime(e.target.value)}
        />
      </div>
    </div>
  );
};

export default InitiateContract;
