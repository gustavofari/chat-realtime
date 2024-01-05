import ScrollToBottom from "react-scroll-to-bottom";
import "./Messages.css";
import Message from "./Message/Message";

// eslint-disable-next-line react/prop-types
const Messages = ({ messages, name }) => {
  console.log(name);
  return (
    <ScrollToBottom className="messages">
      {messages.map((message, i) => (
        <div key={i}>
          <Message message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};

export default Messages;
