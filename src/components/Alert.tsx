"use client";

import Alert from "react-bootstrap/Alert";
import "bootstrap/dist/css/bootstrap.min.css";

import { setShowAlert } from "@/redux/slices/alertSlice";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-hook";

interface AlertProps {
  text: string;
}

function AlertItem({ text }: AlertProps) {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.alert);

  const handleClose = () => {
    dispatch(setShowAlert(false));
  };

  if (alert && alert.showAlert) {
    setTimeout(() => {
      dispatch(setShowAlert(false));
    }, 2500);
    return (
      <Alert variant="success" dismissible transition onClose={handleClose}>
        {text}
      </Alert>
    );
  } else {
    return null;
  }
}

export default AlertItem;
