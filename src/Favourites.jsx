import { useState, useEffect } from "react";
import "./Favourites.css";
import { Link } from "react-router-dom";

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
