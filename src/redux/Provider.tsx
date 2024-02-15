"use client";

import { Provider } from "react-redux";
import store from "./store";
import React from "react";

interface IReduxProps {
  children: React.ReactNode;
}

export default function ReduxProvider({ children }: IReduxProps) {
  return <Provider store={store}>{children}</Provider>;
}
