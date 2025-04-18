"use client";

import React from "react";
import Image from "next/image";

const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#A8D8B9] px-4 py-2 border-b-2 border-[#6B4226] rounded-xl dark:bg-[#141414] dark:border-2 dark:border-[#212121] mt-4">
      <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-2 items-center">
        <a
          href="https://openweathermap.org/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold flex items-center gap-2 text-sm md:text-medium hover:underline text-center md:text-left text-[#6B4226] dark:text-[#EBEBEB] whitespace-nowrap justify-center md:justify-start"
        >
          Weather Data by{" "}
          <Image
            src="/openweather.png"
            width={80}
            height={80}
            alt="OpenWeatherMap Logo"
            className="bg-[#703624] p-1 rounded-sm"
          />
        </a>
        <a
          href="https://www.coingecko.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold flex items-center gap-2 text-sm md:text-medium hover:underline text-center text-[#6B4226] dark:text-[#EBEBEB] whitespace-nowrap justify-center"
        >
          Crypto by{" "}
          <Image
            src="/coingecko.avif"
            width={100}
            height={100}
            alt="Coingecko Logo"
            className="bg-green-500 p-1 rounded-sm"
          />
        </a>
        <a
          href="https://newsdata.io/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold flex items-center gap-2 text-sm md:text-medium hover:underline text-center md:text-right text-[#6B4226] dark:text-[#EBEBEB] whitespace-nowrap justify-center md:justify-end"
        >
          Crypto News by:
          <Image
            src="/newsdata.png"
            width={20}
            height={20}
            alt="Newsdata.io Logo"
          />
          <span className="bg-[#3a68d3] p-1 rounded-sm text-[#EBEBEB] font-semibold">Newsdata.io</span>
        </a>
      </div>
      <p className="text-sm md:text-medium mt-2 text-center font-semibold text-[#6B4226] dark:text-[#EBEBEB]">
        Made with ❤ by Swapnadip
      </p>
    </footer>
  );
};

export default Footer;