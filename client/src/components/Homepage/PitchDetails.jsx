import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
    FaLinkedin,
    FaTwitter,
    FaGithub,
    FaGlobe,
    FaInstagram,
} from "react-icons/fa";

const FeedbackSection = ({ pitch }) => {
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem("token");
            const res = await axios.post(
                `http://localhost:5000/feedback/create-feedback/${pitch._id}`,
                {
                    content: feedback,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res);
            setFeedback("");
        } catch (error) {
            console.log(error);
        }
    };

    const generateWithAI = async () => {
        try {
            const prompt = `

You are a professional startup analyst. Review the following pitch and give a brief, formal analysis highlighting its potential and whether it is worth investor interest.

- **Startup**: ${pitch.startupName}
- **Tagline**: ${pitch.tagline}
- **Sector & Stage**: ${pitch.sector} | ${pitch.stage}
- **Ask**: ₹${pitch.askAmount} for ${pitch.askEquity}% equity (Valuation: ₹${pitch.companyValuation})
- **Current Revenue**: ₹${pitch.revenue}

Keep your response concise and formal. End with a verdict: "Promising", "Needs Work", or "Not Ready".
`;

            const token = localStorage.getItem("token");
            const res = await axios.get(
                "http://localhost:5000/ai/generate-feedback",
                {
                    params: { prompt },
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const plainText = res.data
                .replace(/#{1,6}\s/g, "") // Remove headers
                .replace(/\*\*/g, "") // Remove bold markers
                .replace(/\*/g, "") // Remove italic markers
                .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Replace links with text
                .replace(/\n\n/g, "\n") // Replace double line breaks
                .replace(/^\s*[-*+]\s/gm, "") // Remove list markers
                .trim();

            setFeedback(plainText);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-white rounded-lg p-6 mt-3 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Give Feedback
            </h3>
            <form onSubmit={handleSubmit}>
                <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Share your thoughts about this pitch..."
                    className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent outline-none resize-none"
                />
                <div className="mt-4 flex justify-end gap-5">
                    <button
                        type="submit"
                        disabled={loading || !feedback.trim()}
                        className={`px-6 py-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFD60A]/90 transition-colors ${
                            loading || !feedback.trim()
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                        }`}>
                        {loading ? "Submitting..." : "Submit Feedback"}
                    </button>
                    <button
                        onClick={generateWithAI}
                        className={`px-6 py-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFD60A]/90 transition-colors`}>
                        AI
                    </button>
                </div>
            </form>
        </div>
    );
};

export const PitchDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [pitch, setPitch] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [role, setRole] = useState(localStorage.getItem("userRole"));

    const SocialLinks = ({ socialLinks }) => {
        if (!socialLinks) return null;

        const getPlatformIcon = (url) => {
            if (url.includes("linkedin"))
                return (
                    <FaLinkedin className="w-10 h-10 text-gray-500 hover:text-[#0077B5]" />
                );
            if (url.includes("instagram"))
                return (
                    <FaInstagram className="w-10 h-10 text-gray-500 hover:text-[#E4405F]" />
                );
            if (url.includes("twitter"))
                return (
                    <FaTwitter className="w-10 h-10 text-gray-500 hover:text-[#1DA1F2]" />
                );
            if (url.includes("github"))
                return (
                    <FaGithub className="w-10 h-10 text-gray-500 hover:text-[#333]" />
                );
            return (
                <FaGlobe className="w-10 h-10 text-gray-500 hover:text-[#FFD60A]" />
            );
        };

        return (
            <div className="flex items-center space-x-4 mt-2">
                {socialLinks.map((url, index) => (
                    <a
                        key={index}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="transition-colors duration-200">
                        {getPlatformIcon(url)}
                    </a>
                ))}
            </div>
        );
    };

    useEffect(() => {
        const fetchPitch = async () => {
            try {
                const token = localStorage.getItem("token");

                const response = await axios.get(
                    `http://localhost:5000/startup/pitch/${id}`, // Updated endpoint
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

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

    console.log(pitch);

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

                        <div className="flex items-center justify-between space-x-4 border-t pt-8">
                            <div className="flex items-center gap-3">
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
                            <SocialLinks socialLinks={pitch.socialLinks} />
                        </div>
                    </div>
                </div>

                {
                    role === "investor" && (

                            <FeedbackSection pitch={pitch} />
                    )
                }
            </div>
        </div>
    );
};
