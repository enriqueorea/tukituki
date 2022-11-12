import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { GoVerified } from "react-icons/go";
import { MdOutlineCancel } from "react-icons/md";
import { BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import axios from "axios";
import { Videos } from "../../models/videos.model";
import useAuthStore from "../../store/authStore";
import { Comments, LikeButton } from "../../components";

interface IProps {
  postDetails: Videos;
}

const Detail = ({ postDetails }: IProps) => {
  const [post, setPost] = useState<Videos>(postDetails);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();

  //user
  const { userProfile }: any = useAuthStore();

  const onVideoClick = () => {
    if (isPlaying) {
      videoRef?.current?.pause();
      setIsPlaying((prev) => !prev);
    } else {
      videoRef?.current?.play();
      setIsPlaying((prev) => !prev);
    }
  };

  useEffect(() => {
    if (post && videoRef?.current) {
      videoRef.current.muted = isMuted;
    }
  }, [post, isMuted]);

  const handleLike = async (like: boolean) => {
    if (userProfile) {
      const { data } = await axios.put(`http://localhost:3000/api/like`, {
        userId: userProfile._id,
        postId: post._id,
        like,
      });
      console.log(post);

      setPost({ ...post, likes: data.likes });
    }
  };

  if (!post) return null;
  return (
    <div className="flex w-full absolute left-0 top-0 bg-white flex-wrap lg:flex-nowrap">
      <div className="relative flex-2 w-[1000px] lg:w-9/12 flex justify-center items-center bg-blurred-img bg-no-repeat bg-cover bg-center">
        <div className="absolute top-6 left-2 lg:left-6 flex gap-6 z-50">
          <p className="cursor-pointer" onClick={() => router.back()}>
            <MdOutlineCancel className="text-white text-[35px]" />
          </p>
        </div>
        <div className="relative">
          <div className="lg:h-[100vh] h-[60vh]">
            <video
              ref={videoRef}
              muted={isMuted}
              loop
              onClick={onVideoClick}
              className="h-full cursor-pointer"
              src={post.video.asset.url}
            ></video>
          </div>
          <div>
            {!isPlaying && (
              <button onClick={onVideoClick}>
                <BsFillPlayFill className="text-white text-[50px] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50" />
              </button>
            )}
          </div>
        </div>
        <div className="absolute bottom-5 lg:bottom-10 right-5 lg:right-10 cursor-pointer">
          {isMuted ? (
            <button onClick={() => setIsMuted(false)}>
              <HiVolumeOff className="text-black text-2xl lg:text-4xl" />
            </button>
          ) : (
            <button onClick={() => setIsMuted(true)}>
              <HiVolumeUp className="text-black text-2xl lg:text-4xl" />
            </button>
          )}
        </div>
      </div>
      <div className="relative w-[1000px] md:w-[900px] lg:[700px]">
        <div className="lg:mt-20 mt-10">
          <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded">
            <div className="ml-4 md:w-20 md:h-20 w-16 h-16">
              <Link href={`/`}>
                <>
                  <Image
                    width={62}
                    height={62}
                    className={"rounded-full"}
                    src={post.postedBy.image}
                    alt={"profile picture"}
                    layout={"responsive"}
                  />
                </>
              </Link>
            </div>
            <div>
              <Link href={"/"}>
                <div className="mt-3 flex flex-col gap-2">
                  <p className="flex gap-2 items-center md:text-md font-bold text-primary">
                    {post.postedBy.userName}{" "}
                    <GoVerified className={"text-blue-500 text-md"} />
                  </p>
                  <p className="capitalize font-medium text-xs text-gray-500 hidden md:block">
                    {post.postedBy.userName}
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <p className="px-10 text-lg text-gray-700">{post.caption}</p>
          <div className="mt-10 px-10">
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleDislike={() => handleLike(false)}
                handleLike={() => handleLike(true)}
              />
            )}
          </div>
          <Comments />
        </div>
      </div>
    </div>
  );
};

//server side function
export const getServerSideProps = async ({
  params: { id },
}: {
  params: { id: string };
}) => {
  const { data } = await axios.get(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/post/${id}`
  );

  return {
    props: { postDetails: data },
  };
};

export default Detail;
