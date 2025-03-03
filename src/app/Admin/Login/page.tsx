"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("https://localhost:7172/api/Admin/UserLogin", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName: username, password }),
        });

        const data = await response.json();
        if (data.isSuccess) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("userID", data.userID);
            localStorage.setItem("userName", data.userName);
            router.push("/Profile");
        } else {
            alert("Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Login</h2>
                <form onSubmit={handleLogin} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-600"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-600"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
