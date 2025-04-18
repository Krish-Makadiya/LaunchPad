import React from "react";
import Navbar from "./components/Homepage/Navbar";
import { useAuth } from "./context/authContext";
import Footer from "./components/Homepage/Footer";
import Homepage from "./pages/Homepage";
import StartupPage from "./pages/StartupPage"

const App = () => {
    return (
        <div className="">
            <StartupPage />
            {/* <Homepage/> */}
        </div>
    );
};

export default App;
