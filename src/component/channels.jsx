import React, { useEffect, useState, useRef } from "react";
import ReactPlayer from "react-player";
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  IconButton,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  Button,
} from "@chakra-ui/react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import {
  MdHistory,
  MdFileDownload,
  MdVolumeOff,
  MdVolumeUp,
} from "react-icons/md";
import { LuListVideo } from "react-icons/lu";
import { IoIosBookmark, IoIosShareAlt } from "react-icons/io";
import {
  MdOutlineDoNotDisturbOn,
  MdOutlineNotInterested,
} from "react-icons/md";
import { IoFlagSharp } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { Addvideo } from "../UserSystem";
import { Link, useParams } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Skeleton from "react-loading-skeleton";

const Channels = () => {
  const [channels, setChannels] = useState([]);
  const [playingVideoId, setPlayingVideoId] = useState(null);
  const [volumes, setVolumes] = useState({});
  const [durations, setDurations] = useState({});
  const [currentTimes, setCurrentTimes] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const videoRefs = useRef({});
  const containerRefs = useRef({});
  const dispatch = useDispatch();
  const params = useParams();
  const channelId = parseInt(params.id);
  useEffect(() => {
    const apiUrl = "https://apivideo-demo.s3.amazonaws.com/hello.mp4";
    fetch("https://jsonplaceholder.typicode.com/photos")
      .then((response) => response.json())
      .then((data) => {
        const transformedData = data.slice(0, 10).map((item) => ({
          id: item.id,
          url: item.url,
          thumbnailUrl: item.thumbnailUrl,
          title: item.title,
          channelName: `Channel ${item.id}`,
          description: `Channel ${item.description}`,
          videoUrl: `${apiUrl}`,
        }));
        setChannels(transformedData);
        const initialVolumes = {};
        const initialCurrentTimes = {};
        transformedData.forEach((item) => {
          initialVolumes[item.id] = 0.5;
          initialCurrentTimes[item.id] = 0;
          videoRefs.current[item.id] = React.createRef();
          containerRefs.current[item.id] = React.createRef();
        });
        setVolumes(initialVolumes);
        setCurrentTimes(initialCurrentTimes);
      });
  }, []);

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

  const handleProgress = (channelId, state) => {
    setCurrentTimes((prev) => ({
      ...prev,
      [channelId]: state.playedSeconds,
    }));
  };

  const handleDuration = (channelId, duration) => {
    setDurations((prev) => ({
      ...prev,
      [channelId]: duration,
    }));
  };

  const handleFullScreen = (channelId) => {
    const container = containerRefs.current[channelId].current;
    if (container.requestFullscreen) {
      container.requestFullscreen();
    } else if (container.mozRequestFullScreen) {
      container.mozRequestFullScreen();
    } else if (container.webkitRequestFullscreen) {
      container.webkitRequestFullscreen();
    } else if (container.msRequestFullscreen) {
      container.msRequestFullscreen();
    }
  };

  const handleAddToPlaylist = (channel) => {
    setPlaylist((prev) => [...prev, channel]);
  };

  const handleDownload = (videoUrl) => {
    const a = document.createElement("a");
    a.href = videoUrl;
    a.download = videoUrl.split("/").pop(); // Extract filename from URL
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
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

  const handleRemoveFromPlaylist = (channelId) => {
    setPlaylist((prev) => prev.filter((video) => video.id !== channelId));
  };
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  if (!channels.length) {
    return (
      <>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton height={200} width={"100%"} />
          <Skeleton height={200} width={"100%"} />
          <Skeleton height={200} width={"100%"} />
          <Skeleton height={200} width={"100%"} />
          <Skeleton height={200} width={"100%"} />
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
        </div>
        <div className=" grid grid-cols-1 mb-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton height={200} width={"100%"} />
          <Skeleton height={200} width={"100%"} />
          <Skeleton height={200} width={"100%"} />
          <Skeleton height={200} width={"100%"} />
          <Skeleton height={200} width={"100%"} />
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
        </div>
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
        {channels.map((channel) => (
          <div
            key={channel.id}
            className=" max-w-xs sm:max-w-sm lg:max-w-lg bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700"
            ref={containerRefs.current[channel.id]} // Reference to the video container
          >
            <Link to={`/videoDetail/${channel.id}`}>
              <div
                className="videocontainer border border-gray-200 shadow rounded-lg h-24 sm:h-[140px] md:h-[160px] w-full relative overflow-hidden rounded-t-lg"
                onMouseEnter={() => setPlayingVideoId(channel.id)}
                onMouseLeave={() => setPlayingVideoId(null)}
                // onClick={() => handleFullScreen(channel.id)} // Trigger fullscreen on click
                onClick={() => dispatch(Addvideo({ channel }))}
              >
                <ReactPlayer
                  ref={videoRefs.current[channel.id]} // Assign ref to the video
                  url={channel.videoUrl}
                  playsinline
                  playing={
                    playingVideoId === channel.id && volumes[channel.id] > 0
                  }
                  loop={true}
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
                      <MdVolumeOff className="w-5 h-5" />
                    ) : (
                      <MdVolumeUp className="w-5 h-5" />
                    )}
                  </button>
                </div>

                <div className="videorange absolute w-full -bottom-8 flex-col">
                  <RangeSlider
                    aria-label={["min", "max"]}
                    colorScheme="red"
                    value={[
                      (currentTimes[channel.id] / durations[channel.id]) *
                        100 || 0,
                    ]} // Convert current time to a percentage
                    onChange={(val) => handleTimeChange(channel.id, val)}
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
            </Link>

            <div className="pt-2 flex justify-between gap-2">
              <Link href="#">
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={channel.thumbnailUrl}
                  alt="Profile Image"
                />
              </Link>
              <div className="flex-1">
                <h5 className="sm:mb-1 text-sm font-semibold truncate multiline-ellipsis w-24 tracking-tight text-gray-900 dark:text-white">
                  {channel.title}
                </h5>
                <p className="text-xs text-gray-500">{channel.channelName}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <h3 className="text-xs text-gray-400">2.6M views</h3>
                  <p className="text-gray-400 text-xs">1 Day ago</p>
                </div>
                <div>
                  <h4 className=" truncate text-xs mt-0.5 h-8 w-[145px] sm:w-full text-gray-400 multiline-ellipsis ">
                    {channel.description}
                  </h4>
                </div>
              </div>

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
                    onClick={() => handleAddToPlaylist(channel)}
                  >
                    Add to queue
                  </MenuItem>
                  <MenuItem
                    icon={<MdHistory />}
                    onClick={() => handleAddToPlaylist({ channel })}
                  >
                    Save to Watchlater
                  </MenuItem>
                  <MenuItem
                    icon={<IoIosBookmark />}
                    onClick={() => dispatch(Addvideo({ channel }))}
                  >
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
            </div>
          </div>
        ))}
      </div>

      {/* Playlist Section */}
      <>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {playlist.map((video) => (
            <div
              key={video.id}
              className="mb-2 w-full h-full bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="videocontainer border border-gray-200 shadow rounded-lg h-24 sm:h-[140px] md:h-[160px] w-full overflow-hidden rounded-t-lg">
                <ReactPlayer
                  url={video.videoUrl}
                  controls
                  width="100%"
                  height="100%"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="p-2">
                <h5 className="mb-1 text-sm font-semibold truncate multiline-ellipsis w-24 tracking-tight text-gray-900 dark:text-white">
                  {video.title}
                </h5>
                <div className=" flex justify-between items-center">
                  <p className="text-xs text-gray-500">{video.channelName}</p>
                  <button
                    onClick={() => handleRemoveFromPlaylist(video.id)}
                    borderRadius="full"
                    variant="outline"
                    border="none"
                  >
                    <RxCross2 className=" w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    </div>
  );
};

export default Channels;
