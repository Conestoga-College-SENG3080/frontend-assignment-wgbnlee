/*
 * Filename     : App.jsx
 * Project      : PROG3080 - Frontend Assignment
 * Programmers  : Will Lee
 * Date         : 3/1/2026
 * Description  : This file is the App file that contains functions and logics for
 *                the root of the web app.
 */

import { useState, useEffect } from "react";
import "./App.css";
import { login, getProfile } from "./api";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

/*
    Function	: App()
    Purpose : main function of App.jsx. Contains other functions within it. Holds the logic
              for "Home" page of the app. Returns html elements.
              Exported to be used in main.jsx.
    Input	: None
    Returns	: div containing the web page
*/
function App() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [forum, setForum] = useState("");
  const [posts, setPosts] = useState([]);
  const [favourites, setFavourites] = useState([]);

  /*
    Function	: loadPosts()
    Purpose : This function fetches to the backend with jwt and receives 10 posts based on
              the value of forum and sets posts constant.
    Input	: None
    Returns	: Nothing
  */
  async function loadPosts() {
    // Preset to "hot" and limit 10 posts on fetch
    const res = await fetch(`${API_URL}/forums/${forum}?sortBy=hot&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    const data = await res.json();

    setPosts(data);
  }

  /*
    Function	: addFavourite()
    Purpose : This function adds a post to favourites on localStorage.
    Input	: postId: Id of the post to add.
    Returns	: Nothing
  */
  function addFavourite(postId) {
    const updated = [...favourites, postId];

    setFavourites(updated);

    localStorage.setItem("favourites", JSON.stringify(updated));
  }

  /*
    Function	: removeFavourite()
    Purpose : This function removes a post from favourites on localStorage.
    Input	: postId: Id of post to remove.
    Returns	: Nothing
  */
  function removeFavourite(postId) {
    const updated = favourites.filter((id) => id !== postId);

    setFavourites(updated);

    localStorage.setItem("favourites", JSON.stringify(updated));
  }

  /*
    Function	: isFavourite()
    Purpose : This function returns the status of the post. Whether it is favourite or not.
    Input	: postId: Id of post to return the status for.
    Returns	: Nothing
  */
  function isFavourite(postId) {
    return favourites.includes(postId);
  }

  // Prevent loops and only run login once!
  useEffect(() => {
    /*
    Function	: authenticate()
    Purpose : This function authenticates the login and receive the profile.
              Also sets token, name and favourites.
    Input	: None
    Returns	: Nothing
    */
    async function authenticate() {
      try {
        const jwt = await login();
        setToken(jwt);

        const profile = await getProfile(jwt);
        const fullName = profile.firstName + " " + profile.lastName;
        setName(fullName);

        localStorage.setItem("token", jwt);
        localStorage.setItem("name", fullName);

        const stored = JSON.parse(localStorage.getItem("favourites")) || [];
        setFavourites(stored);
      } catch (err) {
        console.error("Authentication Error: ", err);
      }
    }

    authenticate();
  }, []);

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
        <h2>Select Forum</h2>

        <input
          value={forum}
          onChange={(e) => setForum(e.target.value)}
          placeholder="Enter forum name"
        />

        <button onClick={loadPosts}>Load Posts</button>
      </div>

      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <hr />
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            <p>Author: {post.author}</p>

            <p>Likes: {post.totalLikes}</p>

            <p>Views: {post.totalRead}</p>

            <p>Created At: {post.createdAt}</p>

            <button
              onClick={() => {
                if (isFavourite(post.id)) {
                  removeFavourite(post.id);
                } else {
                  addFavourite(post.id);
                }
              }}
            >
              {isFavourite(post.id) ? "Remove Favourite" : "Add Favourite"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
