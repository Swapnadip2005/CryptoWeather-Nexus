"use client"

import React from "react";
import NewsItem from "./NewsItem";

const NewsCard: React.FC = () => {
  return (
    <div className="w-full md:w-1/2 bg-[#F3D9B1] dark:bg-[#141414] text-white rounded-2xl p-4 border-r-2 border-b-2 dark:border-2 border-[#6B4226] dark:border-[#212121]">
      <h2 className="text-2xl text-[#C65D3A] font-semibold mb-4 border-b border-[#6B4226] dark:border-[#212121] pb-2">
        📰 Latest News
      </h2>
      <ul className="space-y-4">
        <NewsItem />
      </ul>
    </div>
  );
};

export default NewsCard;
