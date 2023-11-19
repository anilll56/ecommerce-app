import React from "react";
import LoginPage from "../pages/login/LoginPage";
import SignUp from "../pages/signUp/SignUp";
import Profile from "../pages/profile/Profile";
import Navbar from "../components/navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Brands from "../components/brands/Brands";
import HomePage from "../pages/home/HomePage";
import Details from "../pages/details/Details";

function RoutePage() {
  return (
    <div>
      <Routes>
        <Route path="/home/*" element={<Navbar />} />
        <Route path="/" element={<Navbar />} />
      </Routes>
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
        <Route path="/home/details/:id" element={<Details />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default RoutePage;
