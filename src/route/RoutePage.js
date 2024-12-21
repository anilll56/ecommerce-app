import React from "react";
import LoginPage from "../pages/login/LoginPage";
import SignUp from "../pages/signUp/SignUp";
import Profile from "../pages/profile/Profile";
import Navbar from "../components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Brands from "../components/brands/Brands";
import HomePage from "../pages/home/HomePage";
import Details from "../pages/details/Details";
import FavoritesPage from "../pages/favorite/FavoritesPage";
import BasketPage from "../pages/basket/BasketPage";
import Footer from "../components/Footer/Footer";
import About from "../pages/About/About";

function RoutePage() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Brands />} />
        <Route path="/" element={<Brands />} />
      </Routes>
      {/* <Routes>
        <Route path="/home/*" element={<Navbar />} />
        <Route path="/" element={<Navbar />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
      </Routes> */}

      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home/details/:id" element={<Details />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/profile" element={<Profile />} />
        <Route path="/home/favorites" element={<FavoritesPage />} />
        <Route path="/home/BasketPage" element={<BasketPage />} />
        <Route path="/home/about" element={<About />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default RoutePage;
