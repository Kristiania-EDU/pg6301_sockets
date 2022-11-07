import React, { useState } from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const element = document.getElementById("app");
const root = createRoot(element);

function Application() {
  const [username, setUsername] = useState("");

  if (!username) {
    return <Login onLogin={(username) => setUsername(username)}></Login>;
  }

  return <ChatApplication username={username}></ChatApplication>;
}

function ChatApplication({ username }) {
  function handleNewMessageSubmit(e) {
    e.preventDefault();
  }

  return (
    <>
      <header>Chat Application - {username}</header>
      <main>Main</main>
      <footer>
        <form onSubmit={handleNewMessageSubmit}>
          <input type="text" />
          <button>Submit</button>
        </form>
      </footer>
    </>
  );
}

function Login({ onLogin }) {
  const [username, setUsername] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(username);
  }

  return (
    <div onSubmit={handleSubmit}>
      <h1>Login</h1>

      <form>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button type="submit">Login</button>
        </label>
      </form>
    </div>
  );
}

root.render(<Application />);
