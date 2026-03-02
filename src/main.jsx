/*
 * Filename     : main.jsx
 * Project      : PROG3080 - Frontend Assignment
 * Programmers  : Will Lee
 * Date         : 3/1/2026
 * Description  : This file is the main file that the app runs from.
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx";
import Favourites from "./Favourites.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/frontend-assignment-wgbnlee/">
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/favourites" element={<Favourites />} />
    </Routes>
  </BrowserRouter>,
);
