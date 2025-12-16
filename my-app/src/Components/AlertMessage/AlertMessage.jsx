import React from "react";
import {
  AiOutlineCheckCircle,
  AiOutlineCloseCircle,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import "../../style/AlertMessage.css";

const AlertMessage = ({ type, message }) => {
  let icon, alertType;

  switch (type) {
    case "error":
      icon = <AiOutlineCloseCircle className="alert-icon red" />;
      alertType = "error";
      break;
    case "success":
      icon = <AiOutlineCheckCircle className="alert-icon green" />;
      alertType = "success";
      break;
    case "loading":
      icon = (
        <AiOutlineLoading3Quarters className="alert-icon blue spinner" />
      );
      alertType = "loading";
      break;
    default:
      icon = null;
  }

  return (
    <div className="alert-wrapper">
      <div className={`alert-box ${alertType}`}>
        {icon}
        <span className="alert-text">{message}</span>
      </div>
    </div>
  );
};

export default AlertMessage;
