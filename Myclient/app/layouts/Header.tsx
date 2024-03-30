"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

const Hedaer = () => {
  const { publicKey, sendTransaction } = useWallet();
  return (
    <header className="flex justify-between bg-[#0d131c] items-center px-4 bg-opacity-70">
      <div>KEY: {publicKey && publicKey.toString()}</div>
      <div>
        <WalletMultiButton />
      </div>
    </header>
  );
};

export default Hedaer;
