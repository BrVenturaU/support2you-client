import { useEffect, useState } from "preact/hooks";
import { Fragment } from "preact/jsx-runtime";
import ChatMessage from "./ChatMessage";

import ChatBotImg from "../../../assets/images/chatbot.png";
import UserImg from "../../../assets/images/user.jpg";

const MessageList = ({ messages }) => {
  return (
    <>
      {messages.map((message) => {
        return (
          <Fragment key={message.id}>
            {message.role === "user" && (
              <ChatMessage>
                <ChatMessage.Text>{message.content}</ChatMessage.Text>
                <ChatMessage.Image src={UserImg.src} alt="User picture." />
              </ChatMessage>
            )}

            {message.role === "assistant" && (
              <ChatMessage className="message--bg-light">
                <ChatMessage.Image
                  src={ChatBotImg.src}
                  alt="ChatBot picture."
                />
                <ChatMessage.Text>{message.content}</ChatMessage.Text>
              </ChatMessage>
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default MessageList;
