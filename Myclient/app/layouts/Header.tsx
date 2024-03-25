"use client";

import { useState } from "react";
import Button from "../components/Button";
import detectEthereumProvider from "@metamask/detect-provider";
import { useWalletContext } from "../store/Wallet";

const Hedaer = () => {
  const { connect, accounts } = useWalletContext();

  return (
    <header className="flex justify-between bg-[#0d131c] bg-opacity-70">
      <div></div>
      <div>
        <Button mode="primaryContainedShadow" onClick={connect}>
          Connect
        </Button>
      </div>
    </header>
  );
};

export default Hedaer;
