import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Posts = () => {
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await axios.get("http://localhost:5000/videos");
        setVideos(response.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  const handleVideoClick = (id) => {
    navigate(`/DetailPosts/${id}`); // Updated path to match the route
  };

  return (
    <div className="w-full pb-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 w-full">
        {videos.length > 0 ? (
          videos.map((video) => (
            <div
              className=""
              key={video._id}
              onClick={() => handleVideoClick(video._id)}
              style={{ cursor: "pointer" }}
            >
              <ReactPlayer
                className="videocontainer border border-gray-200 shadow rounded-lg h-24 sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px] w-full relative overflow-hidden rounded-t-lg"
                url={`http://localhost:5000/${video.videoPath}`}
                controls
                width="100%"
                height="100%"
                style={{ objectFit: "cover" }}
              />

              <div className="flex items-center mt-2 gap-2">
                <img
                  className="w-8 h-8 rounded-full"
                  src="/images/Danesh.jpg"
                  alt={`Thumbnail for ${video.title}`}
                />
               <div className=" flex flex-col w-44 ">
               <h2 className="truncate">{video.title}</h2>
               <p className=" truncate">{video.description}</p>
               </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full mt-5">No videos available</p>
        )}
      </div>
    </div>
  );
};

export default Posts;
