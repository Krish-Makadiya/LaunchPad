import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export const PitchDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pitch, setPitch] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPitch = async () => {
            try {
                const token = localStorage.getItem("token");

                // Debug logs
                console.log("Pitch ID:", id);
                console.log("Token:", token);

                const response = await axios.get(
                    `http://localhost:5000/startup/pitch/${id}`, // Updated endpoint
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                // Debug log
                console.log("API Response:", response.data);

                // Make sure we're setting the pitch data correctly
                if (response.data.success) {
                    setPitch(response.data.pitch);
                } else {
                    throw new Error(
                        response.data.message || "Failed to fetch pitch details"
                    );
                }
            } catch (err) {
                console.error("Error details:", err);
                setError(
                    err.response?.data?.message ||
                        err.message ||
                        "Failed to fetch pitch details"
                );
            } finally {
                setLoading(false);
            }
        };

        fetchPitch();
    }, [id]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFD60A]"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-5xl mx-auto px-4">
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 flex items-center text-gray-600 hover:text-gray-900">
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back
                </button>

                {/* Main Content */}
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                    <div className="p-8">
                        {/* Header Section */}
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {pitch.startupName}
                                </h1>
                                <p className="text-lg text-gray-600">
                                    {pitch.tagline}
                                </p>
                            </div>
                            <span
                                className={`px-4 py-2 rounded-full text-sm ${
                                    pitch.stage === "Idea"
                                        ? "bg-blue-100 text-blue-800"
                                        : pitch.stage === "Prototype"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : pitch.stage === "Early Revenue"
                                        ? "bg-green-100 text-green-800"
                                        : "bg-purple-100 text-purple-800"
                                }`}>
                                {pitch.stage}
                            </span>
                        </div>

                        {/* Key Metrics */}
                        <div className="grid grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">
                                    Ask Amount
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ₹{pitch.askAmount.toLocaleString()}
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">
                                    Equity
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    {pitch.askEquity}%
                                </p>
                            </div>
                            <div className="bg-gray-50 p-6 rounded-xl">
                                <p className="text-sm text-gray-600 mb-1">
                                    Valuation
                                </p>
                                <p className="text-2xl font-bold text-gray-900">
                                    ₹{pitch.companyValuation.toLocaleString()}
                                </p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Description
                            </h2>
                            <p className="text-gray-600 whitespace-pre-wrap">
                                {pitch.description}
                            </p>
                        </div>

                        {/* Business & Financial Details */}
                        <div className="grid grid-cols-2 gap-8 mb-8">
                            <div>
                                <h2 className="text-xl font-semibold mb-4">
                                    Business Details
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Sector
                                        </p>
                                        <p className="text-gray-900 font-medium">
                                            {pitch.sector}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Location
                                        </p>
                                        <p className="text-gray-900 font-medium">
                                            {pitch.location}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Team Size
                                        </p>
                                        <p className="text-gray-900 font-medium">
                                            {pitch.teamSize} members
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold mb-4">
                                    Financial Details
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Revenue
                                        </p>
                                        <p className="text-gray-900 font-medium">
                                            ₹{pitch.revenue.toLocaleString()}
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-600">
                                            Profit Margin
                                        </p>
                                        <p className="text-gray-900 font-medium">
                                            {pitch.profitMargin}%
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Founder Information */}
                        <div className="border-t pt-8">
                            <h2 className="text-xl font-semibold mb-4">
                                Founder Information
                            </h2>
                            <div className="flex items-center space-x-4">
                                <div className="w-16 h-16 bg-[#FFD60A] rounded-full flex items-center justify-center">
                                    <span className="text-2xl font-bold text-gray-900">
                                        {pitch.founderName.charAt(0)}
                                    </span>
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">
                                        {pitch.founderName}
                                    </p>
                                    <p className="text-gray-600">
                                        {pitch.founderEmail}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="border-t mt-8 pt-8 flex justify-end space-x-4">
                            <button
                                onClick={() =>
                                    navigate(`/pitch/edit/${pitch._id}`)
                                }
                                className="px-6 py-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFD60A]/90">
                                Edit Pitch
                            </button>
                            <button
                                onClick={async () => {
                                    if (
                                        window.confirm(
                                            "Are you sure you want to delete this pitch?"
                                        )
                                    ) {
                                        try {
                                            const token =
                                                localStorage.getItem("token");
                                            await axios.delete(
                                                `http://localhost:5000/api/pitches/${pitch._id}`,
                                                {
                                                    headers: {
                                                        Authorization: `Bearer ${token}`,
                                                    },
                                                }
                                            );
                                            navigate("/startup/dashboard");
                                        } catch (err) {
                                            alert("Failed to delete pitch");
                                        }
                                    }
                                }}
                                className="px-6 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100">
                                Delete Pitch
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
