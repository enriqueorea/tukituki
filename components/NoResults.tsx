import React from "react";
import { NextPage } from "next";

interface IProps {
  text: string;
}

const NoResults: NextPage<IProps> = ({ text }: IProps) => {
  return <div>NoResults</div>;
};

export default NoResults;
