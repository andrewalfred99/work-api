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

        const loggedInUser = localStorage.getItem("username") || "Unknown";
        const updatedSector = {
            ...editSector,
            updatedBy: loggedInUser,
            updatedDate: new Date().toISOString(),
        };

        const response = await fetch("https://localhost:7172/api/DistributOr/EditSector", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedSector),
        });

        if (response.ok) {
            alert("Sector updated successfully!");
            setSectors(sectors.map((s) => (s.sectorCode === updatedSector.sectorCode ? updatedSector : s)));
            setEditSector(null);
        } else {
            alert("Failed to update sector.");
        }
    };

    return (
        <div>
            <h2>Distributor Sectors</h2>
            <input
                type="text"
                placeholder="Search by Sector Code"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
            />
            <button>Search</button>
            <ul>
                {sectors.map((sector) => (
                    <li key={sector.sectorCode}>
                        {sector.sectorName} (Code: {sector.sectorCode})
                        <button onClick={() => handleEditClick(sector)}>Edit</button>
                    </li>
                ))}
            </ul>
            {editSector && (
                <div>
                    <h3>Edit Sector</h3>
                    <input
                        type="text"
                        name="sectorName"
                        value={editSector.sectorName}
                        onChange={handleEditChange}
                    />
                    <button onClick={handleSaveEdit}>Save</button>
                    <button onClick={() => setEditSector(null)}>Cancel</button>
                </div>
            )}
        </div>
    );
}
