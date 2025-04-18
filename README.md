# 🌦️💰 CryptoWeather Nexus — Retro Meets Bento UI!

**CryptoWeather Nexus** is a multi-page, real-time dashboard that fuses **live weather updates**, **cryptocurrency insights**, and the **latest crypto news** — all packaged in a sleek, retro-style **Bento UI** layout.

## 🖥️ Live Preview

🔗 **Live Demo**: [CryptoWeather Nexus](https://lnkd.in/gsFwyMqm)

## 🛠️ Tech Stack

- **Next.js** – Fast, SEO-friendly framework with SSR/SSG
- **React.js** – For building dynamic and reusable components
- **TypeScript** – Ensuring type safety and better developer tooling
- **Tailwind CSS** – Utility-first styling for responsive design
- **Redux Toolkit** – Scalable global state management (Wishlist support)
- **Axios** – Elegant API handling

## ✨ Features

- ✅ Real-time **Weather Data** for London, Tokyo, and New York
- ✅ Live **Crypto Prices** for Bitcoin, Ethereum, and Solana
- ✅ Top 5 latest **Crypto News** in English
- ✅ **Dark Mode Toggle**
- ✅ **Wishlist Support** for your favorite cities & cryptos
- ✅ **Fully Responsive UI** with a retro & bento-style design
- ✅ Smooth user experience with optimized routing and prefetching

## 🔌 APIs Used

- 🌦 **[OpenWeather API](https://openweathermap.org/api)** – For real-time weather data
- 💰 **[CoinGecko API](https://www.coingecko.com/en/api)** – For crypto market insights
- 📰 **[NewsData.io API](https://newsdata.io/)** – For latest crypto news articles

## 🧪 How to Run Locally

#### 1. **Clone the repository**
Open your terminal and clone the repository to your local machine:
```bash
git clone https://github.com/your-username/cryptoweather-nexus.git
```
```bash
cd cryptoweather-nexus
```

#### 2. **Install dependencies**
Once you're in the project directory, install all the necessary dependencies:
```bash
npm install
```

### 3. **Create ``.env`` in the root directory for API keys**
NEXT_PUBLIC_WEATHER_API=your_openweather_api_key
NEXT_PUBLIC_NEWS_API= your_newsdata_api_key

> **Note: CoinGecko API does not require authentication for basic usage, so no key is needed for it.**

#### 4. **Start the development server**
Run the following command to start the Next.js development server:
```bash
npm run dev
```
The app will now be running locally at **[http://localhost:3000](http://localhost:3000)**.
