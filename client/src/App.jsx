import React from "react";
import Navbar from "./components/Homepage/Navbar";
import { useAuth } from "./context/authContext";
import Footer from "./components/Homepage/Footer";
import Homepage from "./pages/Homepage";
import StartupPage from "./pages/StartupPage"
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { PitchDetails } from "./components/Homepage/PitchDetails";
import { EditPitchForm } from "./components/Homepage/EditPitchForm";
import InvestorPage from "./pages/InvestorPage";

const App = () => {
    return (
        <div className="">
            
            {/* <Homepage/> */}

            <BrowserRouter>
            <Routes>
                {/* Other routes */}
                <Route path="/" element={<Homepage />} />
                <Route path="/pitch/s/:id" element={<PitchDetails />} />
                <Route path="/pitch/i/:id" element={<PitchDetails />} />
                <Route path="/pitch/edit/:id" element={<EditPitchForm />} />
                <Route path="/startup" element={<StartupPage />} />
                <Route path="/investor" element={<InvestorPage/>} />
            </Routes>
        </BrowserRouter>
        </div>
    );
};

export default App;
