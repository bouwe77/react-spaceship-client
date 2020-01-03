import React from "react";

export default ({ messages }) => {
  return (
    <>
      {messages.map(message => (
        <p key={message.id}>{message.text}</p>
      ))}
    </>
  );
};
