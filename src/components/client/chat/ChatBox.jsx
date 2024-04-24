import { useState, useEffect } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

import ChatBotImg from "../../../assets/images/chatbot.png";
import UserImg from "../../../assets/images/user.jpg";
import "./ChatBox.css";

const ChatBox = () => {
  const [ticketSelected, setTicketSelected] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.addEventListener("ticket-selected", (e) => {
      setTicketSelected(e.detail.id);
    });

    return () => window.removeEventListener("ticket-selected");
  }, []);

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Math.random(),
        text: message,
      },
    ]);
  };
  return (
    <>
      <div className="chat">
        <ChatMessage className="message--bg-light">
          <ChatMessage.Image src={ChatBotImg.src} alt="Chatbot picture." />
          <ChatMessage.Text>
            {ticketSelected !== 0
              ? `Viendo Ticket N°: ${ticketSelected}`
              : "¡Hola! ¿En que puedo ayudarte ahora?"}
          </ChatMessage.Text>
        </ChatMessage>
        {messages.map((message) => {
          return (
            <Fragment key={message.id}>
              <ChatMessage>
                <ChatMessage.Text>{message.text}</ChatMessage.Text>
                <ChatMessage.Image src={UserImg.src} alt="User picture." />
              </ChatMessage>
              <ChatMessage className="message--bg-light">
                <ChatMessage.Image
                  src={ChatBotImg.src}
                  alt="Chatbot picture."
                />
                <ChatMessage.Text>...</ChatMessage.Text>
              </ChatMessage>
            </Fragment>
          );
        })}
      </div>

      <ChatForm onSendMessage={handleSendMessage} />
    </>
  );
};

export default ChatBox;
