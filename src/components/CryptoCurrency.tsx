"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../lib/redux/store";
import { fetchCryptoData, CryptoData } from "@/lib/redux/reducers/cryptoSlice"; 
import {
  addToWishlist,
  removeFromWishlist,
} from "../lib/redux/reducers/wishlistSlice";
import Image from "next/image";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";

interface CryptoCurrencyProps {
  name: string;
}

const CryptoCurrency: React.FC<CryptoCurrencyProps> = ({ name }) => {
  const dispatch: AppDispatch = useDispatch();
  const cryptoData = useSelector(
    (state: RootState) => state.crypto.data[name] as CryptoData | undefined
  );
  const isLoading = useSelector((state: RootState) => state.crypto.isLoading);
  const isError = useSelector((state: RootState) => state.crypto.isError);
  const [isLiked, setIsLiked] = useState(false);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);

  useEffect(() => {
    dispatch(fetchCryptoData(name));
  }, [dispatch, name]);

  useEffect(() => {
    if (cryptoData) {
      const alreadyInWishlist = wishlistItems.some(
        (item) => String(item.id) === cryptoData.id
      );
      setIsLiked(alreadyInWishlist);
    }
  }, [cryptoData, wishlistItems]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (cryptoData) {
      if (!isLiked) {
        dispatch(addToWishlist(cryptoData));
      } else {
        dispatch(removeFromWishlist(cryptoData.id));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="relative flex flex-col bg-[#A8D8B9] dark:bg-[#101010] py-4 px-4 rounded-lg border-r-2 border-b-2 dark:border-2 border-[#32A956] dark:border-[#212121] text-[#379683] dark:text-[#74d8c4] font-semibold text-lg">
        Loading {name} data...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative flex flex-col bg-[#A8D8B9] dark:bg-[#101010] py-4 px-4 rounded-lg border-r-2 border-b-2 dark:border-2 border-[#32A956] dark:border-[#212121] text-[#379683] dark:text-[#74d8c4] font-semibold text-lg">
        Error fetching {name} data.
      </div>
    );
  }

  if (!cryptoData) {
    return null;
  }

  return (
    <div className="w-full space-y-4">
      <div className="w-full relative flex flex-col bg-[#A8D8B9] dark:bg-[#101010] py-4 px-4 rounded-lg border-r-2 border-b-2 dark:border-2 border-[#32A956] dark:border-[#212121]">
        {/* Top Row: Icon, Name, Price, Wishlist */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Left: Icon + Name */}
          <div className="flex items-center gap-2 min-w-0">
            <Image
              src={cryptoData.image}
              width={25}
              height={25}
              alt={cryptoData.name}
            />
            <span className="text-xl text-[#379683] dark:text-[#74d8c4] font-bold truncate">
              {cryptoData.name}{" "}
              <span className="font-semibold text-sm text-[#214e45]">
                {cryptoData.symbol?.toLocaleUpperCase()}
              </span>
            </span>
          </div>

          {/* Right: Price + Wishlist */}
          <div className="flex items-center gap-3">
            <span className="text-[#E85A4F] font-bold text-lg mr-7">
              ${cryptoData.current_price?.toLocaleString()}
            </span>
          </div>
          <button
            onClick={handleLikeClick}
            className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isLiked ? "#379683" : "none"}
              stroke="#379683"
              strokeWidth="2"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>
        </div>

        {/* Bottom Row: 24h Change + Market Cap */}
        <div className="text-sm mt-2 flex flex-wrap justify-between gap-1">
          <span className="flex items-center text-[#6B4226] dark:text-[#d3ab91] font-bold">
            24h Change:{" "}
            <span>
              {cryptoData.price_change_percentage_24h > 0 ? (
                <IoMdArrowDropup className="text-[#13692d]" />
              ) : (
                <IoMdArrowDropdown className="text-[#b3261e]" />
              )}
            </span>
            <span
              className={`${
                cryptoData.price_change_percentage_24h > 0
                  ? "text-[#13692d] dark:text-[#6ac284]"
                  : "text-[#b3261e] dark:text-[#e86961]"
              } font-semibold`}
            >
              {Math.abs(cryptoData.price_change_percentage_24h)?.toFixed(2)}%
            </span>
          </span>
          <span className="text-sm text-[#6B4226] dark:text-[#d3ab91] font-bold">
            Market Cap:{" "}
            <span className="text-[#13692d] dark:text-[#6ac284] font-semibold">
              ${cryptoData.market_cap?.toLocaleString()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default CryptoCurrency;
