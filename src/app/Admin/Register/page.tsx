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
                alert("Login successful!");
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
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ color: "black" }}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    style={{ color: "black" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ color: "black" }}
                />
                <input
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    style={{ color: "black" }}
                />
                <button type="submit">Register</button>
            </form>
            {errors.length > 0 && (
                <div style={{ color: "red" }}>
                    <h4>Registration Errors:</h4>
                    <ul>
                        {errors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
