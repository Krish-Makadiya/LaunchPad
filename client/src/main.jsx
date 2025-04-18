import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import Navbar from "./components/Homepage/Navbar.jsx";

createRoot(document.getElementById("root")).render(
    <AuthProvider>
        <div className="min-h-screen font-[poppins] w-[100vw] bg-[#f8f8f8] text-[#292927]">
            <Navbar />
            <App />
        </div>
    </AuthProvider>
);
