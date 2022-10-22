import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { topics } from "../utils/constants";

const Discover = () => {
  const router = useRouter();
  const { topic } = router.query;
  const activeTopic =
    "xl:border-2 hover:bg-primary xl:border-[#F51997] px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#F51997]";
  const topicStyle =
    "xl:border-2 hover:bg-primary xl:border-gray-300 px-3 py-2 rounded xl:rounded-full flex items-center gap-2 justify-center cursor-pointer text-black";
  return (
    <div className="xl:border-b-2 xl:border-gray-300 pb-6">
      <p className="text-gray-500  m-3 mt-4 font-semibold hidden xl:block">
        Popular Topics
      </p>
      <div className="flex gap-3 flex-wrap">
        {topics.map((topicm) => (
          <Link href={`/?topic=${topicm.name}`} key={topicm.name}>
            <div className={topic === topicm.name ? activeTopic : topicStyle}>
              <span className="font-bold text-2xl md:text-md">
                {topicm.icon}
              </span>
              <span className="font-medium text-md hidden xl:block capitalize">
                {topicm.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Discover;
