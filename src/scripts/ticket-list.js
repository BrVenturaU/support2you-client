const API_URL = import.meta.env.PUBLIC_API_URL;

export const getTickets = async () => {
  const response = await fetch(`${API_URL}/tickets`);
  const body = await response.json();
  return body.data;
};

async function renderTickets() {
  const ticketsContainer = document.querySelector(".nav__items");
  const fragment = document.createDocumentFragment();

  const tickets = await getTickets();

  tickets.forEach((ticket) => {
    const liEl = document.createElement("li");
    liEl.className = "nav__item";
    liEl.setAttribute("data-app-id", ticket.id);
    liEl.textContent = `Ticket N°: ${ticket.id}`;

    fragment.appendChild(liEl);
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
