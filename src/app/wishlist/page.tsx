"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/lib/redux/store";
import WeatherCard from "@/components/WeatherCard";
import CryptoCurrency from "@/components/CryptoCurrency";
import { WeatherData } from "@/lib/redux/reducers/weatherSlice";
import { CryptoData } from "@/lib/redux/reducers/cryptoSlice";

const Wishlist: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<"cities" | "cryptos" | null>(
    "cities"
  );

  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  const handleFilterClick = (filter: "cities" | "cryptos") => {
    setActiveFilter(filter);
  };

  const filteredCities = wishlistItems.filter(
    (item): item is WeatherData => "city" in item
  );
  const filteredCryptos = wishlistItems.filter(
    (item): item is CryptoData => "symbol" in item
  );

  return (
    <div className="w-full flex-col md:flex-row items-center justify-between mt-4">
      {/* Wishlist - Search Bar - Cities/Cryptos */}
      <div className="w-full flex flex-wrap items-center md:justify-between justify-items-start mb-4 gap-3">
        <h1 className="w-full md:w-1/3 text-2xl font-bold text-[#379683] dark:text-[#46ffda]">
          Wishlist
        </h1>

        <div className="w-full md:w-1/2 flex items-center justify-items-start md:justify-end h-10">
          <div className="w-30 p-1 rounded-l-xl border-y-2 border-l-2 border-[#32A956] dark:border-[#212121] h-full flex items-center cursor-pointer">
            <div
              onClick={() => handleFilterClick("cities")}
              className={`${
                activeFilter === "cities"
                  ? "bg-[#A8D8B9] dark:bg-[#8f8f8f] text-[#278041]"
                  : ""
              } rounded-lg w-full h-8 text-center`}
            >
              <h1 className="font-semibold text-lg text-[#278041] dark:text-[#EBEBEB]">
                Cities
              </h1>
            </div>
          </div>
          <div className="w-30 p-1 border-y-2 border-r-2 rounded-r-xl border-[#32A956] dark:border-[#212121] h-full flex items-center cursor-pointer">
            <div
              onClick={() => handleFilterClick("cryptos")}
              className={`${
                activeFilter === "cryptos"
                  ? "bg-[#A8D8B9] dark:bg-[#8f8f8f] text-[#278041]"
                  : ""
              } w-full rounded-lg h-8 text-center`}
            >
              <h1 className="font-semibold text-lg text-[#278041] dark:text-[#EBEBEB]">
                Cryptos
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-wrap md:flex-nowrap justify-items-start gap-4 mb-4 mt-4">
        {activeFilter === "cities" || activeFilter === null ? (
          filteredCities.length > 0 ? (
            filteredCities.map((city) => (
              <WeatherCard key={city.id} city={city.city} />
            ))
          ) : (
            <p className="dark:text-[#EBEBEB] font-semibold">
              No cities added to the wishlist yet.
            </p>
          )
        ) : activeFilter === "cryptos" ? (
          filteredCryptos.length > 0 ? (
            filteredCryptos.map((crypto) => (
              <CryptoCurrency key={crypto.id} name={crypto.id} />
            ))
          ) : (
            <p className="dark:text-[#EBEBEB] font-semibold">
              No cryptos added to the wishlist yet.
            </p>
          )
        ) : null}
      </div>
    </div>
  );
};

export default Wishlist;