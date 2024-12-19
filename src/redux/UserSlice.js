import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  authenticated: false,
  info: null,
  favorites: [],
  searchValue: "Ürün Adı",
  searchInput: "",
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.info = action.payload;
    },
    logout: (state) => {
      state.user = null;
      toast.info("Çıkış yapıldı");
    },
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    addFavorite: (state, action) => {
      state.favorites.push(action.payload);
      toast.success(" Ürün Favorilere eklendi");
    },
    removeFavoriteFromRedux: (state, action) => {
      state.favorites.splice(
        state.favorites.findIndex((item) => item.id === action.payload)
      );
      toast.error(" Ürün Favorilerden çıkarıldı");
    },
    setSearchInput: (state, action) => {
      state.searchInput = action.payload;
    },
    setSearchValue: (state, action) => {
      state.searchValue = action.payload;
    },
    setFavorites: (state, action) => {
      state.favorites = action.payload;
    },
  },
});

export const {
  setUser,
  logout,
  setAuthenticated,
  addFavorite,
  removeFavoriteFromRedux,
  setSearchInput,
  setSearchValue,
  setFavorites,
} = userSlice.actions;

export default userSlice.reducer;
