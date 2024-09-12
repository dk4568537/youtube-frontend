import { configureStore } from '@reduxjs/toolkit';
import UserSystem from './UserSystem';

const Store = configureStore({
  reducer: {
    user: UserSystem,
  },
});

export default Store;
