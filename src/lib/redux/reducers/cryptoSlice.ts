import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  market_cap: number;
  image: string; 
}

interface CryptoState {
  data: Record<string, CryptoData>;
  isLoading: boolean;
  isError: boolean;
}

const initialState: CryptoState = {
  data: {},
  isLoading: false,
  isError: false,
} as CryptoState;

interface FetchCryptoPayload {
  name: string;
  data: CryptoData;
}

export const fetchCryptoData = createAsyncThunk<FetchCryptoPayload, string>(
  "crpto/fetch",
  async (name: string) => {
    try {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${name}`
      );
      const cryptoData: CryptoData = {
        id: response.data.id,
        symbol: response.data.symbol,
        name: response.data.name,
        current_price: response.data.market_data.current_price.usd,
        price_change_percentage_24h:
          response.data.market_data.price_change_percentage_24h,
        market_cap: response.data.market_data.market_cap.usd,
        image: response.data.image?.small,
      };
      return { name: response.data.id, data: cryptoData };
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
      throw error;
    }
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCryptoData.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchCryptoData.fulfilled, (state, action: PayloadAction<FetchCryptoPayload>) => {
        state.isLoading = false;
        state.isError = false;
        state.data[action.payload.name] = action.payload.data;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.error.message);
      });
  },
});

export default cryptoSlice.reducer;