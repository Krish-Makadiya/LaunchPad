import React from "react";
import Navbar from "./components/Homepage/Navbar";
import { useAuth } from "./context/authContext";
import Footer from "./components/Homepage/Footer";

const App = () => {
    return (
        <div className="relative">
            <div className="h-[80vh] w-[60vw] mx-auto flex flex-col justify-center items-center gap-10">
                <div className="flex flex-col items-center gap-3">
                    <p className="text-[50px] font-[900] text-center font-[poppins]">
                        Where Innovative Startups <br /> Meet Smart Capital
                    </p>

                    <p className="text-[16px] text-center">
                        Join India's Fastest Growing Startup Community
                    </p>
                </div>

                <button className="px-5 py-3 flex items-center gap-2 border-1 rounded-[8px] bg-[#ffd60a] hover:bg-[#292927] hover:text-[#fff] hover:scale-105 duration-200">
                    <p>Get Started</p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="26"
                        height="26">
                        <path d="M9.293 4.293a1 1 0 011.414 0L16.414 10H4a1 1 0 100 2h12.414l-5.707 5.707a1 1 0 001.414 1.414l7-7a1 1 0 000-1.414l-7-7a1 1 0 00-1.414 0z" />
                    </svg>
                </button>
            </div>

            <div className="w-full h-[55vh]">
                <div className="w-[80%] mx-auto flex justify-between">
                    <div className="w-[30%] rounded-[8px] px-5 py-4 hover:bg-[#292927] hover:text-[#fff] hover:scale-105 duration-200 shadow-[1px_2px_50px_0px_rgba(0,_0,_0,_0.1)] group">
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
                                d="M13 10V3L4 14h7v7l9-11h-7z"
                            />
                        </svg>
                        <div className="mt-10">
                            <p>Active Startups</p>
                            <h3 className="text-5xl font-bold text-[#292927] mb-2 group-hover:text-[#fff] transition-colors duration-300">
                                150
                                <span className="text-[#ffd60a]">+</span>
                            </h3>
                        </div>
                    </div>
                    <div
                        className="w-[30%] rounded-[8px] px-5 py-4 hover:bg-[#292927] hover:text-[#fff] hover:scale-105 duration-200 shadow-[1px_2px_50px_0px_rgba(0,_0,_0,_0.1)]
 group">
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
                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                            />
                        </svg>
                        <div className="mt-10">
                            <p>Active Startups</p>
                            <h3 className="text-5xl font-bold text-[#292927] mb-2 group-hover:text-[#fff] transition-colors duration-300">
                                50<span className="text-[#ffd60a]">+</span>
                            </h3>
                        </div>
                    </div>
                    <div
                        className="w-[30%] rounded-[8px] px-5 py-4 hover:bg-[#292927] hover:text-[#fff] hover:scale-105 duration-200 shadow-[1px_2px_50px_0px_rgba(0,_0,_0,_0.1)]
 group">
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
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                            />
                        </svg>
                        <div className="mt-10">
                            <p>Active Startups</p>
                            <h3 className="text-5xl font-bold text-[#292927] mb-2 group-hover:text-[#fff] transition-colors duration-300">
                                ₹10<span className="text-[#ffd60a]">Cr+</span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[100vh] w-[60vw] mx-auto flex flex-col items-center gap-10">
                <div className="flex flex-col items-center">
                    <p className="text-[40px] text-center">Why Join Us?</p>
                    <div className="w-[100px] h-[2px] bg-[#ffd60a]"></div>
                </div>

                <div className="w-full flex flex-row justify-between gap-[60px]">
                    <div className="flex justify-between flex-col gap-16">
                        <div className="flex flex-col items-center gap-5">
                            <img
                                src="/strategic-consulting.gif"
                                width={100}
                                height={100}
                                alt="Fund"
                                className="rounded-full"
                                unoptimized
                            />
                            <div className="flex flex-col justify-center items-center gap-1">
                                <p className="text-[18px] font-[600]">
                                    Smart Matching
                                </p>
                                <p className="text-[14px]">
                                    Get matched with investors.
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <img
                                src="/piggy-bank.gif"
                                width={100}
                                height={100}
                                alt="Fund"
                                className="rounded-full"
                                unoptimized
                            />
                            <div className="flex flex-col justify-center items-center gap-1">
                                <p className="text-[18px] font-[600]">
                                    Get Funding
                                </p>
                                <p className="text-[14px]">
                                    Showcase Pitches to attract funding.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-between gap-20">
                        <div className="flex flex-col items-center gap-5">
                            <img
                                src="/teamwork.gif"
                                width={100}
                                height={100}
                                alt="Fund"
                                className="rounded-full"
                                unoptimized
                            />
                            <div className="flex flex-col justify-center items-center gap-1">
                                <p className="text-[18px] font-[600]">
                                    Network Growth
                                </p>
                                <p className="text-[14px]">
                                    Connect with other founders & mentors
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-5">
                            <img
                                src="/star.gif"
                                width={100}
                                height={100}
                                alt="Fund"
                                className="rounded-full"
                                unoptimized
                            />
                            <div className="flex flex-col justify-center items-center gap-1">
                                <p className="text-[18px] font-[600]">
                                    Expert Feedback
                                </p>
                                <p className="text-[14px]">
                                    Receive suggestions from investors.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:h-[80vh] h-[130vh] w-[80vw] mx-auto flex flex-col items-center gap-10">
                <div className="flex flex-col items-center">
                    <p className="md:text-[40px] text-[32px] text-center">
                        Success Stories
                    </p>
                    <div className="w-[80px] h-[1px] bg-[#ffd60a]"></div>
                </div>

                <div className="flex justify-between items-center md:flex-row flex-col gap-20">
                    <div className="md:w-[30%] w-[90%] text-center flex flex-col items-center gap-5">
                        <div className="flex flex-col items-center gap-5">
                            <div className="flex">
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="w-[100px] h-[2px] bg-[#ffb7033d]"></div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-[20px] font-[600]">
                                    Rahul Sharma
                                </p>
                                <p className="text-neutral-400">Startup</p>
                            </div>
                            <p>
                                LaunchPad helped us connect with the perfect
                                investors for our SaaS startup. Within 3 months,
                                we secured funding that shaped our growth. The
                                platform's analytics helped us understand
                                investor engagement better.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-[30%] w-[90%] text-center flex flex-col items-center gap-5">
                        <div className="flex flex-col items-center gap-5">
                            <div className="flex">
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="w-[80px] h-[2px] bg-[#ffb7033d]"></div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-[20px] font-[600]">
                                    Vikram Mehta
                                </p>
                                <p className="text-neutral-400">Investor</p>
                            </div>
                            <p>
                                LaunchPad streamlines my deal flow perfectly.
                                The quality of startups and the detailed pitch
                                information helps me make informed decisions
                                quickly. I've invested in 3 promising startups
                                through the platform in the last year.
                            </p>
                        </div>
                    </div>
                    <div className="md:w-[30%] w-[90%] text-center flex flex-col items-center gap-5">
                        <div className="flex flex-col items-center gap-5">
                            <div className="flex">
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                                <img
                                    src="/star-rating.png"
                                    width={35}
                                    height={35}
                                    alt="Fund"
                                    className="rounded-full"
                                />
                            </div>
                            <div className="w-[80px] h-[2px] bg-[#ffb7033d]"></div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div>
                                <p className="text-[20px] font-[600]">
                                    Priya Patel
                                </p>
                                <p className="text-neutral-400">Startup</p>
                            </div>
                            <p>
                                As a D2C startup, finding the right investors
                                was crucial. LaunchPad's platform made it easy
                                to showcase our sustainable food brand to
                                relevant investors. The detailed investor
                                feedback system is a game-changer.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[80vh] md:w-[60vw] w-[90vw] mx-auto flex flex-col items-center gap-20">
                <div className="flex flex-col items-center">
                    <p className="text-[40px]">Contact Us</p>
                    <div className="w-[80px] h-[1px] bg-[#ffb703]"></div>
                </div>

                <div className="flex md:gap-10 gap-16 md:flex-row flex-col">
                    <div className="w-[100%] flex gap-10">
                        <div className="flex flex-col gap-5">
                            <p className="text-[36px]">Get in Touch</p>
                            <div className="flex flex-col gap-3">
                                <p>
                                    Email, call, or complete the form to learn
                                    how FundVault can solve your messaging
                                    problem.
                                </p>
                                <div>
                                    <p>info@fundvault.io</p>
                                    <p>321-221-231</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w-[100%] flex flex-col gap-5">
                        <p className="text-[18px]">
                            We’d Love to Hear From You!
                        </p>
                        <form
                            action=""
                            className="flex flex-col gap-5 items-center">
                            <div className="w-full flex justify-between">
                                <input
                                    type="text"
                                    placeholder="First name"
                                    required
                                    className="w-[48%] text-black px-3 py-2 rounded-sm bg-neutral-300 placeholder:text-black"
                                />
                                <input
                                    type="text"
                                    placeholder="Last name"
                                    required
                                    className="w-[48%] text-black px-3 py-2 rounded-sm bg-neutral-300 placeholder:text-black"
                                />
                            </div>
                            <input
                                type="email"
                                name=""
                                id=""
                                placeholder="Your email"
                                required
                                className="w-full text-black px-3 py-2 rounded-sm bg-neutral-300 placeholder:text-black"
                            />
                            <textarea
                                name=""
                                id=""
                                placeholder="How can we help?"
                                rows={5}
                                required
                                className="w-full text-black px-3 py-2 rounded-sm bg-neutral-300 placeholder:text-black"
                            />

                            <button className="px-5 py-3 flex items-center gap-2 border-1 rounded-[8px] bg-[#ffd60a] hover:bg-[#292927] hover:text-[#fff] hover:scale-105 duration-200">
                                <p>Submit</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    width="26"
                                    height="26">
                                    <path d="M9.293 4.293a1 1 0 011.414 0L16.414 10H4a1 1 0 100 2h12.414l-5.707 5.707a1 1 0 001.414 1.414l7-7a1 1 0 000-1.414l-7-7a1 1 0 00-1.414 0z" />
                                </svg>
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default App;
