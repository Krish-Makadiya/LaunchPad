// components/CreatePitchForm.jsx
import { useState } from "react";
import axios from "axios";

const CreatePitchForm = ({ onClose, isOpen }) => {
    const [formData, setFormData] = useState({
        founderName: "",
        startupName: "",
        tagline: "",
        description: "",
        sector: "",
        stage: "Idea",
        location: "India",
        askAmount: "",
        askEquity: "",
        companyValuation: "",
        revenue: 0,
        profitMargin: 0,
        pitchVideoUrl: "",
        website: "",
        socialLinks: [""],
        founderEmail: "",
        founderProfileImage: "",
        teamSize: 1,
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
        setError("");

        try {
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/startup/create-pitch",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            onClose();
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create pitch");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                        Create New Pitch
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 text-2xl">
                        ✕
                    </button>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Basic Information Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">
                            Basic Information
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Founder Name*
                                </label>
                                <input
                                    type="text"
                                    name="founderName"
                                    value={formData.founderName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter founder name"
                                />
                            </div>
                            <div className="col-span-2 md:col-span-1">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Startup Name*
                                </label>
                                <input
                                    type="text"
                                    name="startupName"
                                    value={formData.startupName}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter startup name"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pitch Details Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">
                            Pitch Details
                        </h3>
                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Tagline*
                                </label>
                                <input
                                    type="text"
                                    name="tagline"
                                    value={formData.tagline}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter a catchy tagline"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Description*
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                    rows="4"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Describe your startup"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Business Details Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">
                            Business Details
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Sector*
                                </label>
                                <input
                                    type="text"
                                    name="sector"
                                    value={formData.sector}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="e.g., Technology, Healthcare"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Stage*
                                </label>
                                <select
                                    name="stage"
                                    value={formData.stage}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent">
                                    <option value="Idea">Idea</option>
                                    <option value="Prototype">Prototype</option>
                                    <option value="Early Revenue">
                                        Early Revenue
                                    </option>
                                    <option value="Scaling">Scaling</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Team Size
                                </label>
                                <input
                                    type="number"
                                    name="teamSize"
                                    value={formData.teamSize}
                                    onChange={handleChange}
                                    min="1"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Location
                                </label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter location"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Financial Details Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">
                            Financial Details
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ask Amount (₹)*
                                </label>
                                <input
                                    type="number"
                                    name="askAmount"
                                    value={formData.askAmount}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter amount in ₹"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
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
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter equity percentage"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Company Valuation (₹)*
                                </label>
                                <input
                                    type="number"
                                    name="companyValuation"
                                    value={formData.companyValuation}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter valuation in ₹"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Current Revenue (₹)
                                </label>
                                <input
                                    type="number"
                                    name="revenue"
                                    value={formData.revenue}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter current revenue"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Profit Margin (%)
                                </label>
                                <input
                                    type="number"
                                    name="profitMargin"
                                    value={formData.profitMargin}
                                    onChange={handleChange}
                                    min="0"
                                    max="100"
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter profit margin percentage"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Contact & Links Section */}
                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">
                            Contact & Links
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Founder Email*
                                </label>
                                <input
                                    type="email"
                                    name="founderEmail"
                                    value={formData.founderEmail}
                                    onChange={handleChange}
                                    required
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter email address"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Website
                                </label>
                                <input
                                    type="url"
                                    name="website"
                                    value={formData.website}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter website URL"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pitch Video URL
                                </label>
                                <input
                                    type="url"
                                    name="pitchVideoUrl"
                                    value={formData.pitchVideoUrl}
                                    onChange={handleChange}
                                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                    placeholder="Enter video URL"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-sm">
                        <h3 className="text-xl font-semibold mb-6 text-gray-900">
                            Social Links
                        </h3>
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    LinkedIn
                                </label>
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-6 h-6 text-blue-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                    </svg>
                                    <input
                                        type="url"
                                        name="linkedinUrl"
                                        value={formData.socialLinks[0] || ""}
                                        onChange={(e) => {
                                            const newSocialLinks = [
                                                ...formData.socialLinks,
                                            ];
                                            newSocialLinks[0] = e.target.value;
                                            setFormData((prev) => ({
                                                ...prev,
                                                socialLinks: newSocialLinks,
                                            }));
                                        }}
                                        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                        placeholder="LinkedIn profile URL"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Twitter
                                </label>
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-6 h-6 text-blue-400"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                    </svg>
                                    <input
                                        type="url"
                                        name="twitterUrl"
                                        value={formData.socialLinks[1] || ""}
                                        onChange={(e) => {
                                            const newSocialLinks = [
                                                ...formData.socialLinks,
                                            ];
                                            newSocialLinks[1] = e.target.value;
                                            setFormData((prev) => ({
                                                ...prev,
                                                socialLinks: newSocialLinks,
                                            }));
                                        }}
                                        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                        placeholder="Twitter profile URL"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Instagram
                                </label>
                                <div className="flex items-center space-x-2">
                                    <svg
                                        className="w-6 h-6 text-pink-600"
                                        fill="currentColor"
                                        viewBox="0 0 24 24">
                                        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                                    </svg>
                                    <input
                                        type="url"
                                        name="instagramUrl"
                                        value={formData.socialLinks[2] || ""}
                                        onChange={(e) => {
                                            const newSocialLinks = [
                                                ...formData.socialLinks,
                                            ];
                                            newSocialLinks[2] = e.target.value;
                                            setFormData((prev) => ({
                                                ...prev,
                                                socialLinks: newSocialLinks,
                                            }));
                                        }}
                                        className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                                        placeholder="Instagram profile URL"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-3 bg-[#FFD60A] rounded-lg hover:bg-[#FFD60A]/90 disabled:opacity-50">
                            {loading ? "Creating..." : "Create Pitch"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreatePitchForm;
