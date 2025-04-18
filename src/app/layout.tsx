import { Metadata } from "next";
import "./globals.css";
import LayoutClient from "./LayoutClient";

export const metadata: Metadata = {
  title: "CryptoWeather-Nexus",
  description: "A basic dashboard for tracking cryptocurrency prices, weather information, and the latest crypto news",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <LayoutClient>
      {children}
    </LayoutClient>
  );
}