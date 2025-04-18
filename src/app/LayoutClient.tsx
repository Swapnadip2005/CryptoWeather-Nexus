"use client"

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import ReduxProvider from "./ReduxProvider";

interface LayoutClientProps {
  children: React.ReactNode;
}

const LayoutClient: React.FC<LayoutClientProps> = ({ children }) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
  
  return (
    <html
      lang="en"
      className={`${theme} w-full bg-[#FFF9D0] dark:bg-[#101010] px-4 py-6`}
    >
      <body className="border-2 rounded-xl border-[#E85A4F] dark:border-[#212121] p-4">
        <ReduxProvider>
          <Navbar
            toggleTheme={toggleTheme}
            currentTheme={theme}
          />
          <main>{children}</main>
        </ReduxProvider>
      </body>
    </html>
  );
};

export default LayoutClient;
