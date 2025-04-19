import React from "react";
import Navbar from "./components/Homepage/Navbar";
import { useAuth } from "./context/authContext";
import Footer from "./components/Homepage/Footer";
import Homepage from "./pages/Homepage";
import StartupPage from "./pages/StartupPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PitchDetails } from "./components/Homepage/PitchDetails";
import { EditPitchForm } from "./components/Homepage/EditPitchForm";

const App = () => {
    return (
        <div className="">
            
            {/* <Homepage/> */}

            <BrowserRouter>
            <Routes>
                {/* Other routes */}
                <Route path="/" element={<Homepage />} />
                <Route path="/pitch/:id" element={<PitchDetails />} />
                <Route path="/pitch/edit/:id" element={<EditPitchForm />} />
                <Route path="/dashboard" element={<StartupPage />} />
            </Routes>
        </BrowserRouter>
        </div>
    );
};

export default App;
