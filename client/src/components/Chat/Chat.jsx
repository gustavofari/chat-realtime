import React, { useState, useEffect } from "react";
import queryString from "query-STRING";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";

let socket;

const Chat = () => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const ENDPOINT = "localhost:5173";

  const location = useLocation().search;

  useEffect(() => {
    const { name, room } = queryString.parse(location);

    socket = io(ENDPOINT);

    setName(name);
    setRoom(room);
    console.log(socket);
  });

  // [location];

  return <div>Chat</div>;
};

export default Chat;
