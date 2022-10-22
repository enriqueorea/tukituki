import axios from "axios";
import { Videos } from "../models/videos.model";
import { VideoCard, NoResults } from "../components";

interface IProps {
  videos: Videos[];
}

const Home = ({ videos }: IProps) => {
  return (
    <div className="flex flex-col gap-10 videos h-full">
      {videos.length ? (
        videos.map((video: Videos) => (
          <VideoCard post={video} key={video._id} />
        ))
      ) : (
        <NoResults text={"No Videos found"} />
      )}
    </div>
  );
};

export const getServerSideProps = async () => {
  const { data } = await axios.get(`http://localhost:3000/api/post`);

  return {
    props: {
      videos: data,
    },
  };
};

export default Home;
