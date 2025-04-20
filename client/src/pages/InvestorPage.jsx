import { useEffect, useState } from "react";
import axios from "axios";
import CreatePitchForm from "../components/Homepage/CreatePitchForm";
import PitchList from "../components/Homepage/Pitchlist";
import { toast } from "react-hot-toast";

const navItems = [
    {
        name: "Dashboard",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
        name: "Explore",
        icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0015.5 3H14m5 16v-2a2 2 0 00-2-2h-3",
    },
    {
        name: "MyFeedbacks",
        icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    },
    {
        name: "Bookmarks",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
        name: "My Profile",
        icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
];

const Dashboard = ({ loading, totalPitches, error }) => {
    const [pitches, setPitches] = useState([]);

    const fetchPitches = async () => {
        try {
            const token = localStorage.getItem("token");
            const result = await axios.get(
                `https://launch-pad-npps.vercel.app//startup/pitches`,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            console.log(result.data.pitches);
            setPitches(result.data.pitches.slice(0, 4));
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchPitches();
    }, []);

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>
            <div className="grid grid-cols-3 gap-6 mb-8">
                {/* Total Pitches Card */}
                <div className="rounded-[8px] px-5 py-4 hover:bg-[#292927] hover:text-[#fff] hover:scale-105 duration-200 shadow-[1px_2px_50px_0px_rgba(0,_0,_0,_0.1)] group">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 bg-black text-white rounded-full p-2 group-hover:bg-[#ffd60a] group-hover:text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0015.5 3H14m5 16v-2a2 2 0 00-2-2h-3"
                        />
                    </svg>
                    <div className="mt-10">
                        {/* TODO: to update the routes */}
                        <p>Total Pitches</p>
                        {loading ? (
                            <div className="animate-pulse">
                                <div className="h-12 bg-gray-200 rounded w-24 my-2"></div>
                            </div>
                        ) : error ? (
                            <p className="text-red-500 text-sm">
                                Error loading data
                            </p>
                        ) : (
                            <h3 className="text-5xl font-bold text-[#292927] mb-2 group-hover:text-[#fff] transition-colors duration-300">
                                {totalPitches}
                                <span className="text-[#ffd60a]">+</span>
                            </h3>
                        )}
                    </div>
                </div>

                {/* Investor Views Card */}
                <div className="rounded-[8px] px-5 py-4 hover:bg-[#292927] hover:text-[#fff] hover:scale-105 duration-200 shadow-[1px_2px_50px_0px_rgba(0,_0,_0,_0.1)] group">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 bg-black text-white rounded-full p-2 group-hover:bg-[#ffd60a] group-hover:text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                    </svg>
                    <div className="mt-10">
                        <p>Pitches Intrested</p>
                        {loading ? (
                            <div className="animate-pulse">
                                <div className="h-12 bg-gray-200 rounded w-24 my-2">
                                    100
                                </div>
                            </div>
                        ) : error ? (
                            <p className="text-red-500 text-sm">
                                Error loading data
                            </p>
                        ) : (
                            <h3 className="text-5xl font-bold text-[#292927] mb-2 group-hover:text-[#fff] transition-colors duration-300">
                                0<span className="text-[#ffd60a]">+</span>
                            </h3>
                        )}
                    </div>
                </div>

                {/* Success Rate Card */}
                <div className="rounded-[8px] px-5 py-4 hover:bg-[#292927] hover:text-[#fff] hover:scale-105 duration-200 shadow-[1px_2px_50px_0px_rgba(0,_0,_0,_0.1)] group">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 bg-black text-white rounded-full p-2 group-hover:bg-[#ffd60a] group-hover:text-black"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                        />
                    </svg>
                    <div className="mt-10">
                        <p>Success Rate</p>
                        {loading ? (
                            <div className="animate-pulse">
                                <div className="h-12 bg-gray-200 rounded w-24 my-2">
                                    11
                                </div>
                            </div>
                        ) : error ? (
                            <p className="text-red-500 text-sm">
                                Error loading data
                            </p>
                        ) : (
                            <h3 className="text-5xl font-bold text-[#292927] mb-2 group-hover:text-[#fff] transition-colors duration-300">
                                0<span className="text-[#ffd60a]">%</span>
                            </h3>
                        )}
                    </div>
                </div>
            </div>

            <hr className="text-[#ffd60a]" />

            <h1 className="text-3xl py-3 pt-5">Recent Pitches</h1>

            {pitches.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">
                        No pitches found. Create your first pitch!
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {pitches.map((pitch) => (
                    <PitchCard key={pitch._id} pitch={pitch} />
                ))}
            </div>
        </div>
    );
};

const PitchCard = ({ pitch }) => {
    const pitchValuation = (pitch?.askAmount * 100) / pitch?.askEquity;
    return (
        <>
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <div className="p-6">
                    <div className="flex justify-between items-start">
                        <div className="space-y-2">
                            <h3 className="font-semibold text-xl text-gray-900">
                                {pitch?.startupName ?? "Untitled"}
                            </h3>
                            <p className="text-gray-500 text-sm">
                                {pitch?.tagline ?? "No tagline"}
                            </p>
                        </div>
                        <span
                            className={`px-3 py-1 rounded-full text-sm ${
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

                    <div className="mt-4 grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Ask Amount</p>
                            <p className="font-semibold text-gray-900">
                                ₹{pitch?.askAmount?.toLocaleString()}
                            </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Equity</p>
                            <p className="font-semibold text-gray-900">
                                {pitch.askEquity}%
                            </p>
                        </div>
                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-600">Valuation</p>
                            <p className="font-semibold text-gray-900">
                                ₹{pitchValuation.toLocaleString()}
                            </p>
                        </div>
                    </div>

                    <div className="mt-6 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-10 h-10 bg-[#FFD60A] rounded-full flex items-center justify-center">
                                <span className="font-semibold text-gray-900">
                                    {pitch?.founderName?.charAt(0)}
                                </span>
                            </div>
                            <div>
                                <p className="text-sm font-medium text-gray-900">
                                    {pitch.founderName}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {pitch.sector}
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button
                                onClick={() =>
                                    (window.location.href = `/pitch/${pitch._id}`)
                                }
                                className="px-4 py-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFD60A]/90 transition-colors duration-300">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const Explore = () => {
    const [pitches, setPitches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch pitches with bookmark status
    const fetchPitches = async () => {
        try {
            const token = localStorage.getItem("token");

            // Fetch pitches and bookmarks in parallel
            const [pitchResponse, bookmarkResponse] = await Promise.all([
                axios.get("https://launch-pad-npps.vercel.app//startup/pitches", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
                axios.get("https://launch-pad-npps.vercel.app//bookmark/get-user-bookmarks", {
                    headers: { Authorization: `Bearer ${token}` },
                }),
            ]);

            // Create a Set of bookmarked pitch IDs for easy lookup
            const bookmarkedPitchIds = new Set(
                bookmarkResponse.data.data.bookmarks.map(
                    (bookmark) => bookmark.pitch
                )
            );

            // Combine pitch data with bookmark status
            const pitchesWithBookmarks = pitchResponse.data.pitches.map(
                (pitch) => ({
                    ...pitch,
                    isBookmarked: bookmarkedPitchIds.has(pitch._id),
                })
            );

            setPitches(pitchesWithBookmarks);
            setLoading(false);
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPitches();
    }, []);

    const handleBookmarkToggle = async (pitchId, isBookmarked) => {
        try {
            const token = localStorage.getItem("token");

            if (isBookmarked) {
                // Remove bookmark
                await axios.delete(
                    `https://launch-pad-npps.vercel.app//bookmark/remove-bookmark/${pitchId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                // Add bookmark
                await axios.post(
                    `https://launch-pad-npps.vercel.app//bookmark/create-bookmark/${pitchId}`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }

            // Update local state
            setPitches((prevPitches) =>
                prevPitches.map((pitch) =>
                    pitch._id === pitchId
                        ? { ...pitch, isBookmarked: !isBookmarked }
                        : pitch
                )
            );
        } catch (error) {
            console.error("Error toggling bookmark:", error);
            // Optionally refresh pitches to ensure sync with server
            fetchPitches();
        }
    };

    // Loading state with skeleton
    if (loading) {
        return (
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-white rounded-xl p-6 shadow-sm">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                            <div className="h-20 bg-gray-200 rounded mb-4"></div>
                            <div className="flex space-x-2 mb-4">
                                <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                                <div className="h-8 w-20 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold mb-2">Explore Startups</h2>
                <p className="text-gray-600">
                    Discover promising startups seeking investment
                </p>
            </div>

            {/* Pitches List */}
            <div className="space-y-4">
                {pitches.map((pitch) => (
                    <div
                        key={pitch._id}
                        className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                        <div className="p-6">
                            <div className="flex flex-wrap md:flex-nowrap gap-6">
                                {/* Left Section: Basic Info */}
                                <div className="w-full md:w-1/3">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900 mb-1">
                                                {pitch.startupName}
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-2">
                                                {pitch.tagline}
                                            </p>
                                        </div>
                                        <span
                                            className={`px-4 py-1 h-fit rounded-full text-sm whitespace-nowrap ${
                                                pitch.stage === "Idea"
                                                    ? "bg-blue-100 text-blue-800"
                                                    : pitch.stage ===
                                                      "Prototype"
                                                    ? "bg-yellow-100 text-yellow-800"
                                                    : pitch.stage ===
                                                      "Early Revenue"
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-purple-100 text-purple-800"
                                            }`}>
                                            {pitch.stage}
                                        </span>
                                    </div>
                                    <p className="text-gray-600 line-clamp-2 text-sm">
                                        {pitch.description}
                                    </p>
                                </div>

                                {/* Middle Section: Metrics */}
                                <div className="w-full md:w-1/3 flex items-center">
                                    <div className="grid grid-cols-3 gap-4 w-full">
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-600">
                                                Ask Amount
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                ₹
                                                {pitch.askAmount?.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-600">
                                                Equity
                                            </p>
                                            <p className="font-semibold text-gray-900">
                                                {pitch.askEquity}%
                                            </p>
                                        </div>
                                        <div className="text-center p-3 bg-gray-50 rounded-lg">
                                            <p className="text-xs text-gray-600">
                                                Sector
                                            </p>
                                            <p className="font-semibold text-gray-900 truncate">
                                                {pitch.sector}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Section: Founder & Actions */}
                                <div className="w-full md:w-1/3 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-[#FFD60A] rounded-full flex items-center justify-center">
                                            <span className="font-semibold text-gray-900">
                                                {pitch.createdBy?.name?.charAt(
                                                    0
                                                )}
                                            </span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {pitch.createdBy?.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                Founder
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() =>
                                                (window.location.href = `/pitch/i/${pitch._id}`)
                                            }
                                            className="px-4 py-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFD60A]/90 transition-colors">
                                            View Details
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                handleBookmarkToggle(
                                                    pitch._id,
                                                    pitch.isBookmarked
                                                );
                                            }}
                                            className={`p-2 rounded-lg transition-colors ${
                                                pitch.isBookmarked
                                                    ? "text-[#FFD60A] hover:text-[#FFD60A]/90"
                                                    : "text-gray-600 hover:text-gray-900"
                                            } hover:bg-gray-100`}
                                            title={
                                                pitch.isBookmarked
                                                    ? "Remove Bookmark"
                                                    : "Add Bookmark"
                                            }>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill={
                                                    pitch.isBookmarked
                                                        ? "currentColor"
                                                        : "none"
                                                }
                                                viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {pitches.length === 0 && !loading && !error && (
                <div className="text-center py-12">
                    <div className="text-gray-500">
                        No pitches available at the moment
                    </div>
                </div>
            )}
        </div>
    );
};

const Messages = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    const fetchFeedbacks = async () => {
        try {
            const token = localStorage.getItem("token");
            const result = await axios.get(
                "https://launch-pad-npps.vercel.app//feedback/get-user-feedback",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(result.data.data);
            setFeedbacks(result.data.data.feedback);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const deleteHandler = async (feedbackId) => {
        try {
            const token = localStorage.getItem("token");
            const result = await axios.delete(
                `https://launch-pad-npps.vercel.app//feedback/delete-feedback/${feedbackId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            
            // Update the pitches state to remove the deleted pitch
            setFeedbacks(prevPitches => prevPitches.filter(pitch => pitch._id !== feedbackId));
            
            // Show success message
            toast.success("Feebback deleted successfully");
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete pitch");
        }
    };

    return (
        <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Feedbacks</h2>
            <div className="space-y-6">
                {feedbacks.map((feedback) => (
                    <div
                        key={feedback._id}
                        className="p-4 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-start gap-4">
                            {/* Investor Info */}
                            <div className="flex-shrink-0">
                                <img
                                    src={feedback.investor.profileImage}
                                    alt={feedback.investor.name}
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            </div>

                            {/* Content Section */}
                            <div className="flex-1 min-w-0">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h4 className="text-base font-normal text-gray-900">
                                            {feedback.investor.name}
                                        </h4>
                                        <p className="text-sm text-gray-500">
                                            {feedback.investor.email}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-2.5 py-1 text-xs rounded-full ${
                                            feedback.sentiment === "positive"
                                                ? "bg-green-100 text-green-800"
                                                : feedback.sentiment ===
                                                  "negative"
                                                ? "bg-red-100 text-red-800"
                                                : "bg-gray-100 text-gray-800"
                                        }`}>
                                        {feedback.sentiment}
                                    </span>
                                </div>

                                <p className=" text-black mb-2 text-[18px] font-[600]">
                                    <span className="text-neutral-400 font-[500]">
                                        Feedback:
                                    </span>{" "}
                                    {feedback.content}
                                </p>

                                {/* Pitch Info */}
                                <div className="mb-3 p-4 bg-neutral-100 rounded-lg">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <h5 className="text-base font-normal text-gray-900 mb-1">
                                                {feedback.pitch.startupName}
                                            </h5>
                                            <p className="text-sm text-gray-600">
                                                {feedback.pitch.tagline}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <span
                                                className={`px-3 py-1 text-sm rounded-full ${
                                                    feedback.pitch.stage ===
                                                    "Idea"
                                                        ? "bg-blue-100 text-blue-800"
                                                        : feedback.pitch
                                                              .stage ===
                                                          "Prototype"
                                                        ? "bg-yellow-100 text-yellow-800"
                                                        : feedback.pitch
                                                              .stage ===
                                                          "Early Revenue"
                                                        ? "bg-green-100 text-green-800"
                                                        : "bg-purple-100 text-purple-800"
                                                }`}>
                                                {feedback.pitch.stage}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="mt-3 grid grid-cols-3 gap-3">
                                        <div className="text-center p-2 bg-white rounded-lg">
                                            <p className="text-xs text-gray-500">
                                                Ask Amount
                                            </p>
                                            <p className="text-sm font-medium text-gray-900">
                                                ₹
                                                {feedback.pitch.askAmount?.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-center p-2 bg-white rounded-lg">
                                            <p className="text-xs text-gray-500">
                                                Equity
                                            </p>
                                            <p className="text-sm font-medium text-gray-900">
                                                {feedback.pitch.askEquity}%
                                            </p>
                                        </div>
                                        <div className="text-center p-2 bg-white rounded-lg">
                                            <p className="text-xs text-gray-500">
                                                Valuation
                                            </p>
                                            <p className="text-sm font-medium text-gray-900">
                                                ₹
                                                {feedback.pitch.companyValuation?.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between text-sm">
                                        <div className="text-gray-600">
                                            {feedback.pitch.location}
                                        </div>
                                        <div className="text-gray-600">
                                            {feedback.pitch.founderName}
                                        </div>
                                    </div>
                                </div>

                                {/* Timestamp */}
                                <div className="flex justify-between">
                                    <p className="text-sm text-gray-500">
                                        {new Date(
                                            feedback.createdAt
                                        ).toLocaleDateString()}
                                    </p>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        className="h-5 w-5"
                                        onClick={() =>
                                            deleteHandler(feedback._id)
                                        }>
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                        <line x1="10" y1="11" x2="10" y2="17" />
                                        <line x1="14" y1="11" x2="14" y2="17" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const Bookmarks = () => {
    const [bookmarks, setBookmarks] = useState([]);

    useEffect(() => {
        const fetchBookmarks = async () => {
            try {
                const token = localStorage.getItem("token");
                const result = await axios.get(
                    "https://launch-pad-npps.vercel.app//bookmark/get-user-bookmarks",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                setBookmarks(result.data.data.bookmarks);
            } catch (error) {
                console.log(error);
            }
        };

        // Call the async function immediately
        fetchBookmarks();
    }, []);

    const handleRemoveBookmark = async () => {
        const token = localStorage.getItem("token");
        try {
            if (isBookmarked) {
                await axios.post(
                    "https://launch-pad-npps.vercel.app//bookmark/add-bookmark",
                    { pitchId },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            } else {
                await axios.delete(
                    `https://launch-pad-npps.vercel.app//bookmark/remove-bookmark/${pitchId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="w-full p-8">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                    Your Bookmarked Pitches
                </h2>
                <p className="text-gray-600">
                    Manage your saved startup pitches
                </p>
            </div>

            {bookmarks.length === 0 ? (
                <div className="bg-white rounded-lg p-8 text-center">
                    <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                        No bookmarks
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        You haven't bookmarked any pitches yet.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {bookmarks.map(({ pitch, bookmarkedAt }) => (
                        <div
                            key={pitch?._id}
                            className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-6">
                            <div className="flex justify-between items-start">
                                <div className="flex-1">
                                    <div className="flex items-center space-x-3">
                                        <h3 className="text-xl font-semibold text-gray-900">
                                            {pitch?.startupName}
                                        </h3>
                                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                                            {pitch?.sector}
                                        </span>
                                    </div>
                                    <p className="mt-1 text-gray-600">
                                        {pitch?.tagline}
                                    </p>
                                </div>
                                <button
                                    onClick={() =>
                                        handleRemoveBookmark(pitch._id)
                                    }
                                    className="p-2 text-[#FFD60A] hover:text-[#FFD60A]/90 rounded-lg hover:bg-gray-100"
                                    title="Remove Bookmark">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                        />
                                    </svg>
                                </button>
                            </div>

                            <div className="mt-4 grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Ask Amount
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        ₹{pitch?.askAmount?.toLocaleString()}
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Equity
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {pitch?.askEquity}%
                                    </p>
                                </div>
                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <p className="text-sm text-gray-500">
                                        Stage
                                    </p>
                                    <p className="text-lg font-semibold text-gray-900">
                                        {pitch?.stage}
                                    </p>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center justify-between">
                                <div className="text-sm text-gray-500">
                                    Bookmarked on:{" "}
                                    {new Date(
                                        bookmarkedAt
                                    ).toLocaleDateString()}
                                </div>
                                <button
                                    onClick={() =>
                                        (window.location.href = `/pitch/${pitch._id}`)
                                    }
                                    className="px-4 py-2 bg-[#FFD60A] text-gray-900 rounded-lg hover:bg-[#FFD60A]/90 transition-colors">
                                    View Details
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

const MyProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(null);

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "https://launch-pad-npps.vercel.app//auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.data.success) {
                setProfile(response.data.user);
                setFormData(response.data.user); // Initialize form data with current profile
            }
        } catch (err) {
            console.error("Error fetching profile:", err);
            setError(err.response?.data?.message || "Failed to fetch profile");
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="bg-white rounded-xl shadow-sm p-6">
                    <div className="animate-pulse">
                        <div className="flex items-center space-x-4 mb-6">
                            <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                            <div className="space-y-2">
                                <div className="h-6 w-32 bg-gray-200 rounded"></div>
                                <div className="h-4 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="space-y-2">
                                    <div className="h-4 w-20 bg-gray-200 rounded"></div>
                                    <div className="h-10 bg-gray-200 rounded"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-50 text-red-500 p-4 rounded-lg">
                    {error}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">My Profile</h2>
            <div className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center space-x-4 mb-6">
                    <div className="w-20 h-20 bg-[#FFD60A] rounded-full flex items-center justify-center text-2xl font-bold">
                        {profile?.name?.charAt(0)}
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold">
                            {profile?.name}
                        </h3>
                        <p className="text-gray-500">
                            {profile?.role === "startup"
                                ? "Startup Founder"
                                : "Investor"}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Basic Information */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email
                            </label>
                            <input
                                type="email"
                                className="mt-1 w-full p-2 border rounded-lg bg-gray-50"
                                value={profile?.email}
                                readOnly
                            />
                        </div>
                    </div>

                    {/* Additional Information */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Location
                            </label>
                            <input
                                type="text"
                                className="mt-1 w-full p-2 border rounded-lg bg-gray-50"
                                value={"India"}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Ideas = () => {
    const [ideas, setIdeas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedIdea, setSelectedIdea] = useState(null);

    // Fetch ideas on component mount
    useEffect(() => {
        fetchIdeas();
    }, []);

    const fetchIdeas = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await axios.get(
                "https://launch-pad-npps.vercel.app//ideas/all",
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            setIdeas(response.data.ideas);
        } catch (err) {
            setError(err.response?.data?.message || "Failed to fetch ideas");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (ideaId) => {
        if (window.confirm("Are you sure you want to delete this idea?")) {
            try {
                const token = localStorage.getItem("token");
                await axios.delete(`https://launch-pad-npps.vercel.app//ideas/${ideaId}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                // Refresh ideas list
                fetchIdeas();
            } catch (err) {
                alert(err.response?.data?.message || "Failed to delete idea");
            }
        }
    };

    if (loading) {
        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Startup Ideas</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className="animate-pulse bg-white p-6 rounded-xl shadow-sm">
                            <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                            <div className="h-20 bg-gray-200 rounded mb-4"></div>
                            <div className="flex space-x-2 mb-4">
                                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                                <div className="h-6 w-16 bg-gray-200 rounded-full"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Startup Ideas</h2>
                <button
                    onClick={() => setShowAddModal(true)}
                    className="px-4 py-2 bg-[#FFD60A] rounded-lg font-medium hover:bg-[#FFD60A]/90 flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                            fillRule="evenodd"
                            d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                            clipRule="evenodd"
                        />
                    </svg>
                    <span>Add New Idea</span>
                </button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ideas.map((idea) => (
                    <div
                        key={idea._id}
                        className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-3">
                            <div className="text-xl font-semibold">
                                {idea.title}
                            </div>
                            <div className="flex space-x-2">
                                <button
                                    onClick={() => {
                                        setSelectedIdea(idea);
                                        setShowEditModal(true);
                                    }}
                                    className="p-1.5 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                </button>
                                <button
                                    onClick={() => handleDelete(idea._id)}
                                    className="p-1.5 text-red-600 hover:text-red-700 rounded-lg hover:bg-red-50">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor">
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <p className="text-gray-600 mb-4">{idea.description}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span
                                className={`px-3 py-1 rounded-full text-sm ${
                                    idea.priority === "High"
                                        ? "bg-red-100 text-red-800"
                                        : idea.priority === "Medium"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : "bg-green-100 text-green-800"
                                }`}>
                                {idea.priority}
                            </span>
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                                {idea.category}
                            </span>
                        </div>
                        <div className="text-sm text-gray-500">
                            Created:{" "}
                            {new Date(idea.createdAt).toLocaleDateString()}
                        </div>
                    </div>
                ))}
            </div>

            {/* Add Idea Modal */}
            {showAddModal && (
                <IdeaModal
                    onClose={() => setShowAddModal(false)}
                    onSubmit={async (formData) => {
                        try {
                            const token = localStorage.getItem("token");
                            console.log("1");
                            const newIdea = await axios.post(
                                "https://launch-pad-npps.vercel.app//ideas/create",
                                formData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            console.log("2");
                            fetchIdeas();
                            setShowAddModal(false);
                            return res.json({
                                success: true,
                                newIdea,
                            });
                        } catch (err) {
                            console.log(err);
                        }
                    }}
                />
            )}

            {/* Edit Idea Modal */}
            {showEditModal && selectedIdea && (
                <IdeaModal
                    idea={selectedIdea}
                    onClose={() => {
                        setShowEditModal(false);
                        setSelectedIdea(null);
                    }}
                    onSubmit={async (formData) => {
                        try {
                            const token = localStorage.getItem("token");
                            await axios.put(
                                `https://launch-pad-npps.vercel.app//ideas/${selectedIdea._id}`,
                                formData,
                                {
                                    headers: {
                                        Authorization: `Bearer ${token}`,
                                    },
                                }
                            );
                            fetchIdeas();
                            setShowEditModal(false);
                            setSelectedIdea(null);
                        } catch (err) {
                            alert(
                                err.response?.data?.message ||
                                    "Failed to update idea"
                            );
                        }
                    }}
                />
            )}
        </div>
    );
};

const IdeaModal = ({ idea, onClose, onSubmit }) => {
    const [formData, setFormData] = useState({
        title: idea?.title || "",
        description: idea?.description || "",
        category: idea?.category || "Technology",
        priority: idea?.priority || "Medium",
        status: idea?.status || "Draft",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full">
                <h3 className="text-xl font-semibold mb-4">
                    {idea ? "Edit Idea" : "Add New Idea"}
                </h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    title: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            value={formData.description}
                            onChange={(e) =>
                                setFormData({
                                    ...formData,
                                    description: e.target.value,
                                })
                            }
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent"
                            rows="4"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Category
                            </label>
                            <select
                                value={formData.category}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        category: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent">
                                {[
                                    "Technology",
                                    "Healthcare",
                                    "Education",
                                    "Finance",
                                    "E-commerce",
                                    "Social Impact",
                                    "Environment",
                                    "Other",
                                ].map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Priority
                            </label>
                            <select
                                value={formData.priority}
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        priority: e.target.value,
                                    })
                                }
                                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-[#FFD60A] focus:border-transparent">
                                {["Low", "Medium", "High"].map((priority) => (
                                    <option key={priority} value={priority}>
                                        {priority}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#FFD60A] rounded-lg font-medium hover:bg-[#FFD60A]/90">
                            {idea ? "Update Idea" : "Add Idea"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

function InvestorPage() {
    const [selectedTab, setSelectedTab] = useState("Dashboard");
    const [date, setDate] = useState("");
    const [totalPitches, setTotalPitches] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const updateDate = () => {
            const now = new Date();
            const formatted = `${now.getDate()}${getOrdinalSuffix(
                now.getDate()
            )} ${now.toLocaleString("default", {
                month: "short",
            })} ${now.getFullYear()}`;
            setDate(formatted);
        };

        updateDate(); // Initial update
        const timer = setInterval(updateDate, 1000);

        return () => clearInterval(timer);
    }, []);

    // Modify your Dashboard component to use the fetched data
    useEffect(() => {
        const fetchTotalPitches = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token"); // Get token from localStorage

                if (!token) {
                    throw new Error("No authentication token found");
                }

                const response = await axios.get(
                    "https://launch-pad-npps.vercel.app//startup/pitches",
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                    }
                );

                setTotalPitches(response.data.count);
                setError(null);
            } catch (err) {
                console.error("Error fetching pitch count:", err);
                setError(
                    err.response?.data?.message || "Failed to fetch pitch count"
                );
                setTotalPitches(0);
            } finally {
                setLoading(false);
            }
        };

        fetchTotalPitches();
    }, []);

    const getOrdinalSuffix = (day) => {
        if (day > 3 && day < 21) return "th";
        switch (day % 10) {
            case 1:
                return "st";
            case 2:
                return "nd";
            case 3:
                return "rd";
            default:
                return "th";
        }
    };

    const renderContent = () => {
        switch (selectedTab) {
            case "Dashboard":
                return (
                    <Dashboard
                        loading={loading}
                        totalPitches={totalPitches}
                        error={error}
                    />
                );
            case "Explore":
                return <Explore />;
            case "MyFeedbacks":
                return <Messages />;
            case "Bookmarks":
                return <Bookmarks />;
            case "My Profile":
                return <MyProfile />;
            default:
                return <Dashboard />;
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white p-6 shadow-lg">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">LaunchPad</h1>
                    <p className="text-gray-500">{date}</p>
                </div>

                <nav className="space-y-2">
                    {navItems.map((item) => (
                        <a
                            key={item.name}
                            href="#"
                            onClick={() => setSelectedTab(item.name)}
                            className={`flex items-center px-4 py-2 rounded-lg transition-colors duration-200 ${
                                selectedTab === item.name
                                    ? "bg-[#FFD60A] text-gray-800 font-medium"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}>
                            <span className="mr-3">
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d={item.icon}
                                    />
                                </svg>
                            </span>
                            {item.name}
                        </a>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1">{renderContent()}</div>
        </div>
    );
}

export default InvestorPage;
