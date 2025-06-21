import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./assets/components/landing/Landing";
import Login from "./assets/components/login/Login";
import "./index.css";
import "./assets/components/landing/landing.css";
import "./assets/components/login/login.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
