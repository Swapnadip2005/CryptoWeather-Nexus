import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducers/weatherSlice";
import cryptoReducer from "./reducers/cryptoSlice";
import newsReducer from "./reducers/newsSlice";
import wishlistReducer from "./reducers/wishlistSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    crypto: cryptoReducer,
    news: newsReducer,
    wishlist: wishlistReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
