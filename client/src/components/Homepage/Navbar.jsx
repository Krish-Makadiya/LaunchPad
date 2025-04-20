import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import {
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithPopup,
} from "firebase/auth";
import axios from "axios";
import { useAuth } from "../../context/authContext";

const Navbar = () => {
    const provider = new GoogleAuthProvider();
    const [showRoleDialog, setShowRoleDialog] = useState(false);
    const { user, role, token, updateUser, updateRole, updateToken, logout } =
        useAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                const token = await firebaseUser.getIdToken();
                updateUser(firebaseUser);
                updateToken(token);

                try {
                    const response = await axios.get(
                        `launch-pad-xvna.vercel.app/auth/check/${firebaseUser.uid}`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );

                    if (response.data.exists) {
                        updateRole(response.data.role);
                    } else {
                        setShowRoleDialog(true);
                    }
                } catch (error) {
                    console.error("Error fetching user role:", error);
                }
            } else {
                updateUser(null);
                updateToken(null);
                updateRole(null);
            }
        });

        return () => unsubscribe();
    }, []);

    const signoutHandler = () => {
        auth.signOut()
            .then(() => {
                logout();
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    const signinHandler = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userData = result.user;
            const token =
                localStorage.getItem("token") || (await userData.getIdToken());

            updateUser(userData);
            updateToken(token);

            try {
                const response = await axios.get(
                    `launch-pad-xvna.vercel.app/auth/check/${userData.uid}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

                if (response.data.exists) {
                    updateRole(response.data.role);
                } else {
                    setShowRoleDialog(true);
                }
                
            } catch (error) {
                console.error("Error checking user:", error);
                setShowRoleDialog(true);
            }
        } catch (error) {
            console.error("Error during signin:", error);
        }
    };

    const handleRoleSelection = async (selectedRole) => {
        try {
            const response = await axios.post(
                "launch-pad-xvna.vercel.app/auth/verify-token",
                {
                    userRole: selectedRole,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response);
            updateRole(selectedRole);
            setShowRoleDialog(false);
        } catch (error) {
            console.error("Error saving user role:", error);
        }
    };

    const handleOutsideClick = (e) => {
        if (e.target.classList.contains("dialog-overlay")) {
            setShowRoleDialog(false);
        }
    };

    return (
        <>
            <div className="w-[90%] mx-auto flex justify-between items-center py-2">
                <p className="text-2xl font-bold">LaunchPad</p>

                <div>
                    {user ? (
                        <div className="flex items-center gap-6">
                            <div className="flex items-center gap-1">
                                <img
                                    src={user.photoURL}
                                    alt="Profile"
                                    className="w-6 h-6 rounded-full"
                                />
                                <p className="">{user.displayName}</p>
                                {role && (
                                    <span className="ml-2 text-sm text-gray-600">
                                        ({role})
                                    </span>
                                )}
                            </div>
                            <button
                                onClick={signoutHandler}
                                className="bg-red-500 text-white px-4 py-2 rounded text-sm">
                                Sign Out
                            </button>
                        </div>
                    ) : (
                        <button
                            onClick={signinHandler}
                            className="bg-blue-500 text-white px-4 py-2 rounded">
                            Sign In
                        </button>
                    )}
                </div>
            </div>

            {showRoleDialog && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 dialog-overlay"
                    onClick={handleOutsideClick}>
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
                        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
                            Choose your role
                        </h2>
                        <p className="text-gray-600 mb-8 text-center">
                            Select how you want to use LaunchPad
                        </p>
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => handleRoleSelection("startup")}
                                className="flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors duration-200 transform hover:scale-105">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838l-2.727 1.17 1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.69-.12h-.002A1 1 0 013 13V9.397z" />
                                </svg>
                                <span>I'm a Startup</span>
                            </button>
                            <button
                                onClick={() => handleRoleSelection("investor")}
                                className="flex items-center justify-center gap-2 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors duration-200 transform hover:scale-105">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor">
                                    <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                                    <path
                                        fillRule="evenodd"
                                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                                <span>I'm an Investor</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
