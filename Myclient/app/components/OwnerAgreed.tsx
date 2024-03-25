import { useState } from "react";
import Button from "./Button";
import { useWalletContext } from "../store/Wallet";
import Web3 from "web3";

const OwnerAgreed = ({ contract }) => {
  const { connect, accounts } = useWalletContext();
  const [targetAddress, setTargetAddress] = useState(accounts[0]);

  const onOk = async () => {
    const result = await contract.methods
      .transferCollateralToThridPartyPlatform(true, targetAddress)
      .send({
        from: accounts[1],
        value: Web3.utils.toWei("10", "ether"),
      });

    console.log(result);
  };

  return (
    <div className=" space-y-4">
      <h1 className=" font-bold">OwnerAgreed</h1>
      <div className="inline-flex space-x-4">
        <span>To Address:</span>
        <input
          className="text-black"
          type="text"
          value={targetAddress}
          onChange={(e) => setTargetAddress(e.target.value)}
        ></input>
      </div>
      <div className="inline-flex space-x-4">
        <Button onClick={onOk} mode="primaryContainedShadow">
          OK
        </Button>
        <Button mode="primaryContainedShadow">Cancel</Button>
      </div>
      <div>
        <label>Owner Address:</label>
        <>{accounts[1]}</>
      </div>
    </div>
  );
};

export default OwnerAgreed;
