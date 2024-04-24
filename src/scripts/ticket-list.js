document.addEventListener("DOMContentLoaded", function () {
  getItems();
});

function getItems() {
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      const postsContainer = document.querySelector(".nav__items");
      const fragment = document.createDocumentFragment();

      data.slice(0, 20).forEach((post) => {
        const liEl = document.createElement("li");
        liEl.className = "nav__item";
        liEl.setAttribute("data-id", post.id);
        liEl.textContent = `Ticket N°: ${post.id}`;

        liEl.addEventListener("click", function () {
          console.log("item selected");
        });

        fragment.appendChild(liEl);
      });

      postsContainer.appendChild(fragment);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}
