'use client'
import React, { useState, useEffect } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";

const CurrentWalletAmount = () => {
    const { connection } = useConnection();
    const { publicKey } = useWallet();
    const [balance, setBalance] = useState(null);

    useEffect(() => {
        if (!publicKey || !connection) return;

        const fetchBalance = async () => {
            try {
                const balance = await connection.getBalance(publicKey);
                setBalance(balance);
            } catch (error) {
                console.error("Error fetching balance:", error);
            }
        };

        fetchBalance();

    }, [publicKey, connection]);

    return (
        <div>
            <h2>Wallet Balance</h2>
            {balance !== null ? (
                <p>{balance} SOL</p>
            ) : (
                <p>Loading balance...</p>
            )}
        </div>
    );
};

export default CurrentWalletAmount;
