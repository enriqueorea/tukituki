import "../styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { Navbar, Sidebar } from "../components";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <div>
      <Navbar />
      <div className="flex gap-6 md:gap-20">
        <div className="h-[92vh] overflow-hidden xl:overflow-auto">
          <Sidebar />
        </div>
        <div className="mt-4 flex flex-col overflow-auto gap-10 flex-1 h-[88vh] videos">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
};

export default MyApp;
