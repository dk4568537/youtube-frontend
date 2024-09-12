import { Box, Button, Input, Text } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { IoIosSearch, IoMdCheckboxOutline } from "react-icons/io";
import { FcClapperboard } from "react-icons/fc";
import History from "./Playlist";
import { MdOutlinePhotoSizeSelectActual, MdViewArray } from "react-icons/md";
import { BiPoll } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FiDelete } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

const MyChannel = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageGallery, setImageGallery] = useState([]);
  const [activeTab, setActiveTab] = useState("Home"); // State to track the active tab
  const [activeTabTwo, setActiveTabTwo] = useState("Image");
  const [showGallery, setShowGallery] = useState(false); // State to toggle gallery visibility
  const [formData, setFormData] = useState({
    question: "",
    addition1: "",
    addition2: "",
  });
  const [allData, setAllData] = useState([]);

  // Dynamic data for buttons
  const buttons = [
    { label: "Home", id: 1 },
    { label: "Playlists", id: 2 },
    { label: "Community", id: 3 },
  ];

  // Load image from localStorage on component mount
  useEffect(() => {
    const savedImage = localStorage.getItem("selectedImage");
    const savedGallery = JSON.parse(localStorage.getItem("imageGallery")) || [];

    if (savedImage) {
      setSelectedImage(savedImage);
    }
    setImageGallery(savedGallery);
  }, []);

  // Dynamic data for the input field
  const inputProps = {
    placeholder: "Search...",
    type: "text",
    className: "border-b mb-1 border-black",
  };

  // text Poll start //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Server response:", result);

      // Fetch all data after submitting new data
      fetchData();

      // Optionally store data in localStorage
      localStorage.setItem("communityFormData", JSON.stringify(formData));

      // Reset form
      setFormData({ question: "", addition1: "", addition2: "" });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data");
      const result = await response.json();
      setAllData(result.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch all data on component mount
  useEffect(() => {
    fetchData();
  }, []);
  // text Poll end //

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageUrl = reader.result;
        setSelectedImage(imageUrl);

        // Update localStorage with new image and gallery
        localStorage.setItem("selectedImage", imageUrl);

        const updatedGallery = [...imageGallery, imageUrl];
        setImageGallery(updatedGallery);
        localStorage.setItem("imageGallery", JSON.stringify(updatedGallery));
      };
      reader.readAsDataURL(file);
    }
  };

 
   // Handle image removal by index
   const handleImageRemove = (index) => {
    const updatedGallery = imageGallery.filter((_, i) => i !== index);
    setImageGallery(updatedGallery);
    localStorage.setItem("imageGallery", JSON.stringify(updatedGallery));

    // Optionally remove the selected image if it's the one being removed
    if (selectedImage === imageGallery[index]) {
      setSelectedImage(null);
      localStorage.removeItem("selectedImage");
    }
  };

  // Toggle gallery visibility
  const toggleGallery = () => {
    setShowGallery((prev) => !prev);
  };

  return (
    <>
      <div className="p-4 flex gap-5">
        <div className="flex flex-col">
          <button
            className="h-40 w-40 border rounded-full"
            onClick={() => document.getElementById("fileInput").click()}
          >
            {selectedImage ? (
              <img
                src={selectedImage}
                alt="Selected"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span className="text-lg text-gray-500">Upload Image</span>
            )}
          </button>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <div className="mt-4 flex justify-center items-start flex-col gap-2">
          <h1 className="text-2xl font-bold">Danesh Kumar</h1>
          <h5>{JSON.parse(localStorage.getItem("user"))?.email || ""}</h5>
          <h3>More About This Channel</h3>
          <div className="flex gap-3">
            <Button size={"sm"} borderRadius={"full"}>
              Customise channel
            </Button>
            <Link to="/Studio">
              <Button size={"sm"} borderRadius={"full"}>
                Manage videos
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className=" mb-8">
        <div className="flex gap-3 border-b">
          {buttons.map((button) => (
            <h1
              key={button.id}
              onClick={() => setActiveTab(button.label)} // Set the active tab on button click
              className=" text-md hover:border-b border-black"
            >
              {button.label}
            </h1>
          ))}
          <Button
            size={"sm"}
            variant={"outline"}
            border={"none"}
            borderRadius={"full"}
            className="px-4 h-8 bg-gray-100 rounded-full"
          >
            <IoIosSearch />
          </Button>
          <input {...inputProps} />
        </div>

        {/* Conditionally render content based on the active tab */}
        {activeTab === "Home" && (
          <div className=" flex justify-center items-center mt-5 flex-col">
            <FcClapperboard className=" w-28 text-7xl" />
            <h3 className=" text-xs mt-5">Create content on any device</h3>
            <p className=" text-center text-xs mt-2">
              Upload and record at home or on the go. <br /> Everything you make
              public will appear here.
            </p>
            <Link to="/Studio">
              <Button
                className=" mt-5"
                colorScheme="blue"
                borderRadius={"full"}
              >
                Create
              </Button>
            </Link>
          </div>
        )}
        {activeTab === "Playlists" && (
          <div>
            <p className="mt-2 font-semibold">Created PlayList</p>
            <History />
          </div>
        )}
        {activeTab === "Community" && (
          <div className=" border mt-5 rounded-lg shadow-sm w-2/3 p-4">
            <div className=" flex justify-between items-center ">
              <div className="flex  items-center gap-3">
                <button
                  className="h-10 w-10 border rounded-full"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  {selectedImage ? (
                    <img
                      src={selectedImage}
                      alt="Selected"
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <span className="text-[5px] text-gray-500">
                      Upload Image
                    </span>
                  )}
                </button>
                <input
                  id="fileInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <h2>Danesh Kumar</h2>
              </div>
              <p className=" pr-4">Visibility : public</p>
            </div>
            <div className=" my-2">
              <input
                className=" w-full"
                type="text"
                placeholder="Give a Shoutout! Type @ to mention a channel"
              />
            </div>
            <div>
              <div className="flex gap-2">
                <Button
                  variant={"outline"}
                  border={"none"}
                  size={"sm"}
                  borderRadius={"full"}
                  leftIcon={
                    <MdOutlinePhotoSizeSelectActual className="text-lg" />
                  }
                  onClick={() => setActiveTabTwo("Image")}
                >
                  Image
                </Button>
                <Button
                  variant={"outline"}
                  border={"none"}
                  size={"sm"}
                  borderRadius={"full"}
                  leftIcon={<BiPoll className="text-lg" />}
                  onClick={() => setActiveTabTwo("Image poll")}
                >
                  Image poll
                </Button>
                <Button
                  variant={"outline"}
                  border={"none"}
                  size={"sm"}
                  borderRadius={"full"}
                  leftIcon={<BiPoll className="text-lg" />}
                  onClick={() => setActiveTabTwo("Text poll")}
                >
                  Text poll
                </Button>
                <Button
                  variant={"outline"}
                  border={"none"}
                  size={"sm"}
                  borderRadius={"full"}
                  leftIcon={<IoMdCheckboxOutline className="text-lg" />}
                  onClick={() => setActiveTabTwo("Quiz")}
                >
                  Quiz
                </Button>
                <Button
                  variant={"outline"}
                  border={"none"}
                  size={"sm"}
                  borderRadius={"full"}
                  leftIcon={<MdViewArray className="text-lg" />}
                  onClick={() => setActiveTabTwo("Video")}
                >
                  Video
                </Button>
                <Button
                  variant={"outline"}
                  border={"none"}
                  size={"sm"}
                  borderRadius={"full"}
                  onClick={toggleGallery}
                >
                  {showGallery ? "Hide Gallery" : "Show Gallery"}
                </Button>
              </div>

              {/* Conditionally render content based on the active tab */}
              <div>
                <div className="mt-4">
                  {activeTabTwo === "Image" && (
                    <>
                      <input
                        className="w-full pl-1 mb-1"
                        type="text"
                        placeholder="What is on your mind?"
                      />
                      <div>
                        <div className="flex flex-col relative">
                          <button
                            className="h-48 w-full border "
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
                          >
                            {selectedImage ? (
                              <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-full "
                              />
                            ) : (
                              <span className="text-lg text-gray-500">
                                Upload Image
                              </span>
                            )}
                          </button>
                          {selectedImage && (
                            <Button
                              size={"sm"}
                              colorScheme="gray"
                              borderRadius={"full"}
                              className="absolute top-2 right-2"
                              onClick={handleImageRemove}
                            >
                              Remove
                            </Button>
                          )}
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4">
                  {activeTabTwo === "Image poll" && (
                    <>
                      <input
                        className="w-full pl-1 mb-1"
                        type="text"
                        placeholder="What is on your mind?"
                      />
                      <div>
                        <div className="flex flex-col">
                          <button
                            className="h-48 w-full border "
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
                          >
                            {selectedImage ? (
                              <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-full "
                              />
                            ) : (
                              <span className="text-lg text-gray-500">
                                Upload Image
                              </span>
                            )}
                          </button>
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4">
                  {activeTabTwo === "Text poll" && (
                    <>
                      <div maxW="sm" mx="auto" mt={10}>
                        <form onSubmit={handleSubmit}>
                          <Input
                            variant="flushed"
                            className="w-full pl-1 mb-1 "
                            type="text"
                            placeholder="Ask Your Community..."
                            name="question"
                            value={formData.question}
                            onChange={handleChange}
                          />
                          <Input
                            variant="flushed"
                            className="w-full pl-1 mb-1 "
                            type="text"
                            placeholder="Add Addition"
                            name="addition1"
                            value={formData.addition1}
                            onChange={handleChange}
                          />
                          <Input
                            variant="flushed"
                            className="w-full pl-1 mb-1 "
                            type="text"
                            placeholder="Add Addition"
                            name="addition2"
                            value={formData.addition2}
                            onChange={handleChange}
                          />
                          <Button type="submit" colorScheme="blue" mt={4}>
                            Submit
                          </Button>
                        </form>

                        {/* Display all data */}
                        <Box mt={10}>
                          <Text fontSize="xl" mb={4}>
                            Community Submissions:
                          </Text>
                          {allData.length > 0 ? (
                            allData.map((entry, index) => (
                              <Box
                                key={index}
                                p={4}
                                borderWidth="1px"
                                borderRadius="md"
                                mb={2}
                              >
                                <Text>
                                  <strong>Question:</strong> {entry.question}
                                </Text>
                                <Text>
                                  <strong>Addition 1:</strong> {entry.addition1}
                                </Text>
                                <Text>
                                  <strong>Addition 2:</strong> {entry.addition2}
                                </Text>
                              </Box>
                            ))
                          ) : (
                            <Text>No submissions yet.</Text>
                          )}
                        </Box>
                      </div>
                    </>
                  )}
                </div>
                <div className="mt-4">
                  {activeTabTwo === "Quiz" && (
                    <>
                      <input
                        className="w-full pl-1 mb-1"
                        type="text"
                        placeholder="What is on your mind?"
                      />
                    </>
                  )}
                </div>
                <div className="mt-4">
                  {activeTabTwo === "Video" && (
                    <>
                      <input
                        className="w-full pl-1 mb-1"
                        type="text"
                        placeholder="What is on your mind?"
                      />
                      <div>
                        <div className="flex flex-col">
                          <button
                            className="h-48 w-full border "
                            onClick={() =>
                              document.getElementById("fileInput").click()
                            }
                          >
                            {selectedImage ? (
                              <img
                                src={selectedImage}
                                alt="Selected"
                                className="w-full h-full"
                              />
                            ) : (
                              <span className="text-lg text-gray-500">
                                Upload Image
                              </span>
                            )}
                          </button>
                          <input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-3 flex justify-between">
              <Button
                size={"sm"}
                variant={"outline"}
                borderRadius={"full"}
                className=" bg-gray-100"
              >
                <MdViewArray />
                <span className="pl-1">Activity</span>
              </Button>
              <Button
                size={"sm"}
                variant={"solid"}
                colorScheme="blue"
                borderRadius={"full"}
              >
                Post
              </Button>
            </div>
          </div>
        )}
        
      {/* Toggle gallery and show uploaded images */}
      <Button onClick={toggleGallery} colorScheme="blue" className="mb-4 mt-2">
        {showGallery ? "Hide Gallery" : "Show Gallery"}
      </Button>
      {showGallery && (
        <div className=" grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 ">
          {imageGallery.map((image, index) => (
            <div key={index} className="relative">
              <img
                src={image}
                alt={`Uploaded ${index}`}
                className="w-full h-48 object-cover rounded-lg"
              />
              <Button
                size="xs"
                colorScheme="red"
                onClick={() => handleImageRemove(index)}
                className="absolute -top-[193px] left-0"
              >
                <IoClose className=" text-lg" />
              </Button>
            </div>
          ))}
        </div>
      )}
      </div>
    </>
  );
};

export default MyChannel;
