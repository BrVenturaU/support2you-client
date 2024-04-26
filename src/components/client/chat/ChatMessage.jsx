import "./ChatMessage.css";

const ChatMessage = ({ className, children }) => {
  return <div className={`message ${className ?? ""}`}>{children}</div>;
};

ChatMessage.Image = (props) => {
  return <img className="message__image" {...props} />;
};

ChatMessage.Text = ({ children }) => {
  return <span className="message__text">{children}</span>;
};

export default ChatMessage;
