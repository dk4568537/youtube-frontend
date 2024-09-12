import moment from "moment";

// Code for generate unique id
function generateCustomID() {
  const timestamp = ((new Date().getTime() / 1000) | 0).toString(16);
  const randomValue = ((Math.random() * 16) | 0).toString(16);
  const customID = `${timestamp}0000000000000000${randomValue}`.slice(-16);
  return customID;
}

// My Data
export const user = {
  fullName: "John Smith",
  photo:
    "https://tse2.mm.bing.net/th?id=OIP.ZYO4CEYCmBwPI9eCMHPQdwHaHa&pid=Api&P=0&h=180",
  _id: "123",
  lastActive: moment().format(),
  isOnline: true,
};
// Receiver User Data
export const receiver1 = {
  fullName: "Danesh Kumar",
  photo: `${localStorage.getItem("selectedImage") || "D"}`,
  _id: "12356",
  lastActive: moment().format(),
  isOnline: true,
};
export const receiver2 = {
  fullName: "John",
  photo:
    "https://tse2.mm.bing.net/th?id=OIP.ZYO4CEYCmBwPI9eCMHPQdwHaHa&pid=Api&P=0&h=180",
  _id: "12356",
  lastActive: moment().format(),
  isOnline: false,
};

export const roomsData = [
  {
    unReadCount: 1,
    sender: user,
    receiver: receiver1,
    _id: "466",
    createdAt: moment().format(),
    lastMessage: {
      _id: generateCustomID(),
      text: "Hi",
      createdAt: moment().format(),
      user: user,
    },
  },
  {
    unReadCount: 2,
    sender: user,
    receiver: receiver2,
    _id: "477",
    createdAt: moment().format(),
    lastMessage: {
      _id: generateCustomID(),
      text: "Hellow",
      createdAt: moment().format(),
      user: receiver2,
    },
  },
];

export const messagesData = [
  {
    _id: generateCustomID(),
    text: "Hello",
    createdAt: new Date(),
    user: user,
    isSeen: false,
    room: "466",
  },
  {
    _id: generateCustomID(),
    text: "Hi there!",
    createdAt: new Date(),
    user: receiver1,
    isSeen: false,
    room: "466",
  },
  {
    _id: generateCustomID(),
    text: "Dummy Text",
    createdAt: new Date(),
    user: receiver1,
    isSeen: false,
    room: "477",
  },
];
