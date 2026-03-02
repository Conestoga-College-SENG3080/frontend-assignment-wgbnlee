/*
 * Filename     : main.jsx
 * Project      : PROG3080 - Frontend Assignment
 * Programmers  : Will Lee
 * Date         : 3/1/2026
 * Description  : This file is the main file that the app runs from.
 */

import { useState, useEffect } from "react";
import "./Favourites.css";
import { Link } from "react-router-dom";

/*
    Function	: Favourites()
    Purpose : main function of Favourties.jsx. Contains other functions within it.
              Holds the logic for "Favourite Posts" page of the app.
              Returns html elements. Exported to be used in main.jsx.
    Input	: None
    Returns	: div containing the web page
*/
function Favourites() {
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");

  return (
    <div>
      <div className="title">Favourite Creddit Posts</div>

      <div className="navbar">
        <Link to="/">
          <button>Home</button>
        </Link>

        <Link to="/favourites">
          <button>Favourite Posts</button>
        </Link>
      </div>

      <div className="username">{name}</div>
    </div>
  );
}

export default Favourites;
