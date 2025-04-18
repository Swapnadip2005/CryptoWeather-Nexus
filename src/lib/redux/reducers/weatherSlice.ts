// weatherSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export interface WeatherData {
  id: number;
  city: string;
  temp: number;
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  condition: string;
  icon: string;
}

interface WeatherState {
  data: Record<string, WeatherData>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: WeatherState = {
  data: {},
  isLoading: false,
  isError: false,
} as WeatherState;

export const fetchWeatherData = createAsyncThunk(
  "weather/fetch",
  async (city: string) => {
    const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    try {
      const response = await axios.get(url);
      const data: WeatherData = {
        id: response.data.id,
        city: response.data.name,
        temp: response.data.main.temp,
        humidity: response.data.main.humidity,
        windSpeed: response.data.wind.speed,
        feelsLike: response.data.main.feels_like,
        condition: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
      };
      return { city, data }; 
    } catch (error) {
      console.error(`Error fetching weather data for ${city}:`, error);
      throw error;
    }
  }
);

const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchWeatherData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.data[action.payload.city] = action.payload.data; 
      })
      .addCase(fetchWeatherData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("Error", action.payload);
      });
  },
});

export default weatherSlice.reducer;