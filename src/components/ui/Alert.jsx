import React from "react";

const Alert = ({ text, type }) => {
  return (
    <div className={`alert alert-${type}`} role="alert">
      <div className="alert-content">
        <span className="alert-text">{text}</span>
      </div>
    </div>
  );
};

export default Alert;
