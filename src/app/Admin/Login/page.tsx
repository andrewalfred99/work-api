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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    style={{ color: "black" }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ color: "black" }}
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}
