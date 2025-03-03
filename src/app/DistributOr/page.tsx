"use client";

import { useState, useEffect } from "react";

interface Sector {
    sectorCode: number;
    sectorName: string;
    createdBy: string;
    createdDate: string;
    updatedBy: string;
    updatedDate: string;
}

export default function DistributorPage() {
    const [sectors, setSectors] = useState<Sector[]>([]);
    const [searchId, setSearchId] = useState("");
    const [editSector, setEditSector] = useState<Sector | null>(null);
    const [newSectorName, setNewSectorName] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetch("https://localhost:7172/api/DistributOr/GetAllSector")
            .then((res) => res.json())
            .then((data) => setSectors(data))
            .catch((err) => console.error("Error fetching sectors:", err));
    }, []);

    const handleEditClick = (sector: Sector) => {
        setEditSector(sector);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editSector) {
            setEditSector({ ...editSector, [e.target.name]: e.target.value });
        }
    };

    const handleSaveEdit = async () => {
        if (!editSector) return;

        const loggedInUser = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        if (!loggedInUser || !token) {
            alert("Error: No logged-in user found or missing authentication token!");
            return;
        }

        const updatedSector = {
            ...editSector,
            updatedBy: loggedInUser,
            updatedDate: new Date().toISOString(),
        };

        console.log("Updating sector:", updatedSector);

        setIsLoading(true);
        const response = await fetch("https://localhost:7172/api/DistributOr/EditSector", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(updatedSector),
        });
        setIsLoading(false);

        if (response.ok) {
            alert("Sector updated successfully!");
            setSectors(sectors.map((s) => (s.sectorCode === updatedSector.sectorCode ? updatedSector : s)));
            setEditSector(null);
        } else {
            alert("Failed to update sector.");
        }
    };

    const handleAddSector = async () => {
        if (!newSectorName) return alert("Sector name is required");

        const loggedInUser = localStorage.getItem("username");
        const token = localStorage.getItem("token");
        if (!loggedInUser || !token) {
            alert("Error: No logged-in user found or missing authentication token!");
            return;
        }

        const newSector = {
            sectorCode: 0,
            sectorName: newSectorName,
            createdBy: loggedInUser,
            createdDate: new Date().toISOString(),
            updatedBy: loggedInUser,
            updatedDate: new Date().toISOString(),
        };

        setIsLoading(true);
        const response = await fetch("https://localhost:7172/api/DistributOr/CreateNewSector", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify(newSector),
        });
        setIsLoading(false);

        if (response.ok) {
            alert("Sector added successfully!");
            setSectors([...sectors, newSector]);
            setNewSectorName("");
        } else {
            alert("Failed to add sector.");
        }
    };

    return (
        <div className="p-6 max-w-lg mx-auto bg-gray-900 text-white rounded-xl shadow-md space-y-4">
            <h2 className="text-2xl font-bold text-white">Distributor Sectors</h2>
            <input
                type="text"
                placeholder="Search by Sector Code"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400"
            />
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">Search</button>

            <h3 className="text-lg font-semibold text-white">Add New Sector</h3>
            <input
                type="text"
                placeholder="Sector Name"
                value={newSectorName}
                onChange={(e) => setNewSectorName(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400"
            />
            <button
                onClick={handleAddSector}
                disabled={isLoading}
                className="px-4 py-2 bg-green-600 text-white rounded-lg disabled:bg-gray-500"
            >
                {isLoading ? "Adding..." : "Add Sector"}
            </button>

            <ul className="space-y-2">
                {sectors.map((sector) => (
                    <li key={sector.sectorCode} className="p-4 border rounded-lg flex justify-between items-center bg-gray-800 text-white">
                        <span>{sector.sectorName} (Code: {sector.sectorCode})</span>
                        <button
                            onClick={() => handleEditClick(sector)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-lg"
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>
            {editSector && (
                <div className="p-4 border rounded-lg bg-gray-700 text-white">
                    <h3 className="text-lg font-semibold">Edit Sector</h3>
                    <input
                        type="text"
                        name="sectorName"
                        value={editSector.sectorName}
                        onChange={handleEditChange}
                        className="w-full px-4 py-2 border rounded-lg bg-gray-800 text-white placeholder-gray-400"
                    />
                    <div className="flex space-x-2 mt-2">
                        <button
                            onClick={handleSaveEdit}
                            disabled={isLoading}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg disabled:bg-gray-500"
                        >
                            {isLoading ? "Saving..." : "Save"}
                        </button>
                        <button
                            onClick={() => setEditSector(null)}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
