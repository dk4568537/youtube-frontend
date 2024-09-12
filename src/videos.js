import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactPlayer from "react-player";
import removeFromCart from "./UserSystem";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { LuListVideo } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import {
  MdHistory,
  MdFileDownload,
  MdOutlineNotInterested,
  MdOutlineDoNotDisturbOn,
  MdVolumeUp,
  MdVolumeOff,
} from "react-icons/md";
import { IoIosBookmark, IoIosShareAlt, IoMdSearch } from "react-icons/io";
import { IoFlagSharp, IoSettingsOutline } from "react-icons/io5";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiPause } from "react-icons/hi2";

import { Link } from "react-router-dom";


const Videos = () => {
  const channels = useSelector((state) => state.user.channels);
  const dispatch = useDispatch();
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [volumes, setVolumes] = useState({});
  const [currentTimes, setCurrentTimes] = useState({});
  const [durations, setDurations] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const containerRefs = useRef({});
  const videoRefs = useRef({});

 
  const handleVolumeChange = (channelId, value) => {
    const newVolume = value[0] / 100;
    setVolumes((prev) => ({
      ...prev,
      [channelId]: newVolume,
    }));
    if (newVolume > 0) {
      setPlayingVideoId(channelId);
    } else {
      setPlayingVideoId(null);
    }
  };

  const handleTimeChange = (channelId, value) => {
    const video = videoRefs.current[channelId].current;
    if (video) {
      video.seekTo((value[0] / 100) * durations[channelId]);
      setCurrentTimes((prev) => ({
        ...prev,
        [channelId]: (value[0] / 100) * durations[channelId],
      }));
    }
  };

  const handleProgress = (id, state) => {
    setCurrentTimes((prev) => ({
      ...prev,
      [id]: state.playedSeconds,
    }));
  };

  const handleDuration = (id, duration) => {
    setDurations((prev) => ({
      ...prev,
      [id]: duration,
    }));
  };

  const handleTimeChang = (id, val) => {
    const seekTime = (val / 100) * durations[id];
    const player = videoRefs.current[id];
    if (player) {
      player.seekTo(seekTime, "seconds");
    }
    setCurrentTimes((prev) => ({
      ...prev,
      [id]: seekTime,
    }));
  };
  // Add playlist video
  const handleAddToPlaylist = (channel) => {
    setPlaylist((prev) => [...prev, channel]);
  };
  // Download video
  const handleDownload = (videoUrl) => {
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = videoUrl.split("/").pop();
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  //  remove id
  const handleRemoveFromCart = (channelId) => {
    dispatch(removeFromCart(channelId));
  };
  //  share video
  const handleShare = (video) => {
    if (navigator.share) {
      navigator
        .share({
          title: video.title,
          text: `Check out this video: ${video.title}`,
          url: video.videoUrl,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      alert("Sharing is not supported in your browser.");
    }
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  return (
    <>
      <div className=" flex">
        <div className="w-2/3 ">
          {channels.map(({ channel }) => (
            <div
              key={channel.id}
              className="grid grid-cols-3 mb-2  bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700"
              ref={(el) => (containerRefs.current[channel.id] = el)}
            >
              <div className="">
                <div
                  className="videocontainer border border-gray-200 shadow rounded-lg  h-24 sm:h-[100px] md:h-[160px] sm:w-full relative overflow-hidden rounded-t-lg"
                  onMouseEnter={() => setPlayingVideoId(channel.id)}
                  onMouseLeave={() => setPlayingVideoId(null)}
                >
                  <Link to={`/videoDetail/${channel.id}`}>
                  <ReactPlayer
                    ref={(el) => (videoRefs.current[channel.id] = el)}
                    url={channel.videoUrl}
                    playsinline
                    playing={
                      playingVideoId === channel.id &&
                      (volumes[channel.id] || 3) > 0
                    }
                    loop
                    controls={false}
                    width="100%"
                    height="100%"
                    volume={volumes[channel.id] || 0.5}
                    style={{ objectFit: "cover" }}
                    onProgress={(state) => handleProgress(channel.id, state)}
                    onDuration={(duration) =>
                      handleDuration(channel.id, duration)
                    }
                   
                  />
                  </Link>

                  <div className="absolute top-2 right-2 flex flex-col items-center">
                    <button
                      onClick={() =>
                        setVolumes((prev) => ({
                          ...prev,
                          [channel.id]: prev[channel.id] === 0 ? 0.5 : 0,
                        }))
                      }
                      className="bg-white p-1 rounded-full mb-2"
                    >
                      {volumes[channel.id] === 0 ? (
                        <MdVolumeUp className="w-5 h-5" />
                      ) : (
                        <MdVolumeOff className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  <div className="videorange absolute w-full -bottom-4.5">
                    <RangeSlider
                      aria-label={["min", "max"]}
                      colorScheme="red"
                      value={[
                        (currentTimes[channel.id] / durations[channel.id]) *
                          100 || 0,
                      ]}
                      onChange={(val) => handleTimeChang(channel.id, val)}
                      min={0}
                      max={100}
                      step={1}
                      className="w-full"
                    >
                      <div className="flex justify-between text-xs text-white mb-6 px-2">
                        <span>{formatTime(currentTimes[channel.id] || 0)}</span>
                        <span>{formatTime(durations[channel.id] || 0)}</span>
                      </div>
                      <RangeSliderTrack>
                        <RangeSliderFilledTrack />
                      </RangeSliderTrack>
                      <RangeSliderThumb boxSize={1} index={0} />
                    </RangeSlider>
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <div className="p-2 flex justify-between gap-2">
                  <div className="flex-1">
                    <h5 className="mb-1 text-xs sm:text-sm font-semibold w-full h-10 text-gray-900 dark:text-white">
                      {channel.title}
                    </h5>
                    <p className="text-xs text-gray-500 mb-2">
                      {channel.channelName}
                    </p>
                    <div className="flex items-center gap-2 pb-1">
                      <h3 className="text-xs text-gray-400">2.6M views</h3>
                      <p className="text-gray-400 text-xs">1 Day ago</p>
                    </div>
                    <h4 className=" truncate text-xs mt-0.5 h-14 w-[145px] sm:w-full text-gray-400 multiline-ellipsis ">
                      {channel.description}

                      <Link href="#">
                        <img
                          className="w-8 h-8 mt-1.5 rounded-full object-cover"
                          src={channel.thumbnailUrl}
                          alt="Profile Image"
                        />
                      </Link>
                    </h4>
                  </div>

                  <Menu>
                    <MenuButton
                      className="relative"
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
                        onClick={() => handleAddToPlaylist(channel)}
                      >
                        Add to queue
                      </MenuItem>
                      <MenuItem icon={<MdHistory />}>
                        Save to Watchlater
                      </MenuItem>
                      <MenuItem icon={<IoIosBookmark />}>
                        Save to Playlist
                      </MenuItem>
                      <MenuItem
                        icon={<MdFileDownload />}
                        onClick={() => handleDownload(channel.videoUrl)}
                      >
                        Download
                      </MenuItem>
                      <MenuItem
                        icon={<IoIosShareAlt />}
                        onClick={() => handleShare(channel)}
                      >
                        Share
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
                  <button
                    onClick={() => handleRemoveFromCart(channel.id)}
                    borderRadius="full"
                    variant="outline"
                    border="none"
                    className=" right-[430px] mt-1 absolute"
                  >
                    <RxCross2 className=" w-5 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className=" w-1/3 flex justify-center items-ceneter">
          <div>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <IoMdSearch className=" text-gray-400 text-lg" />
              </InputLeftElement>
              <Input
                variant="flushed"
                borderBottom="1px"
                htmlSize={20}
                width="auto"
                placeholder="Search"
              />
            </InputGroup>
            <div className=" flex justify-start items-start flex-col">
              <Button
                borderRadius="full"
                variant="outline"
                border="none"
                iconSpacing="3"
                className=" mt-1"
              >
                <RiDeleteBin6Line className=" mr-3" />
                <p>Clear all watch History</p>
              </Button>
              <Button
                borderRadius="full"
                variant="outline"
                border="none"
                iconSpacing="3"
                className=" mt-1"
              >
                <HiPause className=" mr-4" />
                <p>Pause watch History</p>
              </Button>
              <Button
                borderRadius="full"
                variant="outline"
                border="none"
                iconSpacing="3"
                className=" mt-1"
              >
                <IoSettingsOutline className=" mr-4" />
                <p>Manage all History</p>
              </Button>
            </div>
            <div className=" flex justify-center items-center flex-col">
              <Button
                borderRadius="full"
                variant="outline"
                border="none"
                iconSpacing="3"
                className=" mt-1 text-center"
              >
                <p>Comment</p>
              </Button>
              <Link to='/posts'><Button
                borderRadius="full"
                variant="outline"
                border="none"
                iconSpacing="3"
                className=" mt-1 text-center"
              >
                <p>Post</p>
              </Button></Link>
              <Button
                borderRadius="full"
                variant="outline"
                border="none"
                iconSpacing="3"
                className=" mt-1 text-center"
              >
                <p>Live Chat</p>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Videos;
