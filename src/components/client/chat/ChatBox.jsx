import { useState, useEffect } from "preact/hooks";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";

import ChatBotImg from "../../../assets/images/chatbot.png";
import "./ChatBox.css";
import MessageList from "./MessageList";

import { API_URL } from "../../../scripts/config";

const ChatBox = () => {
  const [ticketSelected, setTicketSelected] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.addEventListener("ticket-selected", async (e) => {
      const response = await fetch(
        `${API_URL}/tickets/${e.detail.id}/messages/`
      );
      const body = await response.json();
      setTicketSelected(e.detail.id);
      setMessages(body.data.messages);
    });

    return () => window.removeEventListener("ticket-selected");
  }, []);

  const handleSendMessage = async (message) => {
    let ticketId = ticketSelected;

    if (ticketId === 0) {
      const ticketResponse = await fetch(`${API_URL}/tickets`, {
        method: "POST",
      });
      const { data: ticketData } = await ticketResponse.json();
      ticketId = ticketData.id;
      window.dispatchEvent(
        new CustomEvent("ticket-created", {
          detail: {
            id: ticketId,
          },
        })
      );
    }

    const messageResponse = await fetch(
      `${API_URL}/tickets/${ticketId}/messages`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: message,
        }),
      }
    );

    const { data: messageData } = await messageResponse.json();
    setTicketSelected(ticketId);
    setMessages((prevMessages) => {
      return [
        ...prevMessages,
        {
          ...messageData.user,
          role: "user",
        },
        {
          ...messageData.assistant,
          role: "assistant",
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
