import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import io from "socket.io-client";

function App() {
  //include web socket to resolve cors error
  const socket = io("http://localhost:3000", { transports: ["websocket"] });
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    socket.emit("chat message", message);
    setMessage("");
  };
  socket.on("message", (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  return (
    <>
      <ul>
        {messages.map((msg, index) => (
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <div>
        {console.log(messages)}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default App;
