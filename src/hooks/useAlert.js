import { useState } from "react";

const useAlert = () => {
  const [alert, setAlert] = useState({ show: false, text: "", type: "info" });

  const showAlert = ({ text, type = "info" }) =>
    setAlert({ show: true, text, type });

  const hideAlert = () => setAlert({ show: false, text: "", type: "info" });

  return { alert, showAlert, hideAlert };
};

export default useAlert;
