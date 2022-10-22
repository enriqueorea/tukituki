import "../styles/globals.css";
import { useState, useEffect } from "react";
import type { AppProps } from "next/app";
import { Navbar, Sidebar } from "../components";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  if (isSSR) return null;

  return (
    <GoogleOAuthProvider clientId={`${process.env.NEXT_PUBLIC_GOOGLE_KEY}`}>
      <div className="xl:w-[1200px] m-auto overflow-hidden h-[100vh]">
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
    </GoogleOAuthProvider>
  );
};

export default MyApp;
