"use client";

import { useState } from "react";
import axios from "axios";
import SearchComponent from "@/components/SearchComponent";
import FlightCard from "@/components/FlightCard";
import { Flight } from "@/types";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
    const [loading, setLoading] = useState(false);
    const [flights, setFlights] = useState<Flight[]>([]);
    const [error, setError] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (query: string) => {
        setLoading(true);
        setError("");
        setHasSearched(true);
        try {
            // Use the internal API route
            const response = await axios.get(`/api/flight`, {
                params: { flight_iata: query },
            });

            if (response.data.data && response.data.data.length > 0) {
                setFlights(response.data.data);
            } else {
                setFlights([]);
                setError("No flights found for this number.");
            }
        } catch (err) {
            setError("Failed to fetch flight data. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="min-h-screen flex flex-col items-center justify-start pt-24 px-4 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat relative">
            <div className="absolute inset-0 bg-black/60 z-0"></div>

            <div className="z-10 w-full max-w-4xl flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-white mb-4">
                        Flight Tracker
                    </h1>
                    <p className="text-gray-300 text-lg">Real-time aviation intelligence at your fingertips.</p>
                </motion.div>

                <SearchComponent onSearch={handleSearch} isLoading={loading} />

                <div className="w-full mt-12">
                    {loading && (
                        <div className="flex justify-center">
                            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
                        </div>
                    )}

                    {error && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-red-400 text-center bg-black/30 p-4 rounded-lg backdrop-blur-sm border border-red-500/20"
                        >
                            {error}
                        </motion.div>
                    )}

                    <AnimatePresence>
                        {!loading && flights.map((flight, index) => (
                            <FlightCard key={`${flight.flight.iata}-${index}`} flight={flight} />
                        ))}
                    </AnimatePresence>

                    {!loading && hasSearched && flights.length === 0 && !error && (
                        <div className="text-center text-gray-400">No results found.</div>
                    )}
                </div>
            </div>
        </main>
    );
}
