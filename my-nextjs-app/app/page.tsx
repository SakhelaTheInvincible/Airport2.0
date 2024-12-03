"use client";
import "./globals.css";
import React, { useState, useEffect } from "react";
import FindTickets from "./homepage";

const Home = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.location.href = "/auth/login";
  };

  return (
    <FindTickets />
  );
};

export default Home;
