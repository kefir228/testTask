import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postSlice';
import authReducer from './slices/authSlice';
import commentsReducer from './slices/commentSlice';
import usersReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,  
    posts: postsReducer,
    comments: commentsReducer,
    users: usersReducer,
  },
});

