import { Button, IconButton, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {
  MdKeyboardVoice,
  MdOutlineVideoCameraBack,
  MdHome,
  MdVideoLibrary,
  MdOutlineSubscriptions,
} from "react-icons/md";
import { FiMenu } from "react-icons/fi";
import { IoIosSearch, IoMdMoon } from "react-icons/io";
import { FaGoogle, FaRegBell } from "react-icons/fa6";
import { CgLivePhoto, CgProfile } from "react-icons/cg";
import { MdHistory } from "react-icons/md";
import { LuListVideo } from "react-icons/lu";
import { CiYoutube } from "react-icons/ci";
import { MdOutlineWatchLater, MdFileDownload } from "react-icons/md";
import { BiSolidLike } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { PiSignOutBold } from "react-icons/pi";
import { IoCloseOutline } from "react-icons/io5";
import { GoVideo } from "react-icons/go";
import { FaRegEdit } from "react-icons/fa";
import axios from "axios";

const Navbar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [videoToggle, setVideoToggle] = useState(false);
  const [leftMenu, setLeftMenu] = useState(false);
  const [isSynthwave, setIsSynthwave] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check for saved user theme preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "synthwave") {
      document.body.classList.add("synthwave");
      setIsSynthwave(true);
    }
  }, []);

  const handleVideoClick = (id) => {
    navigate(`/CreatePost/${id}`);
  };

  const VideotoggleDropdown = () => {
    setVideoToggle(!videoToggle);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleThemeChange = () => {
    if (isSynthwave) {
      document.body.classList.remove("synthwave");
      localStorage.setItem("theme", "default");
    } else {
      document.body.classList.add("synthwave");
      localStorage.setItem("theme", "synthwave");
    }
    setIsSynthwave(!isSynthwave);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    try {
      const response = await axios.get(
        `http://localhost:5000/videos?q=${query}`
      );
      setVideos(response.data); // Update with the fetched videos
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  // const handleSearchChange = (e) => {
  //   setSearchQuery(e.target.value);
  // };
  // Function to handle voice search
  const handleVoiceSearch = () => {
    const recognition = new window.webkitSpeechRecognition();
    recognition.lang = "en-US";
    recognition.start();

    recognition.onresult = (event) => {
      const voiceQuery = event.results[0][0].transcript;
      setSearchQuery(voiceQuery);
      console.log("Voice search query:", voiceQuery);
      // Trigger the search with voiceQuery here
      performSearch(voiceQuery);
    };

    recognition.onerror = (event) => {
      console.error("Voice recognition error:", event.error);
    };
  };

  const performSearch = (query) => {
    console.log("Performing search for:", query);
  };

  const toast = useToast();

  const handleClick = () => {
    toast({
      title: "Notification",
      description: "You have a new notification!",
      status: "info",
      duration: 5000,
      isClosable: true,
      position:'top-right'
    });
  };

  const categories = [
    { name: "All", path: "./category/All" },
    { name: "Music", path: "./category/Music" },
    { name: "Movies", path: "/movies" },
    { name: "Musicals", path: "./category/moviemusicals" },
    { name: "JavaScript", path: "./category/javascript" },
    { name: "C++", path: "/c-plus-plus" },
    { name: "Dramedy", path: "/dramedy" },
    { name: "Mixus", path: "/mixus" },
    { name: "Jackie Shroff", path: "/jackie-shroff" },
    { name: "Nusrat Fateh Ali Khan", path: "/nusrat-fateh-ali-khan" },
    { name: "News", path: "/news" },
    { name: "Pakistan Dramas", path: "/pakistan-dramas" },
    { name: "Movies Urdu", path: "/movies-urdu" },
    { name: "Songs Punjabi Songs", path: "/punjabi-songs" },
  ];

  const handleCategoryClick = (path) => {
    setIsModalOpen(false);
    navigate(path);
  };

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white  border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <IconButton
                borderRadius="full"
                size="sm"
                variant="outline"
                aria-label="Open sidebar"
                icon={<FiMenu />}
                onClick={() => setLeftMenu(!leftMenu)}
                className="p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              />
              <a href="/" className="flex items-center ms-2 md:me-24">
                <img
                  src="/images/youtubeLogo.png"
                  className="h-6 me-1"
                  alt="Logo"
                />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  YouTube
                </span>
              </a>
            </div>
            <div
              className={`flex-1 flex items-center justify-center ${
                isOpen ? "order-2" : "order-2 md:order-1"
              } md:flex md:w-auto w-full`}
            >
              <div className="w-full hidden md:max-w-md sm:flex items-center rounded-full gap-1">
                <div className="w-full hidden md:max-w-md sm:flex items-center border rounded-full">
                  <input
                    className="w-full relative pl-4 pr-2 rounded-l-full py-1"
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onClick={handleOpenModal}
                    onChange={handleSearchChange}
                  />
                  <button className="px-4 border-l h-8 bg-gray-100 rounded-r-full">
                    <IoIosSearch />
                  </button>
                </div>
                <IconButton
                  borderRadius="full"
                  size="sm"
                  icon={<MdKeyboardVoice />}
                  onClick={handleVoiceSearch}
                />
              </div>
            </div>
            <div
              className={`${
                isOpen ? "block" : "hidden"
              } w-full md:flex md:w-auto order-3 md:order-2`}
            >
              <ul className="flex flex-col mt-4 md:flex-row md:space-x-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <IconButton
                    size="sm"
                    borderRadius="full"
                    aria-label="Video"
                    icon={<MdOutlineVideoCameraBack />}
                    onClick={VideotoggleDropdown}
                    className="text-gray-900 dark:text-white"
                  />
                  {videoToggle && (
                    <ul className="absolute mt-2 bg-white dark:bg-gray-800 shadow-lg rounded-md w-48">
                      <Link to="/Studio">
                        <li className="p-2 gap-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          <GoVideo /> Upload video
                        </li>
                      </Link>
                      <Link to="/Live">
                        <li className="p-2 gap-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          <CgLivePhoto />
                          Go live
                        </li>
                      </Link>
                      <Link to="/Mychannel">
                        <li className="p-2 gap-2 flex items-center hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
                          <FaRegEdit />
                          Create post
                        </li>
                      </Link>
                    </ul>
                  )}
                </li>
                <li>
                  <IconButton
                    size="sm"
                    borderRadius="full"
                    aria-label="Notifications"
                    icon={<FaRegBell />}
                    className="text-gray-900 dark:text-white"
                    onClick={handleClick}
                  />
                </li>
                <li className=" flex justify-center items-center">
                  <img
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex w-7 hover:ring-2 text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    src={localStorage.getItem("selectedImage") || "upload"}
                    alt="Profile"
                  />
                </li>
                {/* User Dropdown Logic */}
                {isOpen && (
                  <div className="absolute mt-10 right-1 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 pt-3 flex gap-2 items-start">
                      <img
                        className="mt-1 rounded-full w-8 h-8"
                        src={localStorage.getItem("selectedImage") || "D"}
                        alt="Profile"
                      />

                      <div>
                        <p className="text-sm text-gray-900">Danesh Kumar</p>

                        {/* Retrieve and display the email from localStorage */}
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                          {JSON.parse(localStorage.getItem("user"))?.email ||
                            ""}
                        </p>

                        <div>
                          <Link to="/Mychannel">
                            <p className="text-xs mt-1 text-blue-500">
                              View your channel
                            </p>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <ul className="py-1">
                      <li className=" items-center flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <FaGoogle />
                        <p>Dashboard</p>
                      </li>
                      <Link to="" onClick={handleSignOut}>
                        <li className="items-center flex gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <PiSignOutBold />
                          <p>Sign out</p>
                        </li>
                      </Link>
                      <li className=" items-center flex px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        <label className="swap swap-rotate pt-1">
                          {/* This hidden checkbox controls the state */}
                          <input
                            type="checkbox"
                            id="theme-toggle"
                            className="theme-controller"
                            checked={isSynthwave}
                            onChange={handleThemeChange}
                          />

                          {/* Sun icon */}
                          <svg
                            className="swap-off fill-current w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                          >
                            <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                          </svg>

                          {/* Moon icon */}
                          <svg
                            className="swap-on fill-current w-6 h-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 32 32"
                          >
                            <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                          </svg>
                        </label>
                        <p>Device theme</p>
                      </li>
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <div className="flex  w-full">
        <aside
          id="logo-sidebar"
          className={`sticky top-0 left-0 z-40 ${
            leftMenu ? "w-52" : "w-[60px]"
          } h-screen pt-14 transition-all duration-300 ease-linear bg-white border-gray-200 dark:bg-gray-800 dark:border-gray-700`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li className=" w-[26.5]">
                <Link
                  href="/"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdHome className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span className={`ms-3 ${!leftMenu && "hidden"}`}>Home</span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  to="/Shorts"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdVideoLibrary className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap  ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Shorts
                  </span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  href="#"
                  className="flex items-center p-1 border-b text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdOutlineSubscriptions className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap  ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Subscriptions
                  </span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  to="/Studio"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <p className="flex-shrink-0 text-lg text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white">
                    You
                  </p>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  to="/Mychannel"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <CgProfile className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Your channel
                  </span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  to="/History"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdHistory className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    History
                  </span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  to="/playlist"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <LuListVideo className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Playlist
                  </span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  to="/Studio"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <CiYoutube className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Your video
                  </span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  href="#"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdOutlineWatchLater className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Watchlater
                  </span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  href="#"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <BiSolidLike className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Liked videos
                  </span>
                </Link>
              </li>
              <li className=" text-[26.5]">
                <Link
                  href="#"
                  className="flex items-center border-b p-1 text-gray-900  dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <MdFileDownload className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Downloads
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center p-1 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                >
                  <span
                    className={`flex-1 ms-3 whitespace-nowrap ${
                      !leftMenu && "hidden"
                    }`}
                  >
                    Subscription
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </aside>

        {/* Search Music Mondal */}
        {isModalOpen && (
          <div className="fixed top-[45px] z-50 flex justify-center items-start">
            <div
              className="left-[515px] absolute flex items-center justify-center"
              onClick={handleCloseModal}
            >
              <div
                className="bg-white p-4 rounded-md border shadow-lg max-w-lg mx-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute right-3 text-gray-600"
                  onClick={handleCloseModal}
                >
                  <IoCloseOutline size={24} />
                </button>
                {/* Display search results */}
                <div className="search-results">
                  {videos.length > 0 ? (
                    videos.map((video) => (
                      <div
                        key={video._id}
                        className="video-item cursor-pointer overflow-hidden w-[360px] py-1.5 px-4 hover:bg-gray-200 rounded-md"
                      >
                        <h3
                          className="truncate"
                          onClick={() => handleVideoClick(video._id)}
                        >
                          {video.title}
                        </h3>
                        {/* <p className="truncate">{video.description}</p> */}
                      </div>
                    ))
                  ) : (
                    <p>No videos found</p>
                  )}
                </div>

                <ul>
                  {categories.map((category) => (
                    <li
                      key={category.name}
                      className="cursor-pointer overflow-hidden w-[360px] py-1.5 px-4 hover:bg-gray-200 rounded-md"
                      onClick={() => handleCategoryClick(category.path)}
                    >
                      {category.name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        <div className=" px-1 mt-14 w-full">{children}</div>
      </div>
    </div>
  );
};

export default Navbar;
