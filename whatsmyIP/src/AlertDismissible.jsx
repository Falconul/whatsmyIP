import { useState, useEffect } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function AlertDismissible() {
  const [show, setShow] = useState(true);
  const [alertColor, setAlertColor] = useState("success");
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    if (show) {
      const id = setInterval(() => {
        setAlertColor((prevColor) => (prevColor === "success" ? "warning" : "success"));
      }, 500);
      setIntervalId(id);
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [show]);

  const handleClose = () => {
    setShow(false);
    clearInterval(intervalId);
    setAlertColor("success"); 
  };

  const handleShow = () => {
    setShow(true);
    setAlertColor("warning"); 
    const id = setInterval(() => {
      setAlertColor((prevColor) => (prevColor === "success" ? "warning" : "success"));
    }, 500);
    setIntervalId(id);
  };

  if (show) {
    return (
      <Alert variant={alertColor} onClose={handleClose} dismissible>
        <Alert.Heading>OhOh! Your IP address is visible!</Alert.Heading>
        <p>
          Your online activity can be seen by your internet service provider and
          anyone else spying on your connection...
        </p>
      </Alert>
    );
  }

  return (
    <Button onClick={handleShow} className={`bg-${alertColor} border border-${alertColor}`}>
      Show Alert
    </Button>
  );
}

export default AlertDismissible;
