import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

export interface NewsArticle {
  article_id: string;
  title: string;
  link: string;
  pubDate: string;
  source_id: string;
}

interface NewsState {
  articles: NewsArticle[];
  isLoading: boolean;
  isError: boolean;
}

const initialState: NewsState = {
  articles: [],
  isLoading: false,
  isError: false,
} as NewsState;

export const fetchTopCryptoNews = createAsyncThunk(
  "news/fetchTopCrypto",
  async () => {
    const API_KEY = process.env.NEXT_PUBLIC_NEWS_API_KEY;
    const url = `https://newsdata.io/api/1/latest?apikey=${API_KEY}&q=crypto&language=en&size=5`;

    try {
      const response = await axios.get(url);

      if (response.data.status === "success" && response.data.results) {
        const newsArticles: NewsArticle[] = response.data.results.map(
          (article: NewsArticle) => ({
            article_id: article.article_id,
            title: article.title,
            link: article.link,
            pubDate: article.pubDate,
            source_id: article.source_id,
          })
        );
        return newsArticles;
      } else {
        console.error("Error fetching news:", response.data);
        throw new Error(response.data.message || "Failed to fetch news");
      }
    } catch (error) {
      console.error("Error fetching top crypto news:", error);
      throw error;
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopCryptoNews.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(fetchTopCryptoNews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.articles = action.payload;
      })
      .addCase(fetchTopCryptoNews.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.error("Error:", action.error.message);
      });
  },
});

export default newsSlice.reducer;