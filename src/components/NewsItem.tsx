"use client"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopCryptoNews } from "../lib/redux/reducers/newsSlice";
import { RootState, AppDispatch } from "@/lib/redux/store";
import { FaRegNewspaper } from "react-icons/fa";

const NewsItem: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const newsArticles = useSelector((state: RootState) => state.news.articles);
  const isLoading = useSelector((state: RootState) => state.news.isLoading);
  const isError = useSelector((state: RootState) => state.news.isError);

  useEffect(() => {
    dispatch(fetchTopCryptoNews());
  }, [dispatch]);

  if (isLoading) {
    return (
      <li className="flex items-start gap-2">
        <FaRegNewspaper className="text-blue-400 mt-1 flex-shrink-0 animate-spin" />
        <span className="text-[#4B3E2A] dark:text-[#b89e79] text-sm leading-relaxed font-bold">
          Loading news headline...
        </span>
      </li>
    );
  }

  if (isError) {
    return (
      <li className="flex items-start gap-2">
        <FaRegNewspaper className="text-red-400 mt-1 flex-shrink-0" />
        <span className="text-[#4B3E2A] dark:text-[#b89e79] text-sm leading-relaxed font-bold">
          Error fetching news headline.
        </span>
      </li>
    );
  }

  return (
    <>
      {newsArticles.map((article) => (
        <li key={article.article_id} className="flex items-start gap-2">
          <FaRegNewspaper className="text-blue-400 mt-1 flex-shrink-0" />
          <p className="text-[#4B3E2A] dark:text-[#b89e79] text-medium leading-relaxed font-semibold">
            {article.title}.&nbsp;
            <a
              href={article.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 text-medium leading-relaxed font-bold hover:underline"
            >
              [Link]
            </a>
          </p>
        </li>
      ))}
    </>
  );
};

export default NewsItem;
