import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Input, useToast, VStack } from "@chakra-ui/react";
import { RxCross2 } from "react-icons/rx";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";

const Studio = () => {
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setdescription] = useState("");
  const [file, setFile] = useState(null);
  const [activeTab, setActiveTab] = useState("Videos");
  const [history, setHistory] = useState([]);

  const tabCategories = [
    { label: "Videos", id: 1, route: "/" },
    { label: "Shorts", id: 2, route: "/shorts" },
    { label: "Live", id: 3, route: "/live" },
    { label: "Posts", id: 4, route: "/posts" },
    { label: "Playlist", id: 5, route: "/playlist" },
    { label: "Podcast", id: 6, route: "/podcast" },
    { label: "Promotions", id: 7, route: "/promotions" },
  ];

  useEffect(() => {
    const fetchVideos = async () => {
      const response = await axios.get("http://localhost:5000/videos");
      setVideos(response.data);
    };
    fetchVideos();
  }, []);

  const handleVideoUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("video", file);

    await axios.post("http://localhost:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const response = await axios.get("http://localhost:5000/videos");
    setVideos(response.data);
  };

  const handleDeleteVideo = async (videoId) => {
    try {
      await axios.delete(`http://localhost:5000/videos/${videoId}`);
      setVideos(videos.filter((video) => video._id !== videoId));
    } catch (error) {
      console.error(
        "Error deleting video:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const handlePlay = (videoId) => {
    if (!history.includes(videoId)) {
      setHistory([...history, videoId]);
    }
  };
  
  const toast = useToast();

  const handleClick = () => {
    toast({
      title: "Notification",
      description: "Your Video uploaded successfully!",
      status: "info",
      duration: 5000,
      isClosable: true,
    });
  };

  const filteredVideos = videos.filter((video) => activeTab === "Videos");

  return (
    <div className=" sm:py-5 w-full">
      <div className="flex flex-wrap gap-3 text-xs sm:gap-6 md:gap-8 lg:gap-10 xl:gap-14 items-center border-b w-full">
        {tabCategories.map((tab) => (
          <Link
            key={tab.id}
            to={tab.route}
            className={`hover:border-b-2 border-black hover:text-gray-600 pb-2 cursor-pointer ${
              activeTab === tab.label ? "border-b-2 font-bold" : ""
            }`}
            onClick={() => setActiveTab(tab.label)}
          >
            {tab.label}
          </Link>
        ))}
      </div>
      <div className=" flex flex-wrap gap-4">
        <form
          className="flex flex-wrap mt-2 gap-3 sm:gap-2"
          onSubmit={handleVideoUpload}
        >
          <Input
            placeholder="Video Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={3}
            className="w-full sm:w-auto"
          />
          <Input
            placeholder="Video description"
            value={description}
            onChange={(e) => setdescription(e.target.value)}
            mb={3}
            className="w-full sm:w-auto"
          />
          <Input
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files[0])}
            mb={3}
            className="w-full pt-1 sm:w-auto"
          />
          <Button onClick={handleClick} type="submit" colorScheme="blue" className="w-full sm:w-auto">
            <p className="px-3 sm:px-10 text-xs sm:text-sm">Upload Video</p>
          </Button>
        </form>

        {activeTab === "Videos" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 mt-5 w-full">
            {filteredVideos.map((video) => (
              <div className="relative" key={video._id}>
                <ReactPlayer
                  className="videocontainer border border-gray-200 shadow rounded-lg h-24 sm:h-[140px] md:h-[160px] lg:h-[180px] xl:h-[200px] w-full relative overflow-hidden rounded-t-lg"
                  url={`http://localhost:5000/${video.videoPath}`}
                  controls
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                  onPlay={() => handlePlay(video._id)}
                />
                <button
                  className="absolute top-1 right-1 hover:bg-red-500 text-white p-1 rounded-full"
                  onClick={() => handleDeleteVideo(video?._id)}
                >
                  <RxCross2 />
                </button>
                <div className="flex items-center mt-2 gap-2">
                  <img
                    className="w-8 h-8 rounded-full"
                    src="/images/Danesh.jpg"
                    alt=""
                  />
                 <div className=" flex flex-col w-48 overflow-hidden">
                 <h2 className=" truncate ">{video.title}</h2>
                 <h2 className=" truncate ">{video.description}</h2>
                 </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Studio;
