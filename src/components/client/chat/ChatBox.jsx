import { useState, useEffect } from "preact/hooks";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

import ChatBotImg from "../../../assets/images/chatbot.png";
import "./ChatBox.css";
import MessageList from "./MessageList";

const ChatBox = () => {
  const [ticketSelected, setTicketSelected] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.addEventListener("ticket-selected", async (e) => {
      const response = await fetch(
        `http://localhost:8080/tickets/${e.detail.id}/messages/`
      );
      const body = await response.json();
      setTicketSelected(e.detail.id);
      setMessages(body.data.messages);
    });

    return () => window.removeEventListener("ticket-selected");
  }, []);

  const handleSendMessage = (message) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: Math.random(),
        content: message,
        role: "user",
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

        <MessageList messages={messages} />
      </div>

      <ChatForm onSendMessage={handleSendMessage} />
    </>
  );
};

export default ChatBox;
