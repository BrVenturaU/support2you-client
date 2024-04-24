import ChatBotImg from "../assets/images/chatbot.png";
import UserBotImg from "../assets/images/user.jpg";

const messageBox = document.querySelector(".chat");
const messageBar = document.querySelector(".bar__control");
const sendBtn = document.querySelector(".bar__btn");

sendBtn.onclick = function () {
  if (messageBar.value.length > 0) {
    const UserTypedMessage = messageBar.value;
    messageBar.value = "";

    let message = `<div class="message">
    <span class="message__text">
      ${UserTypedMessage}
    </span>
    <img class="message__image" src="${UserBotImg.src}">
  </div>`;

    let response = `<div class="message message--bg-light">
  <img class="message__image" src="${ChatBotImg.src}">
  <span class="message__text">...
  </span>
</div>`;

    messageBox.innerHTML += message

    setTimeout(() => {
      messageBox.innerHTML += response
    }, 100);
  }
};
