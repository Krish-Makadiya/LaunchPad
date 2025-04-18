import { useEffect, useState } from "react";
import axios from "axios";
import CreatePitchForm from "../components/Homepage/CreatePitchForm";
import PitchList from "../components/Homepage/Pitchlist";

const navItems = [
    {
        name: "Dashboard",
        icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
    },
    {
        name: "My Pitches",
        icon: "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9.5a2 2 0 00-.586-1.414l-4.5-4.5A2 2 0 0015.5 3H14m5 16v-2a2 2 0 00-2-2h-3",
    },
    {
        name: "Messages",
        icon: "M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z",
    },
    {
        name: "Investors",
        icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z",
    },
    {
        name: "My Profile",
        icon: "M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    },
    {
        name: "Ideas",
        icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z",
    },
];

const Dashboard = ({ loading, totalPitches, error }) => (
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
                    <p>Total Views</p>
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
    </div>
);

const MyPitches = () => {
    const [showCreateForm, setShowCreateForm] = useState(false);

    if (showCreateForm) {
        return <CreatePitchForm onClose={() => setShowCreateForm(false)} />;
    }

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">My Pitches</h2>
                <button
                    onClick={() => setShowCreateForm(true)}
                    className="px-4 py-2 bg-[#FFD60A] rounded-lg hover:bg-[#FFD60A]/90 flex items-center space-x-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                        />
                    </svg>
                    <span>Create Pitch</span>
                </button>
            </div>

            <PitchList />
        </div>
    );
};

const Messages = () => (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Messages</h2>
        <div className="bg-white rounded-xl shadow-sm">
            {[1, 2, 3].map((message) => (
                <div
                    key={message}
                    className="p-6 border-b border-gray-100 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                        <div>
                            <h3 className="font-semibold">Investor Name</h3>
                            <p className="text-gray-500">
                                Latest message preview...
                            </p>
                        </div>
                        <div className="ml-auto text-sm text-gray-400">
                            2h ago
                        </div>
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const Investors = () => (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Potential Investors</h2>
        <div className="grid grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((investor) => (
                <div
                    key={investor}
                    className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                        <div>
                            <h3 className="font-semibold text-lg">
                                Investor Name
                            </h3>
                            <p className="text-gray-500">Angel Investor</p>
                        </div>
                    </div>
                    <p className="text-gray-600 mb-4">
                        Interested in: Tech, AI, SaaS
                    </p>
                    <button className="w-full py-2 bg-[#FFD60A] rounded-lg font-medium">
                        Connect
                    </button>
                </div>
            ))}
        </div>
    </div>
);

const MyProfile = () => (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>
        <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full"></div>
                <div>
                    <h3 className="text-xl font-semibold">John Doe</h3>
                    <p className="text-gray-500">Startup Founder</p>
                </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            className="mt-1 w-full p-2 border rounded-lg"
                            value="john@example.com"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Company
                        </label>
                        <input
                            type="text"
                            className="mt-1 w-full p-2 border rounded-lg"
                            value="Tech Startup Inc."
                            readOnly
                        />
                    </div>
                </div>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Location
                        </label>
                        <input
                            type="text"
                            className="mt-1 w-full p-2 border rounded-lg"
                            value="San Francisco, CA"
                            readOnly
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Industry
                        </label>
                        <input
                            type="text"
                            className="mt-1 w-full p-2 border rounded-lg"
                            value="Technology"
                            readOnly
                        />
                    </div>
                </div>
            </div>
            <button className="mt-6 px-4 py-2 bg-[#FFD60A] rounded-lg font-medium">
                Edit Profile
            </button>
        </div>
    </div>
);

const Ideas = () => (
    <div className="p-8">
        <h2 className="text-2xl font-bold mb-6">Startup Ideas</h2>
        <div className="grid grid-cols-3 gap-6">
            {[1, 2, 3].map((idea) => (
                <div key={idea} className="bg-white p-6 rounded-xl shadow-sm">
                    <div className="text-xl font-semibold mb-3">
                        Idea #{idea}
                    </div>
                    <p className="text-gray-600 mb-4">
                        Brief description of the startup idea goes here...
                    </p>
                    <div className="flex space-x-2">
                        <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            Tech
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                            SaaS
                        </span>
                    </div>
                    <button className="mt-4 w-full py-2 bg-[#FFD60A] rounded-lg font-medium">
                        Develop Idea
                    </button>
                </div>
            ))}
        </div>
    </div>
);

function StartupPage() {
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
                    "http://localhost:5000/startup/get-user-pitches",
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

    // Helper function to add ordinal suffix (1st, 2nd, 3rd, etc.)
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
            case "My Pitches":
                return <MyPitches />;
            case "Messages":
                return <Messages />;
            case "Investors":
                return <Investors />;
            case "My Profile":
                return <MyProfile />;
            case "Ideas":
                return <Ideas />;
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

export default StartupPage;
