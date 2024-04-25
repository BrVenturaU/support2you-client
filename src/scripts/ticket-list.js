import { getTickets } from "./requests";
import { TICKET_STATUS } from "./ticket-helpers";

const renderTicket = (ticket) => {
  const fragment = document.createDocumentFragment();

  const liEl = document.createElement("li");
  liEl.className = "nav__item";
  liEl.setAttribute("data-app-id", ticket.id);
  liEl.setAttribute("data-app-status", ticket.status ?? TICKET_STATUS.NUEVO);
  liEl.textContent = `Ticket N°: ${ticket.id}`;

  fragment.appendChild(liEl);

  return fragment;
};

async function renderTickets() {
  const ticketsContainer = document.querySelector(".nav__items");
  const fragment = document.createDocumentFragment();

  const tickets = await getTickets();

  tickets.forEach((ticket) => {
    const ticketEl = renderTicket(ticket);
    fragment.appendChild(ticketEl);
  });

  ticketsContainer.appendChild(fragment);
  ticketsContainer.addEventListener("click", (e) => {
    const target = e.target;
    if (target.tagName !== "LI") return;

    ticketsContainer
      .querySelector(".nav__item--active")
      ?.classList.remove("nav__item--active");
    target.classList.add("nav__item--active");
    const id = +target.dataset.appId;
    const ticketSelectedEvent = new CustomEvent("ticket-selected", {
      detail: {
        id,
      },
    });

    window.dispatchEvent(ticketSelectedEvent);
  });
}

renderTickets();

window.addEventListener("ticket-created", (e) => {
  const ticket = e.detail;
  const ticketsContainerEl = document.querySelector(".nav__items");
  const ticketEl = renderTicket(ticket);

  ticketsContainerEl.appendChild(ticketEl);
});

window.addEventListener("ticket-updated", (e) => {
  const ticket = e.detail;
  const ticketEl = document.querySelector(
    `.nav__item [data-app-id="${ticket.id}"]`
  );
  ticketEl.setAttribute("data-app-status", ticket.status);
});
