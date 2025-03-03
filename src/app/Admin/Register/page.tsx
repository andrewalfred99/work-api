"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState<string[]>([]);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors([]); // Clear previous errors

        const response = await fetch("https://localhost:7172/api/Admin/RegisterUser", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userName: username, email, password, confirmPassword }),
        });

        const data = await response.json();
        if (data.isSuccess) {
            alert("Registration successful! Logging in...");
            const loginResponse = await fetch("https://localhost:7172/api/Admin/UserLogin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName: username, password }),
            });

            const loginData = await loginResponse.json();
            if (loginData.isSuccess) {
                localStorage.setItem("token", loginData.token);
                router.push("/Admin/profile");
            } else {
                alert("Auto-login failed: " + loginData.message);
                router.push("/Admin/login");
            }
        } else {
            setErrors(data.errors || [data.message]);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-gray-700">Register</h2>
                <form onSubmit={handleRegister} className="flex flex-col space-y-4">
                    <input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-600"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-600"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-600"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-600"
                    />
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                    >
                        Register
                    </button>
                </form>
                {errors.length > 0 && (
                    <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
                        <h4 className="font-bold">Registration Errors:</h4>
                        <ul className="list-disc pl-5">
                            {errors.map((error, index) => (
                                <li key={index}>{error}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
