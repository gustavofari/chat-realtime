import { useState, useEffect } from "react";
import queryString from "query-string";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "localhost:5000";

  const location = useLocation().search;

  useEffect(() => {
    const { name, room } = queryString.parse(location);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit("join", { name, room }, (error) => {
      if (error) {
        alert(error);
      }
    });

    return () => {
      // ComponentWillUnmount - desconectar o socket ao sair do componente
      socket.disconnect();
      socket.off();
    };
  }, [ENDPOINT, location]);

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages([...messages, message]);
    });
  }, [messages]);

  const sendMessage = (event) => {
    event.preventDefault();

    if (message) {
      socket.emit("sendMessage", message, () => setMessage(""));
    }
  };

  console.log(message, messages);

  return (
    <div className="outerContainer">
      <div className="container">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          onKeyUp={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
        />
      </div>
    </div>
  );
};

export default Chat;
