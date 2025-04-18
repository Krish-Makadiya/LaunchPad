// components/PitchList.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import { EditPitchForm } from "./EditPitchForm";

const PitchCard = ({ pitch }) => {
    const [showEditForm, setShowEditForm] = useState(false);
    const [updatedPitch, setUpdatedPitch] = useState(pitch);

    const handleEdit = () => {
        setShowEditForm(true);
    };

    const handleUpdate = (newPitch) => {
        setUpdatedPitch(newPitch);
        setShowEditForm(false);
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-xl text-gray-900">
                                {updatedPitch.startupName}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {updatedPitch.tagline}
                            </p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${
                                updatedPitch.stage === "Idea"
                                    ? "bg-blue-100 text-blue-800"
                                    : updatedPitch.stage === "Prototype"
                                    ? "bg-yellow-100 text-yellow-800"
                                    : updatedPitch.stage === "Early Revenue"
                                    ? "bg-green-100 text-green-800"
                                    : "bg-purple-100 text-purple-800"
                            }`}>
                            {updatedPitch.stage}
                        </span>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Ask Amount</p>
                            <p className="font-semibold text-gray-900">
                                ₹{updatedPitch.askAmount.toLocaleString()}
                            </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Equity</p>
                            <p className="font-semibold text-gray-900">
                                {updatedPitch.askEquity}%
                            </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Valuation</p>
                            <p className="font-semibold text-gray-900">
                                ₹
                                {updatedPitch.companyValuation.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-[#FFD60A] rounded-full flex items-center justify-center">
                                <span className="font-semibold text-gray-900">
                                    {updatedPitch.founderName.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {updatedPitch.founderName}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {updatedPitch.sector}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() =>
                                    (window.location.href = `/pitch/${updatedPitch._id}`)
                                }
                                className="px-4 py-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFD60A]/90 transition-colors duration-300">
                                View Details
                            </button>
                            <button
                                onClick={handleEdit}
                                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors duration-300">
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {showEditForm && (
                <EditPitchForm
                    pitch={updatedPitch}
                    onClose={() => setShowEditForm(false)}
                    onUpdate={handleUpdate}
                />
            )}
        </>
    );
};

const PitchList = () => {
    const [pitches, setPitches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPitches = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                // Add console.log to debug token
                console.log("Token:", token);

                const response = await axios.get(
                    "http://localhost:5000/startup/get-user-pitches",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                console.log("API Response:", response.data);

                setPitches(response.data.pitches);
                setError(null);
            } catch (err) {
                console.error("Error details:", err.response || err);
                setError(
                    err.response?.data?.message || "Failed to fetch pitches"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPitches();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-white rounded-xl p-6 space-y-4">
                            <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    // Add error state UI
    if (error) {
        return (
            <div className="bg-red-50 p-4 rounded-lg">
                <p className="text-red-500">{error}</p>
                <p className="text-sm text-red-400 mt-2">
                    Please try again later
                </p>
            </div>
        );
    }

    // Add empty state UI
    if (pitches.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500">
                    No pitches found. Create your first pitch!
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pitches.map((pitch) => (
                <PitchCard key={pitch._id} pitch={pitch} />
            ))}
        </div>
    );
};

export default PitchList;
