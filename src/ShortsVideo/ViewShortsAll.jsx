import React, { useEffect, useState } from "react";
import { Button, Input } from "@chakra-ui/react";
import { TiFlash } from "react-icons/ti";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { AiFillLike } from "react-icons/ai";
import { BiSolidDislike } from "react-icons/bi";
import { MdInsertComment } from "react-icons/md";
import { IoIosShareAlt, IoMdSend } from "react-icons/io";
import { FaPause, FaPlay } from "react-icons/fa6";

// Dummy logo for comments
const dummyLogo = "https://via.placeholder.com/40.png?text=Logo"; // Placeholder image as a dummy logo
const tittle = "Big Buck Bunny";

const videos = [
  {
    id: "1",
    title: "Big Buck Bunny",
    views: "24,969,123",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself...",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "2",
    title: "The first Blender Open Movie from 2006",
    views: "24,969,123",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "3",
    title: "For Bigger Blazes",
    views: "24,969,123",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "4",
    title: "For Bigger Escape",
    views: "24,969,123",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
  {
    id: "5",
    title: "Big Buck Bunny",
    views: "24,969,123",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    description:
      "Big Buck Bunny tells the story of a giant rabbit with a heart bigger than himself. When one sunny day three rodents rudely harass him, something snaps... and the rabbit ain't no bunny anymore! In the typical cartoon tradition he prepares the nasty rodents a comical revenge.\n\nLicensed under the Creative Commons Attribution license\nhttp://www.bigbuckbunny.org",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "6",
    title: "For Bigger Blazes",
    views: "24,969,123",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
  {
    id: "7",
    title: "For Bigger Escape",
    views: "24,969,123",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    description:
      " Introducing Chromecast. The easiest way to enjoy online video and music on your TV—for when Batman's escapes aren't quite big enough. For $35. Learn how to use Chromecast with Google Play Movies and more at google.com/chromecast.",
    subscriber: "25254545 Subscribers",
    isLive: true,
  },
  {
    id: "8",
    title: "The first Blender Open Movie from 2006",
    views: "24,969,123",
    videoUrl:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    description:
      "Song : Raja Raja Kareja Mein Samaja\nAlbum : Raja Kareja Mein Samaja\nArtist : Radhe Shyam Rasia\nSinger : Radhe Shyam Rasia\nMusic Director : Sohan Lal, Dinesh Kumar\nLyricist : Vinay Bihari, Shailesh Sagar, Parmeshwar Premi\nMusic Label : T-Series",
    subscriber: "25254545 Subscribers",
    isLive: false,
  },
];

const Shorts = () => {
  const [playingVideo, setPlayingVideo] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);
  const [Likes, setLikes] = useState(0);
  const [Dislikes, setDislikes] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});
  const [commentVisibility, setCommentVisibility] = useState({});

  const togglePlayPause = (videoId) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null); // Pause the video if it’s currently playing
    } else {
      setPlayingVideo(videoId); // Play the video if it’s currently paused
    }
  };

  const handleMouseEnter = (videoId) => {
    setHoveredVideo(videoId); // Set the hovered video ID
  };

  const handleMouseLeave = () => {
    setHoveredVideo(null); // Clear the hovered video ID
  };

  const handleLikes = () => {
    setLikes(Likes + 1);
  };

  const handledisLike = () => {
    setDislikes(Dislikes + 1);
  };

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const handleAddComment = (videoId) => {
    if (comment.trim()) {
      setComments((prevComments) => ({
        ...prevComments,
        [videoId]: [...(prevComments[videoId] || []), comment],
      }));
      setComment(""); // Clear the comment input field
    }
  };



  const toggleCommentVisibility = (videoId) => {
    setCommentVisibility((prevState) => ({
      ...prevState,
      [videoId]: !prevState[videoId],
    }));
  };

  return (
    <>
      <h1 className="flex items-center font-bold text-xl my-4">
        <TiFlash className="text-red-500" />
        Shorts
      </h1>
      <div className="video-list flex justify-center items-center flex-col">
        <SwiperSlide>
          {videos.map((video) => (
            <div
              className="flex justify-center items-start gap-3"
              key={video.id}
            >
              <div className="flex justify-center items-start flex-col">
                {commentVisibility[video.id] && (
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <Input
                      type="text"
                      value={comment}
                      onChange={handleInputChange}
                      placeholder="Write a comment..."
                      style={{
                        flex: 1,
                        padding: "10px",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                        marginRight: "10px",
                      }}
                    />
                    <Button onClick={() => handleAddComment(video.id)}>
                      <IoMdSend />
                    </Button>
                  </div>
                )}
                {commentVisibility[video.id] && (
                  <div className="w-full">
                    {comments[video.id] &&
                      comments[video.id].map((comment, index) => (
                        <div
                          key={index}
                          className="flex  items-start bg-[#f8f9fa] p-2.5 rounded-md mb-2.5 border"
                        >
                          <div className=" flex justify-center items-start">
                            <img
                              src={dummyLogo}
                              alt="Logo"
                              className="mr-2 w-10 h-10 rounded-full"
                            />
                          </div>
                          <div className=" flex justify-center flex-col">
                            <p className=" font-semibold">{tittle}</p>
                            <p className="  w-52">{comment}</p>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>

              <div className="flex justify-center items-center flex-col mb-5">
                <div className="video-item w-96">
                  <Link
                    className="video-thumbnail relative"
                    onMouseEnter={() => handleMouseEnter(video.id)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className="videocontainer border h-[80vh]"
                      style={{ borderRadius: "10px", overflow: "hidden" }}
                    >
                      <ReactPlayer
                        url={video.videoUrl}
                        playing={playingVideo === video.id}
                        loop
                        controls={false}
                        width="100%"
                        height="100%"
                        style={{ objectFit: "cover" }}
                      />

                      <div className="video-details absolute bottom-4 left-4 text-white flex flex-col gap-0.5 pt-1">
                        <h3 className="video-title truncate multiline-ellipsis w-96">
                          {video.title} <Button size={"xs"}>Subscribe</Button>
                        </h3>
                        <p className="video-author text-sm w-80">
                          {video.author} {video.views} views
                        </p>
                        <p className="video-duration text-sm w-80">
                          {video.duration} {video.uploadTime}
                        </p>
                        <p className="video-description truncate multiline-ellipsis text-sm w-80">
                          {video.description}
                        </p>
                        <p className="video-subscriber text-sm">
                          {video.subscriber}
                        </p>
                        <div className="flex items-center gap-2">
                          {video.isLive && (
                            <Button
                              className="video-live-label absolute"
                              size="xs"
                              colorScheme="red"
                            >
                              Live
                            </Button>
                          )}
                          <Link
                            to={`/video/${video.id}`}
                            className="video-link"
                          >
                            <Button size="xs" colorScheme="pink">
                              Watch Shorts
                            </Button>
                          </Link>
                        </div>
                      </div>
                      {hoveredVideo === video.id && (
                        <div
                          className="play-pause-btn absolute inset-0 flex justify-center items-center cursor-pointer"
                          onClick={() => togglePlayPause(video.id)}
                        >
                          <Button
                            borderRadius={"full"}
                            size="lg"
                            colorScheme="whiteAlpha"
                          >
                            {playingVideo === video.id ? (
                              <FaPause size={20} color="white" />
                            ) : (
                              <FaPlay size={20} color="white" />
                            )}
                          </Button>
                        </div>
                      )}

                      <div className="flex flex-col gap-3 absolute -right-20 bottom-0">
                        <div className="flex flex-col items-center">
                          <Button
                            onClick={handleLikes}
                            size="md"
                            borderRadius={"full"}
                          >
                            <AiFillLike />
                          </Button>
                          <p className="font-semibold text-sm">{Likes}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <Button
                            onClick={handledisLike}
                            size="md"
                            borderRadius={"full"}
                          >
                            <BiSolidDislike />
                          </Button>
                          <p className="font-semibold text-sm">{Dislikes}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <Button
                            size="md"
                            borderRadius={"full"}
                            onClick={() => toggleCommentVisibility(video.id)}
                          >
                            <MdInsertComment />
                          </Button>
                          <p className="font-semibold text-sm">
                            {comments[video.id] ? comments[video.id].length : 0}
                          </p>
                        </div>
                        <div className="flex flex-col items-center">
                          <Button size="md" borderRadius={"full"}>
                            <IoIosShareAlt />
                          </Button>
                          <p className="font-semibold text-sm">0</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </SwiperSlide>
      </div>
    </>
  );
};

const SliderComponent = () => {
  return (
    <Swiper
      direction={"vertical"}
      pagination={{ clickable: true }}
      modules={[Pagination]}
      className="mySwiper"
    ></Swiper>
  );
};

const MainPage = () => {
  return (
    <div className="main-container">
      <Shorts />
      <div className="mt-10">
        <SliderComponent />
      </div>
    </div>
  );
};

export default MainPage;
