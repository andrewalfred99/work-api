"use client";

import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <div className={`h-screen bg-purple-600 text-white transition-all ${isOpen ? "w-64" : "w-16"}`}>
            <button
                className="p-2 text-white focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                {isOpen ? "➖" : "➕"}
            </button>
            <nav className="mt-4">
                <ul>
                    <li className="p-2 hover:bg-gray-700">
                        <Link href="/">🏠 Home</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-700">
                        <Link href="/Admin/Login">🔑 Login</Link>
                    </li>
                    <li className="p-2 hover:bg-gray-700">
                        <Link href="/DistributOr">📦 Distributors</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}