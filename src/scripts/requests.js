import { API_URL } from "./config";

const TICKETS_URL = `${API_URL}/tickets`;

export const getTickets = async () => {
  const response = await fetch(`${TICKETS_URL}`);
  const body = await response.json();
  return body.data;
};

export const createTicket = async () => {
  const ticketResponse = await fetch(`${TICKETS_URL}`, {
    method: "POST",
  });
  const body = await ticketResponse.json();
  return body.data.id;
};

export const updateTicketStatus = async (ticketId, status) => {
  const ticketResponse = await fetch(`${TICKETS_URL}/${ticketId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      status,
    }),
  });
  const body = await ticketResponse.json();
  return {
    id: ticketId,
    ...body.data,
  };
};

export const getTicketMessages = async (ticketId) => {
  const response = await fetch(`${TICKETS_URL}/${ticketId}/messages/`);
  const body = await response.json();

  return body.data.messages;
};

export const processTicketMessage = async (ticketId, message) => {
  const messageResponse = await fetch(`${TICKETS_URL}/${ticketId}/messages/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: message,
    }),
  });

  const { data } = await messageResponse.json();

  return [
    {
      ...data.user,
      role: "user",
    },
    {
      ...data.assistant,
      role: "assistant",
    },
  ];
};

export default {
  getTickets,
  createTicket,
  getTicketMessages,
  processTicketMessage,
};
