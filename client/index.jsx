import React, { useEffect, useState } from "react";
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
  const [webSocket, setWebSocket] = useState();

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3000");

    setWebSocket(ws);
  }, []);

  const [message, setNewMessage] = useState("");
  const [chatLog, setChatlog] = useState([
    { author: "Sebastian", message: "Hello World" },
    { author: "Vegis", message: "Hello you" },
    { author: "Bogdan", message: "Hello me" },
  ]);

  function handleNewMessageSubmit(e) {
    e.preventDefault();

    setChatlog([
      ...chatLog,
      {
        author: username,
        message: message,
      },
    ]);

    setNewMessage("");
  }

  return (
    <>
      <header>Chat Application - {username}</header>
      <main>
        {chatLog.map((chat, index) => (
          <ChatElement chat={chat} key={index}></ChatElement>
        ))}
      </main>
      <footer>
        <form onSubmit={handleNewMessageSubmit}>
          <input
            value={message}
            onChange={(e) => setNewMessage(e.target.value)}
            type="text"
          />
          <button>Submit</button>
        </form>
      </footer>
    </>
  );
}

function ChatElement({ chat: { author, message } }) {
  return (
    <div>
      <strong>{author}</strong>: {message}
    </div>
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
