import { useState, useEffect } from "react";
import "./App.css";
import { login, getProfile } from "./api";
import { Link } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

function App() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");
  const [forum, setForum] = useState("");
  const [posts, setPosts] = useState([]);

  async function loadPosts() {
    const res = await fetch(`${API_URL}/forums/${forum}?sortBy=hot&limit=10`, {
      headers: {
        Authorization: `Bearer ${token}`,
        accept: "application/json",
      },
    });

    const data = await res.json();

    setPosts(data);
  }

  // Prevent loops and only run login once!
  useEffect(() => {
    async function authenticate() {
      try {
        const jwt = await login();
        setToken(jwt);

        const profile = await getProfile(jwt);
        const fullName = profile.firstName + " " + profile.lastName;
        setName(fullName);

        localStorage.setItem("token", jwt);
        localStorage.setItem("name", fullName);
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
            <h3>{post.title}</h3>

            <p>{post.content}</p>

            <p>Author: {post.author}</p>

            <p>Likes: {post.totalLikes}</p>

            <p>Views: {post.totalRead}</p>

            <p>Created At: {post.createdAt}</p>

            <hr />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
