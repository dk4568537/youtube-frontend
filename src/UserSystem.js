import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  channels: [],
  quantity: 0,
};

const UserSystem = createSlice({
  name: "user",
  initialState,
  reducers: {
    Addvideo: (state, action) => {
        const find = state.channels.findIndex(
          ({ channel }) => channel.id === action.payload.id
        );
        if (find >= 0) {
          state.channels[find].quantity = 1;
        } else {
          const tempvar = { ...action.payload, quantity: 1 };
          state.channels.push(tempvar);
        }
      },
      removeFromCart: (state, action) => {
        const id = action.payload;
        state.channels = state.channels.filter(channel => channel.id !== id);
    },  
  },
});

export const { Addvideo, removeFromCart } = UserSystem.actions;
export default UserSystem.reducer;
