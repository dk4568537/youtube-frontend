import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
import { TiFlash } from "react-icons/ti";
import Skeleton from "react-loading-skeleton";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";

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
  const [visibleVideos, setVisibleVideos] = useState(5);
  const [playingVideo, setPlayingVideo] = useState(null);

  const handleShowMore = () => {
    setVisibleVideos((prevCount) => prevCount + 5);
  };

  const handleMouseEnter = (videoId) => {
    setPlayingVideo(videoId);
  };

  const handleMouseLeave = () => {
    setPlayingVideo(null);
  };
  if (!videos.length) {
    return (
      <>
        <div className="grid grid-cols-1 mt-5 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton height={490} width={"100%"} />
          <Skeleton height={490} width={"100%"} />
          <Skeleton height={490} width={"100%"} />
          <Skeleton height={490} width={"100%"} />
          <Skeleton height={490} width={"100%"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
          <Skeleton height={30} width={"100%"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
          <Skeleton width={"100%"} />
        </div>
      </>
    );
  }

  return (
    <>
      <h1 className="flex items-center font-bold text-xl my-4">
        <TiFlash className="text-red-500" />
        Shorts
      </h1>
      <div className="video-list grid grid-cols-1 sm:grid-cols-5 gap-3">
        {videos.slice(0, visibleVideos).map((video) => (
          <div key={video.id} className="video-item">
            <Link to={`/ViewShortsAll/${video.id}`} className="video-thumbnail">
              <div
                className="videocontainer border relative h-80 sm:h-96"
                onMouseEnter={() => handleMouseEnter(video.id)}
                onMouseLeave={handleMouseLeave}
                style={{ borderRadius: '10px', overflow: 'hidden' }}
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
              </div>
            </Link>
            <div className="video-details flex flex-col gap-0.5 pt-1">
              <h3 className="video-title truncate multiline-ellipsis">{video.title}</h3>
              <p className="video-author text-sm">
                {video.author} {video.views} views
              </p>
              <p className="video-duration text-sm">
                {video.duration} {video.uploadTime}
              </p>
              <p className="video-description truncate multiline-ellipsis text-sm">
                {video.description}
              </p>
              <p className="video-subscriber text-sm">{video.subscriber}</p>
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
                <Link to={`/video/${video.id}`} className="video-link">
                  <Button size="xs" colorScheme="pink">
                    Watch Shorts
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {visibleVideos < videos.length && (
        <div className="flex justify-center my-4 border-b mb-8 relative">
          <Button className=" absolute -bottom-5" variant='outline' borderRadius={'full'} size="md" onClick={handleShowMore} >
            Show More
          </Button>
        </div>
      )}
    </>
  );
};

export default Shorts;
