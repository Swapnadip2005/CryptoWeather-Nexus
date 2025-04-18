"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchWeatherData } from "../lib/redux/reducers/weatherSlice";
import { addToWishlist, removeFromWishlist } from "../lib/redux/reducers/wishlistSlice";
import { Sun } from "lucide-react";
import { IoCloudyOutline } from "react-icons/io5";
import {
  WiCloudy,
  WiFog,
  WiRain,
  WiSnow,
  WiThunderstorm,
} from "react-icons/wi";
import { AppDispatch, RootState } from "../lib/redux/store";
interface WeatherProps {
  city: string;
}

const WeatherCard: React.FC<WeatherProps> = ({ city }) => {
  const dispatch: AppDispatch = useDispatch();
  const [isLiked, setIsLiked] = useState(false);
  const wishlistItems = useSelector((state: RootState) => state.wishlist.items);
  const weatherData = useSelector(
    (state: RootState) => state.weather.data[city]
  );
  const isLoading = useSelector((state: RootState) => state.weather.isLoading);
  const isError = useSelector((state: RootState) => state.weather.isError);

  useEffect(() => {
    dispatch(fetchWeatherData(city));
  }, [dispatch, city]);

  useEffect(() => {
    if (weatherData) {
      const alreadyInWishlist = wishlistItems.some(
        (item) => item.id === weatherData.id
      );
      setIsLiked(alreadyInWishlist);
    }
  }, [weatherData, wishlistItems]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
    if (weatherData) {
      if (!isLiked) {
        dispatch(addToWishlist(weatherData));
      } else {
        dispatch(removeFromWishlist(weatherData.id));
      }
    }
  };

  if (isLoading) {
    return (
      <div className="relative w-full md:w-1/3 bg-[#FCE38A] dark:bg-[#141414] border-r-2 border-b-2 border-[#6B4226] dark:border-2 dark:border-[#212121] rounded-2xl p-4 font-semibold text-[#6B4226]">
        Loading weather data for {city}...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="relative w-full md:w-1/3 bg-[#FCE38A] dark:bg-[#141414] border-r-2 border-b-2 border-[#6B4226] dark:border-2 dark:border-[#212121] rounded-2xl p-4 font-semibold text-[#6B4226]">
        Error fetching weather data.
      </div>
    );
  }

  if (!weatherData) {
    return null;
  }

  const { temp, humidity, windSpeed, feelsLike, condition, icon } = weatherData;

  const windSpeedKmH = isNaN(Number(windSpeed))
    ? "NaN"
    : (Number(windSpeed) * 3.6).toFixed(1);
  const capitalizedCondition: string =
    condition.charAt(0).toUpperCase() + condition.slice(1);

  let weatherIcon;

  switch (icon) {
    case "01d":
    case "01n":
      weatherIcon = <Sun className="text-yellow-400 w-20 h-20 mr-5" />;
      break;
    case "02d":
    case "02n":
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      weatherIcon = <WiCloudy className="text-gray-400 w-20 h-20 mr-5" />;
      break;
    case "09d":
    case "09n":
    case "10d":
    case "10n":
      weatherIcon = <WiRain className="text-blue-400 w-20 h-20 mr-5" />;
      break;
    case "13d":
    case "13n":
      weatherIcon = <WiSnow className="text-[#FFFAFA] w-20 h-20 mr-5" />;
      break;
    case "11d":
    case "11n":
      weatherIcon = (
        <WiThunderstorm className="text-yellow-500 w-20 h-20 mr-5" />
      );
      break;
    case "50d":
    case "50n":
      weatherIcon = <WiFog className="text-gray-300 w-20 h-20 mr-5" />;
      break;
    default:
      weatherIcon = (
        <IoCloudyOutline className="text-gray-400 w-20 h-20 mr-5" />
      );
      break;
  }

  return (
    <div className="relative w-full md:w-1/3 bg-[#FCE38A] dark:bg-[#141414] text-white border-r-2 border-b-2 border-[#6B4226] dark:border-2 dark:border-[#212121] rounded-2xl p-4">
      <button
        className="absolute top-3 right-3 text-gray-400 hover:text-red-500 transition"
        onClick={handleLikeClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill={isLiked ? "#6B4226" : "none"}
          stroke="#6B4226"
          strokeWidth="2"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      </button>

      <div className="w-full flex justify-between items-center mb-6">
        <div>
          <h2 className="text-3xl font-bold text-[#379683] dark:text-[#46ffda]">
            {city}
          </h2>
          <p className="text-4xl font-semibold mt-1 text-[#E85A4F] dark:text-[#ff6459]">
            {Math.round(Number(temp))}°C
          </p>
        </div>
        {weatherIcon}
      </div>

      <div className="w-full flex flex-col gap-y-2 text-sm">
        <div className="w-full grid grid-cols-2 gap-x-4">
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#6B4226] dark:text-[#ffc096]">
              Humidity
            </span>
            <span className="font-semibold text-[#6B4226]/80 dark:text-[#d17e47]">
              {humidity}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#6B4226] dark:text-[#ffc096]">
              Wind
            </span>
            <span className="font-semibold text-[#6B4226]/80 dark:text-[#d17e47]">
              {windSpeedKmH} km/h
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#6B4226] dark:text-[#ffc096]">
              Feels Like
            </span>
            <span className="font-semibold text-[#6B4226]/80 dark:text-[#d17e47]">
              {Math.round(feelsLike)}°
            </span>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg text-[#6B4226] dark:text-[#ffc096]">
              Condition
            </span>
            <span className="font-semibold text-[#6B4226]/80 dark:text-[#d17e47]">
              {capitalizedCondition}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;