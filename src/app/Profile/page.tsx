"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Profile() {
    const [userName, setUserName] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("userName");
        if (!storedUser) {
            router.push("/Admin/login"); // Redirect to login if no user data
        } else {
            setUserName(storedUser);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.clear(); // Clear stored user data
        router.push("/Admin/login");
    };

    return (
        <div>
            <h2>Profile Page</h2>
            {userName ? (
                <>
                    <p>Welcome, {userName}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
