import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";

const Playlist = () => {
  const playlist = useSelector((state) => state.user.channels);

  //   const handleAddToPlaylist = (channel) => {
  //     setPlaylist((prev) => [...prev, channel]);
  //   };
  return (
    <div>
      <div className="">
        {/* <h2 className="text-lg font-semibold">Playlist</h2> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5">
          {playlist.map(({ channel }) => (
            <div
              key={channel.id}
              className="mb-2 max-w-xs sm:max-w-sm lg:max-w-lg bg-white rounded-lg dark:bg-gray-800 dark:border-gray-700"
            >
              <div style={{ borderRadius: "10px", overflow: "hidden" }}>
                <ReactPlayer
                  url={channel.videoUrl}
                  controls='false'
                  width="100%"
                  height="auto"
                  style={{ objectFit: "cover" }}
                />
              </div>

              <div className="py-2 px-1">
                <h5 className="mb-1 text-sm font-semibold truncate multiline-ellipsis w-full tracking-tight text-gray-900 dark:text-white">
                  {channel.title}
                </h5>
                <p className="text-xs truncate multiline-ellipsis text-gray-500">
                  {channel.channelName}
                </p>
                <div className="flex items-center gap-1 mt-0.5">
                  <h3 className="text-xs text-gray-400">2.6M views</h3>
                  <p className="text-gray-400 text-xs">1 Day ago</p>
                </div>
                <div>
                <h4 className=" truncate text-xs mt-0.5 h-8 w-[145px] sm:w-full text-gray-400 multiline-ellipsis ">{channel.description}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Playlist;
