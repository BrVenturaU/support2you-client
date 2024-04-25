import { useState, useEffect } from "preact/hooks";
import ChatForm from "./ChatForm";
import ChatMessage from "./ChatMessage";
import { Toaster, toast } from "sonner";

import ChatBotImg from "../../../assets/images/chatbot.png";
import "./ChatBox.css";
import MessageList from "./MessageList";

import {
  createTicket,
  getTicketMessages,
  processTicketMessage,
  updateTicketStatus,
} from "../../../scripts/requests";
import { TICKET_STATUS } from "../../../scripts/ticket-helpers";

const ChatBox = () => {
  const [ticketSelected, setTicketSelected] = useState(0);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    window.addEventListener("ticket-selected", async (e) => {
      const ticketId = e.detail.id;
      const messagesPromise = getTicketMessages(ticketId);
      toast.promise(messagesPromise, {
        loading: "Cargando mensajes...",
        success: () => "Los mensajes han sido cargados.",
      });
      setTicketSelected(ticketId);
      setMessages(await messagesPromise);
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
    toast("¿Tu duda ha sido resuelta?", {
      duration: 12000,
      description: `Si necesita apoyo de un agente, de clic en "Agente" para que su ticket sea transferido a uno. Si su duda fue resuelta seleccione "Sí". Si desea continuar cierre este mensaje o deje que desaparezca.`,
      action: {
        label: "Agente",
        onClick: async () => {
          await updateTicketStatus(ticketId, TICKET_STATUS.ABIERTO);
          window.dispatchEvent(
            new CustomEvent("ticket-updated", {
              detail: {
                id: ticketId,
                status: TICKET_STATUS.ABIERTO,
              },
            })
          );
        },
      },
      cancel: {
        label: "Sí",
        onClick: async () => {
          await updateTicketStatus(ticketId, TICKET_STATUS.RESUELTO);
          window.dispatchEvent(
            new CustomEvent("ticket-updated", {
              detail: {
                id: ticketId,
                status: TICKET_STATUS.RESUELTO,
              },
            })
          );
        },
      },
    });
  };
  return (
    <>
      <Toaster closeButton />
      <div class="chat-wrapper">
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
      </div>
    </>
  );
};

export default ChatBox;
