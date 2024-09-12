import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";

const DetailPosts = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideoDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/videos/${id}`);
        setVideo(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching video details:", error);
        setError("Failed to load video details.");
        setLoading(false);
      }
    };

    fetchVideoDetails();
  }, [id]);

  if (loading) return <p>Loading video details...</p>;
  if (error) return <p>{error}</p>;

  if (!video) return <p>No video found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">{video.title || "Untitled Video"}</h1>
      <ReactPlayer
        url={`http://localhost:5000/${video.videoPath}`}
        controls
        width="100%"
        height="auto"
      />
      <p className="mt-4">{video.description || "No description available."}</p>
    </div>
  );
};

export default DetailPosts;
