"use client"

import React from "react";
import Image from "next/image";
import { FaHeart } from "react-icons/fa";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { useRouter } from 'next/navigation';
import Link from "next/link";

interface NavbarProps {
  toggleTheme: () => void;
  currentTheme: "light" | "dark";
}

const Navbar: React.FC<NavbarProps> = ({ toggleTheme, currentTheme }) => {
  const router = useRouter();

  const handleWishlistClick = () => {
    router.push('/wishlist');
  };

  return (
    <header className="bg-[#A8D8B9] flex flex-col md:flex-row items-center justify-between px-4 py-4 border-b-2 border-[#6B4226] rounded-xl gap-4 md:gap-5 dark:bg-[#141414] dark:border-2 dark:border-[#212121]">
      {/* Left - Logo & Title */}
      <div className="w-full md:w-1/3 flex items-center justify-center md:justify-start gap-2">
        <Image
          src="/Logo.png"
          alt="CryptoWeather-Nexus Logo"
          width={50}
          height={50}
        />
        <h1 className="font-logo text-4xl md:text-3xl font-semibold text-[#E85A4F] text-center md:text-left dark:bg-gradient-to-b from-[#EBEBEB] to-[#75767D] dark:text-transparent dark:bg-clip-text">
          CryptoWeather-Nexus
        </h1>
      </div>

      {/* Center - Navigation Links */}
      <nav className="w-full md:w-1/3 flex flex:wrap justify-center font-bold text-xl gap-4">
        <Link href="/" className="hover:underline text-[#6B4226] dark:text-[#EBEBEB]">
          Dashboard
        </Link>
      </nav>

      {/* Right - Icons */}
      <div className="w-full md:w-1/3 flex items-center justify-center md:justify-end gap-4">
        <FaHeart
          className="w-6 h-6 cursor-pointer text-[#6B4226] dark:text-[#EBEBEB]"
          onClick={handleWishlistClick}
        />
        <div className="flex items-center">
          {currentTheme === "light" ? (
            <MdDarkMode className="w-7 h-7 text-[#6B4226]" onClick={toggleTheme} style={{ cursor: 'pointer' }} />
          ) : (
            <MdLightMode className="w-7 h-7 text-[#EBEBEB]" onClick={toggleTheme} style={{ cursor: 'pointer' }} />
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
