import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { PrefacePage } from "./PrefacePage.jsx";
import "./styles.css";
import "./preface.css";

createRoot(document.getElementById("root")).render(<StrictMode><PrefacePage /></StrictMode>);
