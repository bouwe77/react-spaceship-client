import React from "react";

export default ({ messages }) => {
  return (
    <>
      {messages.map(message => (
        <p>{message}</p>
      ))}
    </>
  );
};
