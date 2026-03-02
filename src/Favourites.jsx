/*
 * Filename     : Favourites.jsx
 * Project      : PROG3080 - Frontend Assignment
 * Programmers  : Will Lee
 * Date         : 3/1/2026
 * Description  : This file is the Favourite.jsx file where Favourite() function lives in.
 *                Contains functions and logics for favourite posts page.
 */

import { useState, useEffect } from "react";
import "./Favourites.css";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

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

  const [posts, setPosts] = useState([]);
  const [favourites, setFavourites] = useState([]);

  // Prevent loops and only run login once!
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favourites")) || [];
    setFavourites(stored);
  }, []);

  // Rerun this useEffect ONLY WHEN "favourites" changes.
  useEffect(() => {
    if (favourites.length === 0) {
      setPosts([]);
      return;
    }

    /*
    Function	: Favourites()
    Purpose : This function loads posts from backend by sending JSON string of favourite posts' id.
    Input	: None
    Returns	: N/A
    */
    async function loadPosts() {
      const res = await fetch(`${API_URL}/posts`, {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ids: favourites,
        }),
      });
      const data = await res.json();

      setPosts(data);
    }
    loadPosts();
  }, [favourites]);

  /*
    Function	: removeFavourite()
    Purpose : This function removes a favourite post from localStorage.
    Input	: postId: Id of the post to remove from favourite posts.
    Returns	: N/A
*/
  function removeFavourite(postId) {
    const updated = favourites.filter((id) => id !== postId);

    setFavourites(updated);

    localStorage.setItem("favourites", JSON.stringify(updated));
  }

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

      <div style={{ marginTop: "80px" }}>
        <h2>Favourite Posts</h2>

        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            <p>Author: {post.author}</p>

            <p>Likes: {post.totalLikes}</p>

            <p>Views: {post.totalRead}</p>

            <button onClick={() => removeFavourite(post.id)}>
              Remove Favourite
            </button>

            <hr />
          </div>
        ))}

        {posts.length === 0 && <h2>No favourites yet</h2>}
      </div>
    </div>
  );
}

export default Favourites;
