// Using .env file excluded from git commits.
// They contain raw values of API_URL, username and password.
// api.js
const API_URL = import.meta.env.VITE_API_URL;
const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

export async function login() {
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
  return data.access_token;
}

export async function getProfile(jwt) {
  const res = await fetch(`${API_URL}/auth/profile`, {
    headers: {
      Authorization: "Bearer " + jwt,
    },
  });

  if (!res.ok) {
    throw new Error("Profile fetch unsuccessful");
  }

  return await res.json();
}
