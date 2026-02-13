"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface SearchComponentProps {
    onSearch: (query: string) => void;
    isLoading: boolean;
}

export default function SearchComponent({ onSearch, isLoading }: SearchComponentProps) {
    const [query, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query.trim());
        }
    };

    return (
        <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-full max-w-md mx-auto"
        >
            <div className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Enter Flight Number (e.g., AA100)"
                    className="w-full px-6 py-4 bg-glass backdrop-blur-md rounded-full border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all shadow-lg"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-blue-600 rounded-full hover:bg-blue-500 transition-colors disabled:opacity-50"
                    disabled={isLoading}
                >
                    <Search className="w-5 h-5 text-white" />
                </button>
            </div>
        </motion.form>
    );
}
