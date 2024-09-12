import React, { useEffect, useState, useRef } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import { HiDotsHorizontal, HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosBookmark, IoIosShareAlt, IoMdSend } from "react-icons/io";
import { IoFlagSharp } from "react-icons/io5";
import { LuListVideo } from "react-icons/lu";
import {
  Button,
  ButtonGroup,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";
import {
  MdFileDownload,
  MdHistory,
  MdOutlinedFlag,
  MdOutlineDoNotDisturbOn,
  MdOutlineNotInterested,
} from "react-icons/md";
import ReactPlayer from "react-player";
import Category from "./category/category";
import { FaPlay, FaPause } from "react-icons/fa";
import { BiDislike, BiSolidDislike } from "react-icons/bi";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const MoviemusicalsDetails = () => {
  const [videosAll, setVideosAll] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [videoDetails, setVideoDetails] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [dislikes, setDislikes] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [played, setPlayed] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState({});
  const [commentVisibility, setCommentVisibility] = useState({});
  const [showEmojis, setShowEmojis] = useState(false);
  const [replies, setReplies] = useState({});
  const [replyText, setReplyText] = useState({});
  const [commentLikes, setCommentLikes] = useState({});
  const [commentDislikes, setCommentDislikes] = useState({});
  const player = useRef(null);

  useEffect(() => {
    const apiUrl =
      "https://cdn.pixabay.com/video/2015/08/08/125-135736646_large.mp4";
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.slice(0, 10).map((item) => ({
          id: item.id,
          url: item.url,
          thumbnailUrl: item.thumbnailUrl,
          title: item.title,
          channelName: `Channel ${item.id}`,
          description: `This is the description of ${item.title}`,
          videoUrl: apiUrl,
        }));

        setVideoUrl(transformedData[0].videoUrl);
        setVideoDetails(transformedData[0]);
        setVideosAll(transformedData);
      });
  }, []);

  const handleLike = () => {
    setLikes(liked ? likes - 1 : likes + 1);
    setLiked(!liked);
  };

  const handleDislike = () => {
    setDislikes(disliked ? dislikes - 1 : dislikes + 1);
    setDisliked(!disliked);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = videoUrl;
    link.download = videoDetails.title + ".mp4";
    link.click();
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: videoDetails.title,
          url: videoUrl,
        })
        .then(() => console.log("Video shared successfully"))
        .catch((error) => console.error("Error sharing video:", error));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  const handleSave = () => {
    alert("Video saved!");
  };

  const handleReport = () => {
    alert("Video reported!");
  };

  const togglePlayPause = () => {
    setPlaying(!playing);
  };

  const handleProgress = (progress) => {
    setPlayed(progress.played * 100);
    setCurrentTime(progress.playedSeconds);
  };

  const handleSeek = (valueArray) => {
    if (Array.isArray(valueArray) && valueArray.length > 0) {
      const value = valueArray[0];
      const seekTo = value / 100;
      setPlayed(value);
      player.current.seekTo(seekTo);
    } else {
      console.error("handleSeek: valueArray is not valid", valueArray);
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleCommentLike = (commentIndex) => {
    setCommentLikes((prevLikes) => ({
      ...prevLikes,
      [commentIndex]: prevLikes[commentIndex] ? prevLikes[commentIndex] - 1 : 1,
    }));
  };

  const handleCommentDislike = (commentIndex) => {
    setCommentDislikes((prevDislikes) => ({
      ...prevDislikes,
      [commentIndex]: prevDislikes[commentIndex]
        ? prevDislikes[commentIndex] - 1
        : 1,
    }));
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
    setCommentVisibility((prevVisibility) => ({
      ...prevVisibility,
      [videoId]: !prevVisibility[videoId],
    }));
  };

  const toggleEmojiPicker = () => {
    setShowEmojis(!showEmojis);
  };

  const handleEmojiClick = (emoji) => {
    setComment((prevComment) => prevComment + emoji);
    setShowEmojis(false); // Optionally hide the emojis after selection
  };

  const handleReplyInputChange = (commentIndex, e) => {
    setReplyText((prevReplies) => ({
      ...prevReplies,
      [commentIndex]: e.target.value,
    }));
  };

  const handleAddReply = (commentIndex) => {
    if (replyText[commentIndex]?.trim()) {
      setReplies((prevReplies) => ({
        ...prevReplies,
        [commentIndex]: [
          ...(prevReplies[commentIndex] || []),
          replyText[commentIndex],
        ],
      }));
      setReplyText((prevReplies) => ({
        ...prevReplies,
        [commentIndex]: "",
      }));
    }
  };

  const emojis = ["😊", "😂", "😍", "😢", "😡", "👍", "👎"];

  if (!videoUrl || !videoDetails) {
    return (
      <div className=" flex gap-5">
        <div>
          <Skeleton height={450} width={850} />
        </div>
        <div>
          <Skeleton height={140} width={400} />
          <Skeleton height={140} width={400} />,
          <Skeleton height={140} width={400} />,
          <Skeleton height={140} width={400} />,
          <Skeleton height={140} width={400} />,
          <Skeleton count={5} />
        </div>
        <Skeleton count={2} />
      </div>
    );
  }

  return (
    <div className="flex w-full h-full">
      <div className="flex gap-3 mt-2">
        <div
          className="flex flex-col pb-5 w-full"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="videocontainer w-full bg-white rounded-lg relative shadow-lg overflow-hidden">
            <ReactPlayer
              ref={player}
              url={videoUrl}
              playing={playing}
              controls={false}
              width="100%"
              height="100%"
              style={{ borderRadius: "10px" }}
              onProgress={handleProgress}
            />

            <div className="videorange absolute bottom-20 w-full">
              <RangeSlider
                aria-label={["min", "max"]}
                colorScheme="red"
                value={[played]}
                onChange={(val) => handleSeek(val)}
              >
                <div className="flex justify-between text-xs mb-6 text-white px-2">
                  <span>{formatTime(currentTime)}</span>
                  <span>{formatTime(duration[videoDetails.id] || 0)}</span>
                </div>
                <RangeSliderTrack>
                  <RangeSliderFilledTrack />
                </RangeSliderTrack>
                <RangeSliderThumb index={0} />
              </RangeSlider>
            </div>
          </div>
          {hovered && (
            <div
              className="play-pause-btn absolute left-[480px] top-72 transform -translate-y-1/2 flex justify-center"
              onClick={togglePlayPause}
            >
              <IconButton
                icon={
                  playing ? (
                    <FaPause color="gray" size={30} />
                  ) : (
                    <FaPlay color="gray" size={30} />
                  )
                }
                aria-label="Play/Pause"
                size="lg"
                borderRadius="full"
                border="none"
              />
            </div>
          )}
          <div className=" flex justify-between items-center">
            <div className="flex gap-x-3 mt-3 items-center">
              <div>
                <img
                  src={videoDetails.thumbnailUrl}
                  className="w-10 h-auto rounded-full mb-2"
                  alt="Thumbnail"
                />
              </div>
              <div>
                <p className="text-sm text-gray-500">
                  Channel: {videoDetails.channelName}
                </p>
                <p className="text-sm text-gray-500">232 Subscribers</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4">
              <ButtonGroup borderRadius="full" size="sm" isAttached>
                <IconButton
                  aria-label="Like"
                  icon={liked ? <AiFillLike /> : <AiOutlineLike />}
                  borderRadius="full"
                  onClick={handleLike}
                />
                <Button borderRadius="full" variant="outline">
                  {likes}
                </Button>
                <IconButton
                  aria-label="Dislike"
                  icon={disliked ? <BiSolidDislike /> : <BiDislike />}
                  borderRadius="full"
                  onClick={handleDislike}
                />
              </ButtonGroup>

              <Button
                borderRadius="full"
                size="sm"
                leftIcon={<IoIosShareAlt />}
                aria-label="Share"
                onClick={handleShare}
              >
                Share
              </Button>
              <Button
                borderRadius="full"
                size="sm"
                leftIcon={<MdFileDownload />}
                onClick={handleDownload}
              >
                Download
              </Button>
              <Menu>
                <MenuButton
                  borderRadius="full"
                  size="sm"
                  as={IconButton}
                  icon={<HiDotsHorizontal />}
                />
                <MenuList>
                  <MenuItem
                    size="sm"
                    icon={<IoIosBookmark />}
                    onClick={handleSave}
                  >
                    Save
                  </MenuItem>
                  <MenuItem
                    size="sm"
                    icon={<MdOutlinedFlag />}
                    onClick={handleReport}
                  >
                    Report
                  </MenuItem>
                </MenuList>
              </Menu>
            </div>
          </div>
          <h3 className=" font-semibold">
            {comments[videoDetails.id] ? comments[videoDetails.id].length : 0}{" "}
            Comments{" "}
          </h3>
          <div className="flex flex-col gap-2 mt-4">
            <div className="flex gap-2">
              <img
                className=" w-10 h-10 mt-1 rounded-full"
                src={videoDetails.thumbnailUrl}
                alt=""
              />

              <div className=" w-full">
                <Input
                  variant="flushed"
                  placeholder="Add a comment..."
                  value={comment}
                  onChange={handleInputChange}
                  width="full"
                />
                <div className=" flex justify-between">
                  <Button
                    className="-ml-3"
                    variant="outline"
                    border="none"
                    borderRadius="full"
                    colorScheme="teal"
                    size="sm"
                    onClick={toggleEmojiPicker}
                  >
                    😊
                  </Button>

                  <Button
                    className=" gap-1 mt-1"
                    onClick={() => handleAddComment(videoDetails.id)}
                    colorScheme="blue"
                    size="sm"
                  >
                    Comment <IoMdSend />
                  </Button>
                </div>
              </div>
            </div>
            {showEmojis && (
              <div className="flex gap-2 mb-4">
                {emojis.map((emoji) => (
                  <Button
                    key={emoji}
                    onClick={() => handleEmojiClick(emoji)}
                    className="text-xl"
                  >
                    {emoji}
                  </Button>
                ))}
              </div>
            )}
            {comments[videoDetails.id]?.map((com, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-2">
                    <div className=" flex gap-2">
                      <img
                        className=" w-10 h-10 mt-1 rounded-full"
                        src={videoDetails.thumbnailUrl}
                        alt=""
                      />
                      <div className=" w-full">
                        <p>{videoDetails.channelName}</p>
                        <div className="text-gray-600">{com}</div>
                        <div className=" -ml-3 flex gap-0.5">
                          <Button
                            onClick={() => handleCommentLike(index)}
                            borderRadius="full"
                            border="none"
                            variant="outline"
                            size="sm"
                          >
                            {commentLikes[index] ? (
                              <AiFillLike size={15} />
                            ) : (
                              <AiOutlineLike size={15} />
                            )}
                            {commentLikes[index] || ""}
                          </Button>
                          <Button
                            onClick={() => handleCommentDislike(index)}
                            borderRadius="full"
                            border="none"
                            variant="outline"
                            size="sm"
                          >
                            {commentDislikes[index] ? (
                              <BiSolidDislike size={15} />
                            ) : (
                              <BiDislike size={15} />
                            )}
                            {commentDislikes[index] || ""}
                          </Button>
                          <Button
                            variant="outline"
                            border="none"
                            onClick={() => toggleCommentVisibility(index)}
                            size="sm"
                          >
                            {commentVisibility[index] ? "Reply" : "Reply"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => {
                        setReplies((prevReplies) => ({
                          ...prevReplies,
                          [index]: [],
                        }));
                        setReplyText((prevReplies) => ({
                          ...prevReplies,
                          [index]: "",
                        }));
                      }}
                      size="sm"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                {commentVisibility[index] &&
                  replies[index]?.map((reply, replyIndex) => (
                    <div
                      key={replyIndex}
                      className="flex items-center gap-2 pl-4"
                    >
                      <img
                        className=" w-10 h-10 rounded-full"
                        src={videoDetails.thumbnailUrl}
                        alt=""
                      />
                      <div className="text-gray-600">{reply}</div>
                    </div>
                  ))}
                {commentVisibility[index] && (
                  <div className="flex  gap-2 pl-4">
                    <img
                      className=" w-10 h-10 rounded-full"
                      src={videoDetails.thumbnailUrl}
                      alt=""
                    />
                    <div className=" w-full flex-col">
                      <Input
                        variant="flushed"
                        placeholder="Write a reply..."
                        value={replyText[index] || ""}
                        onChange={(e) => handleReplyInputChange(index, e)}
                        width="full"
                      />
                      <div className=" mt-1 flex justify-between">
                        <Button
                          className="-ml-3"
                          variant="outline"
                          border="none"
                          borderRadius="full"
                          colorScheme="teal"
                          size="sm"
                          onClick={toggleEmojiPicker}
                        >
                          😊
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => handleAddReply(index)}
                          colorScheme="blue"
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        {/* Mini Cart */}
        <div className="w-1/2">
          <Category />
          <div className="flex flex-wrap gap-4 pt-3">
            {videosAll.map((AllVideos) => (
              <div
                key={AllVideos.id}
                className="w-full h-full flex overflow-hidden"
              >
                <div className="videocontainer w-full bg-white rounded-lg relative shadow-lg overflow-hidden">
                  <ReactPlayer
                    ref={player}
                    url={videoUrl}
                    playing={playing}
                    controls={false}
                    width="100%"
                    height="100%"
                    style={{ borderRadius: "10px" }}
                    onProgress={handleProgress}
                  />
                  <div className="videorange absolute w-full -bottom-1.5">
                    <RangeSlider
                      aria-label={["min", "max"]}
                      min={0}
                      max={100}
                      colorScheme="red"
                      value={[played]}
                      onChange={(val) => handleSeek(val[0])}
                    >
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb index={0} />
                    </RangeSlider>
                  </div>
                </div>
                <div className="w-full p-2">
                  <div className="">
                    <div className="flex justify-between items-center">
                      <p className="text-xs font-semibold truncate multiline-esclipsis w-32">
                        {AllVideos.title}
                      </p>
                      <Menu>
                        <MenuButton
                          size="xs"
                          as={IconButton}
                          aria-label="Options"
                          icon={<HiOutlineDotsVertical />}
                          variant="outline"
                          borderRadius="full"
                          border="none"
                        />
                        <MenuList>
                          <MenuItem
                            icon={<LuListVideo />}
                            // onClick={() => handleAddToPlaylist(AllVideos)}
                          >
                            Add to queue
                          </MenuItem>
                          <MenuItem
                            icon={<MdHistory />}
                            // onClick={() => handleAddToWatchLater(AllVideos)}
                          >
                            Save to Watchlater
                          </MenuItem>
                          <MenuItem
                            icon={<IoIosBookmark />}
                            // onClick={() => handleAddToPlaylist(AllVideos)}
                          >
                            Save to Playlist
                          </MenuItem>
                          <MenuItem icon={<MdOutlineNotInterested />}>
                            No interest
                          </MenuItem>
                          <MenuItem icon={<MdOutlineDoNotDisturbOn />}>
                            Don't recommend channel
                          </MenuItem>
                          <MenuItem icon={<IoFlagSharp />}>Report</MenuItem>
                        </MenuList>
                      </Menu>
                    </div>
                    <p className="text-xs text-gray-500 pb-1">
                      Channel: {AllVideos.channelName}
                    </p>
                    <p className="text-xs text-gray-500">232 Subscribers</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviemusicalsDetails;
