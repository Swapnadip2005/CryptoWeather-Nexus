"use client";

import React from "react";
import WeatherCard from "@/components/WeatherCard";
import CryptoCard from "@/components/CryptoCard";
import NewsCard from "@/components/NewsCard";
import Footer from "@/components/Footer";

const Home: React.FC = () => {
  const cities = ["London", "Tokyo", "New York"];

  return (
    <main className="flex flex-col items-center justify-center bg-[#FFF9D0] dark:bg-[#101010]">
      <div className="w-full rounded-xl flex flex-col">
        {/* Container for the main content (Weather, Crypto, News) */}
        <div className="w-full flex flex-col">
          <div className="w-full flex flex-wrap md:flex-nowrap justify-between gap-4 mb-4 mt-4">
            {cities.map((city: string) => (
              <WeatherCard key={city} city={city} />
            ))}
          </div>

          <div className="flex flex-wrap md:flex-nowrap justify-between gap-4">
            <CryptoCard />
            <NewsCard />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Home;
