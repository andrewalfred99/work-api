"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-black-100">
            <h1 className="text-3xl font-bold mb-6">Welcome to Home Page</h1>

            {!isLoggedIn ? (
                <div className="flex space-x-4">
                    <button
                        onClick={() => router.push("/Admin/Register")}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Register
                    </button>
                    <button
                        onClick={() => router.push("/Admin/Login")}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Login
                    </button>
                </div>
            ) : (
                <div className="flex space-x-4">
                    <button
                        onClick={() => router.push("/DistributOr")}
                        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                    >
                        Distributor
                    </button>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
