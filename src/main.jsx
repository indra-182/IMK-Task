import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { StateProvider } from "./providers/index.jsx";

createRoot(document.getElementById("root")).render(
  <StateProvider>
    <App />
  </StateProvider>
);
