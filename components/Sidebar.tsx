import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import GoogleLogin from "react-google-login";
import { AiFillHome, AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { Discover, Footer, SuggestedAccounts } from "./";

const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const [userProfile, setUserProfile] = useState(false);

  const normalLink =
    "flex items-center gap-3 hover:bg-primary p-3 justify-center xl:justify-start cursor-pointer font-semibold text-[#F51997] rounded";
  return (
    <div>
      <button
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar((prev) => !prev)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </button>
      {showSidebar && (
        <div className="xl:w-400 w-20 flex flex-col justify-start mb-10 border-r-2 border-gray-200 xl:border-0 p-3 ">
          <div className="xl:border-r-2 border-gray-300 xl:pb-4">
            <Link href="/">
              <div className={normalLink}>
                <p className="text-2xl">
                  <AiFillHome />
                </p>
                <span className="text-xl hidden xl:block">For You</span>
              </div>
            </Link>
          </div>
          {/* {!userProfile && (
            <div className="px-2 py-4 hidden xl:block">
              <p className="text-gray-400 ">Log in to like & comment</p>
              <div className="pr-4">
                <GoogleLogin
                  clientId="YOUR_CLIENT_ID"
                  render={(renderProps) => (
                    <button
                      className="bg-white text-lg text-[#F51997] border-[1px] border-[#F51997] rounded-md w-full outline-none mt-3 hover:text-white hover:bg-[#F51997] p-2"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      Log in with Google
                    </button>
                  )}
                  onSuccess={() => {}}
                  onFailure={() => {}}
                  cookiePolicy={"single_host_origin"}
                />
              </div>
            </div>
          )} */}
          <Discover />
          <SuggestedAccounts />
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
