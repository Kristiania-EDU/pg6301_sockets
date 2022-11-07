import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

const element = document.getElementById("app");
const root = createRoot(element);

root.render(<h1>Hello</h1>);
