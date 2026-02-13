"use client";

import { Flight } from "@/types";
import { Plane, Calendar, Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

interface FlightCardProps {
    flight: Flight;
}

export default function FlightCard({ flight }: FlightCardProps) {
    const isLanded = flight.flight_status === "landed";
    const isActive = flight.flight_status === "active";

    const statusColor = isLanded ? "text-green-400" : isActive ? "text-blue-400" : "text-yellow-400";

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-2xl mx-auto mt-8 p-6 rounded-2xl bg-glass border border-white/10 shadow-2xl backdrop-blur-xl"
        >
            <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
                <div>
                    <h2 className="text-2xl font-bold text-white">{flight.airline.name}</h2>
                    <p className="text-sm text-gray-400">{flight.flight.iata}</p>
                </div>
                <div className={`px-4 py-1 rounded-full border border-white/10 bg-black/20 ${statusColor} font-mono font-semibold uppercase text-sm`}>
                    {flight.flight_status}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                {/* Departure */}
                <div className="text-center md:text-left">
                    <div className="text-4xl font-bold text-white mb-1">{flight.departure.iata}</div>
                    <p className="text-sm text-gray-400 mb-4">{flight.departure.airport}</p>
                    <div className="flex items-center justify-center md:justify-start gap-2 text-white/80">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">
                            {new Date(flight.departure.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                    </div>
                </div>

                {/* Path Visual */}
                <div className="hidden md:flex flex-col items-center justify-center relative">
                    <div className="w-full h-[2px] bg-white/20 absolute top-1/2 -translate-y-1/2"></div>
                    <Plane className="w-8 h-8 text-blue-400 rotate-90 absolute bg-gray-900 p-1 rounded-full border border-white/10" />
                </div>

                {/* Arrival */}
                <div className="text-center md:text-right">
                    <div className="text-4xl font-bold text-white mb-1">{flight.arrival.iata}</div>
                    <p className="text-sm text-gray-400 mb-4">{flight.arrival.airport}</p>
                    <div className="flex items-center justify-center md:justify-end gap-2 text-white/80">
                        <span className="text-sm">
                            {new Date(flight.arrival.scheduled).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <Clock className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/10 flex justify-between text-sm text-gray-400">
                <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    {new Date(flight.flight_date).toLocaleDateString()}
                </div>
                <div>
                    Gate: <span className="text-white">{flight.departure.gate || "N/A"}</span>
                </div>
            </div>
        </motion.div>
    );
}
