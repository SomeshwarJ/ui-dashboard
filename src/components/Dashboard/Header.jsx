import React from 'react';
import { Bell, Search, Command } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-16 border-b border-white/5 bg-gemini-950/80 backdrop-blur-md sticky top-0 z-20 px-6 flex items-center justify-between">
            {/* Title / Breadcrumbs */}
            <div className="flex items-center gap-2">
                <h1 className="text-white font-medium text-lg">Dashboard</h1>
            </div>

            {/* Global Search */}
            <div className="hidden md:flex items-center absolute left-1/2 -translate-x-1/2 w-96">
                <div className="relative w-full group">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gemini-600 group-focus-within:text-accent-primary transition-colors" size={16} />
                    <input
                        type="text"
                        placeholder="Search resources, models, or docs..."
                        className="w-full bg-gemini-900 border border-gemini-700/50 rounded-full py-2 pl-10 pr-12 text-sm text-white placeholder:text-gemini-600 focus:outline-none focus:border-accent-primary/50 focus:bg-gemini-800 transition-all shadow-inner"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-1">
                        <span className="text-[10px] text-gemini-600 px-1.5 py-0.5 rounded border border-gemini-700 bg-gemini-800">⌘</span>
                        <span className="text-[10px] text-gemini-600 px-1.5 py-0.5 rounded border border-gemini-700 bg-gemini-800">K</span>
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
                {/* Credit Display */}
                <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-gemini-900 border border-white/5">
                    <div className="w-2 h-2 rounded-full bg-accent-success animate-pulse"></div>
                    <span className="text-xs font-mono text-gemini-300">SYSTEM ONLINE</span>
                </div>

                <button className="text-gemini-300 hover:text-white transition-colors relative p-2 hover:bg-white/5 rounded-full">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-2 w-2 h-2 bg-accent-error rounded-full border border-gemini-950"></span>
                </button>
            </div>
        </header>
    );
};

export default Header;
