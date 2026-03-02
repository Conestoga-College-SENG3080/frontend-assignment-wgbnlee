import { useState, useEffect } from "react";
import "./App.css";
import { login, getProfile } from "./api";
import { Link } from "react-router-dom";

function App() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");

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
    </div>
  );
}

export default App;
