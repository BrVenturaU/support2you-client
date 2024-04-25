import { useState, useEffect } from "preact/hooks";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

import ChatBotImg from "../../../assets/images/chatbot.png";
import "./ChatBox.css";
import MessageList from "./MessageList";

import {
  createTicket,
  getTicketMessages,
  processTicketMessage,
} from "../../../scripts/requests";

const ChatBox = () => {
  const [ticketSelected, setTicketSelected] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.addEventListener("ticket-selected", async (e) => {
      const ticketId = e.detail.id;
      const messages = await getTicketMessages(ticketId);
      setTicketSelected(ticketId);
      setMessages(messages);
    });

    return () => window.removeEventListener("ticket-selected");
  }, []);

  const handleSendMessage = async (message) => {
    let ticketId = ticketSelected;

    if (ticketId === 0) {
      ticketId = await createTicket();

      window.dispatchEvent(
        new CustomEvent("ticket-created", {
          detail: {
            id: ticketId,
          },
        })
      );
    }

    const [userMessage, assistantMessage] = await processTicketMessage(
      ticketId,
      message
    );

    setTicketSelected(ticketId);
    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          ...userMessage,
        },
        {
          ...assistantMessage,
        },
      ];
    });
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
