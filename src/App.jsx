import { useState, useEffect } from "react";
import "./App.css";

// Using .env file excluded from git commits.
// They contain raw values of API_URL, username and password.
const API_URL = import.meta.env.VITE_API_URL;
const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

function App() {
  const [token, setToken] = useState(null);
  const [name, setName] = useState("");

  // Prevent loops and only run login once!
  useEffect(() => {
    login();
  }, []);

  async function login() {
    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: USERNAME,
          password: PASSWORD,
        }),
      });

      if (!res.ok) {
        throw new Error("Login unsuccessful");
      }

      const data = await res.json();
      setToken(data.access_token);
      getName(data.access_token);
    } catch (err) {
      console.error("Error with login: ", err);
    }
  }

  async function getName(jwt) {
    try {
      const res = await fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: "Bearer " + jwt,
        },
      });

      const data = await res.json();

      setName(data.firstName + " " + data.lastName);
    } catch (err) {
      console.error("Error getting name: ", err);
    }
  }

  return (
    <div>
      <h1>Favourite Creddit Posts</h1>

      <h2>{name}</h2>

      {!token && <p>Logging in...</p>}
      {token && <p>Logged in!</p>}
    </div>
  );
}

export default App;
