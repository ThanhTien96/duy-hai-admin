import React, { useEffect } from "react";
import { useAppSelector } from "store";
import { App, message as _message } from "antd";

export interface IMessageProviderProps {
  children: React.ReactNode;
}

const MessageProvider = (props: IMessageProviderProps) => {
  const { message, status, logs } = useAppSelector((state) => state.app.alert);

  const messageOptions = {
    error: _message.error,
    warning: _message.warning,
    info: _message.info,
    success: _message.success,
  };

  useEffect(() => {
    if (message !== "N/A") {
      messageOptions[status](message, 0.9);
    }
  }, [logs]);

  return (
    <App>
      {props.children}
    </App>
  );
};

export default MessageProvider;
