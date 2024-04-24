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
    liEl.setAttribute("data-id", ticket.id);
    liEl.textContent = `Ticket N°: ${ticket.id}`;

    liEl.addEventListener("click", function () {
      console.log(`Item selected: ${liEl.dataset.id}`);
    });

    fragment.appendChild(liEl);
  });

  ticketsContainer.appendChild(fragment);
}

renderTickets()
