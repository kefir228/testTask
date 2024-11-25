import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: !!localStorage.getItem('currentUser'),
  currentUser: JSON.parse(localStorage.getItem('currentUser')) || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
      localStorage.setItem('currentUser', JSON.stringify(action.payload)); 
    },
    logout(state) {
      state.isAuthenticated = false;
      state.currentUser = null;
      localStorage.removeItem('currentUser'); 
    },
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
