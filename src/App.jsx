import { useState, useEffect } from "react";
import "./App.css";
import { login, getProfile } from "./api";

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
        setName(profile.firstName + " " + profile.lastName);
      } catch (err) {
        console.error("Authentication Error: ", err);
      }
    }

    authenticate();
  }, []);

  return (
    <div>
      <div className="title">Favourite Creddit Posts</div>

      <div className="username">{name}</div>
    </div>
  );
}

export default App;
