import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import axios from "axios";

const Detail = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Detail Page</h1>
      <p>id: {id}</p>
    </div>
  );
};

//server side function
export const getServerSideProps = async ({ params: { id } }) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`
  );
};

export default Detail;
