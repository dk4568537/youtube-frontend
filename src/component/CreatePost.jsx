import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReactPlayer from "react-player";

const VideoDetail = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/videos/${id}`);
        setVideo(response.data);
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };
    fetchVideo();
  }, [id]);

  return (
    <div>
      {video ? (
        <div>
          <h1>{video.title}</h1>
          <ReactPlayer
            url={`http://localhost:5000/${video.videoPath}`}
            controls
            width="100%"
          />
          <p>{video.description}</p>
        </div>
      ) : (
        <p>Loading video...</p>
      )}
    </div>
  );
};

export default VideoDetail;
