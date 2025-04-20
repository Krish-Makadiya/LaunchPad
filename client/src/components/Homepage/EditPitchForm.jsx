import axios from "axios";
import { useState } from "react";

export const EditPitchForm = ({ pitch, onClose, onUpdate }) => {
    const [formData, setFormData] = useState({
        founderName: pitch.founderName,
        startupName: pitch.startupName,
        tagline: pitch.tagline,
        description: pitch.description,
        sector: pitch.sector,
        stage: pitch.stage,
        location: pitch.location || "India",
        askAmount: pitch.askAmount,
        askEquity: pitch.askEquity,
        companyValuation: pitch.companyValuation,
        revenue: pitch.revenue || 0,
        profitMargin: pitch.profitMargin || 0,
        pitchVideoUrl: pitch.pitchVideoUrl || "",
        website: pitch.website || "",
        socialLinks: pitch.socialLinks || ["", "", ""],
        founderEmail: pitch.founderEmail,
        teamSize: pitch.teamSize || 1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const token = localStorage.getItem("token");

            // Debug log - check if token exists
            console.log("Token:", token);
            console.log("Form Data being sent:", formData);

            const response = await axios.put(
                // Add /api prefix to match backend route
                `https://launch-pad-npps.vercel.app/startup/edit-pitch/${pitch._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );

            // Debug logs
            console.log("API Response:", response);
            console.log("Response Status:", response.status);
            console.log("Response Data:", response.data);

            if (response.data.success) {
                // Combine existing pitch data with updated data
                const updatedPitch = {
                    ...pitch, // Keep existing pitch data
                    ...response.data.pitch, // Override with new data
                };
                onUpdate(updatedPitch); // Pass the complete updated pitch
                onClose();
            } else {
                throw new Error(response.data.message || "Update failed");
            }
        } catch (err) {
            // Detailed error logging
            console.error("Error details:", {
                message: err.message,
                response: err.response?.data,
                status: err.response?.status,
                statusText: err.response?.statusText,
            });

            setError(
                err.response?.data?.message ||
                    err.message ||
                    "Failed to update pitch"
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
            <div className="bg-white rounded-xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Edit Pitch</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700">
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Basic Information */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Founder Name*
                                </label>
                                <input
                                    type="text"
                                    name="founderName"
                                    value={formData.founderName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Startup Name*
                                </label>
                                <input
                                    type="text"
                                    name="startupName"
                                    value={formData.startupName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pitch Details */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">
                            Pitch Details
                        </h3>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Tagline*
                                </label>
                                <input
                                    type="text"
                                    name="tagline"
                                    value={formData.tagline}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Description*
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Business Details */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">
                            Business Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Sector*
                                </label>
                                <input
                                    type="text"
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Stage*
                                </label>
                                <select
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]">
                                    <option value="Idea">Idea</option>
                                    <option value="Prototype">Prototype</option>
                                    <option value="Early Revenue">
                                        Early Revenue
                                    </option>
                                    <option value="Scaling">Scaling</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Financial Details */}
                    <div className="bg-gray-50 p-6 rounded-xl">
                        <h3 className="text-lg font-semibold mb-4">
                            Financial Details
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ask Amount (₹)*
                                </label>
                                <input
                                    type="number"
                                    name="askAmount"
                                    value={formData.askAmount}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Ask Equity (%)*
                                </label>
                                <input
                                    type="number"
                                    name="askEquity"
                                    value={formData.askEquity}
                                    onChange={handleChange}
                                    required
                                    min="0"
                                    max="100"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Revenue (₹)
                                </label>
                                <input
                                    type="number"
                                    name="revenue"
                                    value={formData.revenue}
                                    onChange={handleChange}
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Profit Margin (%)
                                </label>
                                <input
                                    type="number"
                                    name="profitMargin"
                                    value={formData.profitMargin}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A]"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex justify-end space-x-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-4 py-2 bg-[#FFD60A] rounded-lg hover:bg-[#FFD60A]/90 disabled:opacity-50">
                            Update Pitch
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
