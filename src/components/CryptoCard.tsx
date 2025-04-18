"use client"

import React from "react";
import CryptoCurrency from "./CryptoCurrency";

const CryptoCard: React.FC = () => {

  const cryptos = ["bitcoin", "ethereum", "solana"];

  return (
    <div className="relative w-full md:w-1/2 bg-[#F9D57E] dark:bg-[#141414] border-r-2 border-b-2 dark:border-2 border-[#6B4226] dark:border-[#212121] p-4 rounded-xl text-white">
      <h2 className="text-3xl font-bold mb-4 text-[#6B4226] dark:text-[#ffb482]">
        Cryptocurrencies
      </h2>
      <div className="space-y-3">
        {cryptos.map((crypto: string) => (
          <CryptoCurrency key={crypto} name={crypto} />
        ))}
      </div>
    </div>
  );
};

export default CryptoCard;