function Dashboard() {
    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="w-64 bg-white p-6 shadow-lg">
                <div className="mb-8">
                    <h1 className="text-2xl font-bold">Niond</h1>
                </div>

                {/* Navigation Menu */}
                <nav className="space-y-2">
                    <a
                        href="#"
                        className="flex items-center px-4 py-2 bg-lime-200 rounded-lg text-gray-700">
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
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                            </svg>
                        </span>
                        Dashboard
                    </a>

                    {[
                        "My Pitches",
                        "Messages",
                        "Investors",
                        "My Profile",
                        "Ideas",
                    ].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="flex items-center px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">
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
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                </svg>
                            </span>
                            {item}
                        </a>
                    ))}
                </nav>

                {/* User Profile */}
                <div className="absolute bottom-0 left-0 p-6 w-64">
                    <div className="flex items-center space-x-3">
                        <img
                            src="/avatar.jpg"
                            alt="Profile"
                            className="w-12 h-12 rounded-full"
                        />
                        <div>
                            <h3 className="font-medium">Nora Watson</h3>
                            <p className="text-sm text-gray-500">
                                Sales Manager
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-2xl font-bold">Dashboard</h2>
                        <p className="text-gray-500">14th Aug 2023</p>
                    </div>

                    <div className="flex items-center space-x-4">
                        <button className="p-2 bg-gray-100 rounded-lg">
                            <svg
                                className="w-6 h-6"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                                />
                            </svg>
                        </button>
                        <img
                            src="/avatar.jpg"
                            alt="Profile"
                            className="w-10 h-10 rounded-full"
                        />
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                    <div className="bg-violet-100 p-6 rounded-xl">
                        <h3 className="text-sm mb-2">Total Earning</h3>
                        <p className="text-3xl font-bold">242.65K</p>
                        <p className="text-sm text-gray-600">
                            From the running month
                        </p>
                    </div>

                    <div className="bg-blue-100 p-6 rounded-xl">
                        <h3 className="text-sm mb-2">Average Earning</h3>
                        <p className="text-3xl font-bold">17.347K</p>
                        <p className="text-sm text-gray-600">
                            Daily Earning of this month
                        </p>
                    </div>

                    <div className="bg-green-100 p-6 rounded-xl">
                        <h3 className="text-sm mb-2">Conversation Rate</h3>
                        <p className="text-3xl font-bold">74.86%</p>
                        <p className="text-sm text-gray-600">
                            +6.04% greater that last month
                        </p>
                    </div>
                </div>

                {/* Chart Section */}
                <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-2 bg-white p-6 rounded-xl shadow-sm">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold">Regular Sell</h3>
                            <button className="px-4 py-1 bg-lime-200 rounded-full text-sm">
                                Export
                            </button>
                        </div>
                        {/* Add your chart component here */}
                    </div>

                    {/* Right Side Cards */}
                    <div className="space-y-6">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <h3 className="font-semibold mb-4">
                                More Analysis
                            </h3>
                            {/* Add analysis content */}
                        </div>

                        <div className="bg-teal-500 p-6 rounded-xl text-white">
                            <h3 className="font-semibold mb-2">
                                Upgrade to Pro
                            </h3>
                            <p className="text-3xl font-bold">
                                $4.20{" "}
                                <span className="text-sm font-normal">
                                    / Month
                                </span>
                            </p>
                            <p className="text-sm mb-4">$50 Billed Annually</p>
                            <button className="w-full bg-lime-200 text-gray-800 py-2 rounded-lg">
                                Upgrade Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
