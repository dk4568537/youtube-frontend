import React, { useState, useEffect } from "react";
import ReactResponsiveChat from "react-responsive-chat";
import classes from "./Live.css";
import { messagesData, roomsData, user } from "./dummydata";

export default function Live() {
  // For Chat Rooms
  const [isLoadingChatRooms, setIsLoadingChatRooms] = useState(false);
  const [chatRooms, setChatRooms] = useState([]);
  const [selectedChatRoom, setSelectedChatRoom] = useState(null);
  const [totalRooms, setTotalRooms] = useState(10);

  // For Chats
  const [chats, setChats] = useState([]);
  const [isLoadingChats, setIsLoadingChats] = useState(false);

  // Required For Load More Case
  const [roomsPageNo, setRoomsPageNo] = useState(1);
  const [totalChats, setTotalChats] = useState(0);
  const [chatsPageNo, setChatsPageNo] = useState(1);
  const recordsLimit = 10;

  // For Fetching Chat Rooms
  async function getChatRooms(pg = roomsPageNo) {
    setIsLoadingChatRooms(true);
    await new Promise((res) => {
      setTimeout(() => {
        res(setChatRooms(roomsData));
      }, 2000);
    });
    setIsLoadingChatRooms(false);
  }

  useEffect(() => {
    getChatRooms(1);
  }, []);

  // For Fetching Chats
  async function getChats(pg = chatsPageNo) {
    setIsLoadingChats(true);
    await new Promise((res) => {
      setTimeout(() => {
        res(
          setChats(
            messagesData?.filter((item) => item?.room == selectedChatRoom?._id)
          )
        );
      }, 2000);
    });
    setIsLoadingChats(false);
  }

  useEffect(() => {
    if (selectedChatRoom !== null) {
      const savedChats = JSON.parse(localStorage.getItem(`chats_${selectedChatRoom?._id}`)) || [];
      setChats(savedChats);
      getChats();
    }
  }, [selectedChatRoom]);

  // Function to save chats to localStorage
  const saveChatsToLocalStorage = (chatRoomId, updatedChats) => {
    localStorage.setItem(`chats_${chatRoomId}`, JSON.stringify(updatedChats));
  };

  return (
    <ReactResponsiveChat
      containerClassName={classes.chat}
      chats={chats}
      chatRooms={chatRooms}
      selectedChatRoom={selectedChatRoom}
      onChatRoomSelection={(e) => setSelectedChatRoom(e)}
      user={user}
      isLoadingChats={isLoadingChats}
      isLoadingChatRooms={isLoadingChatRooms}
      onSend={(e) => {
        const updatedChats = [...chats, e];
        setChats(updatedChats);
        saveChatsToLocalStorage(selectedChatRoom?._id, updatedChats); // Save chats to localStorage
      }}
      // Required For Load More Case
      chatsPage={chatsPageNo}
      isLoadMoreChats={Math.ceil(totalChats / recordsLimit) > chatsPageNo}
      isLoadMoreChatRooms={Math.ceil(totalRooms / recordsLimit) > roomsPageNo}
      onLoadMoreChats={async (e) => {
        const pg = chatsPageNo + 1;
        await getChats(pg); // Note: Page must be updated after Api call
        setChatsPageNo(pg);
      }}
      onLoadMoreChatRooms={async () => {
        const pg = roomsPageNo + 1;
        await getChatRooms(pg); // Note: Page must be updated after Api call
        setRoomsPageNo(pg);
      }}
    />
  );
}
