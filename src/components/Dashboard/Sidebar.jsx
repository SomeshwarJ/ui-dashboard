import React, { useState } from 'react';
import {
    Home,
    Sparkles,
    Box,
    Bot,
    ShoppingBag,
    LayoutDashboard,
    Activity,
    Database,
    BookOpen,
    Settings,
    PanelLeftClose,
    PanelLeftOpen,
    ChevronRight
} from 'lucide-react';

const Sidebar = ({ activePage = 'dashboard', onNavigate }) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const menuItems = [
        { icon: Home, label: 'Home', id: 'home' },
        { icon: LayoutDashboard, label: 'Dashboard', id: 'dashboard' },
        { icon: Sparkles, label: 'Playground', id: 'playground' },
        { icon: Box, label: 'Models', id: 'models' },
        { icon: Bot, label: 'Agent Studio', id: 'agents' },
        { icon: ShoppingBag, label: 'Marketplace', id: 'marketplace' },
        { icon: Activity, label: 'Overwatch', id: 'overwatch' },
        { icon: Database, label: 'Data', id: 'data' },
        { icon: BookOpen, label: 'Documentation', id: 'docs' },
    ];

    const handleNav = (id) => {
        if (onNavigate) {
            onNavigate(id);
        }
    }

    return (
        <aside
            className={`${isCollapsed ? 'w-20' : 'w-[260px]'} h-screen sticky top-0 flex flex-col z-30 bg-gemini-950/50 backdrop-blur-xl border-r border-white/5 transition-all duration-300 ease-in-out`}
        >
            {/* Header / Logo */}
            <div className={`h-16 flex items-center ${isCollapsed ? 'justify-center px-0' : 'px-6 gap-3'} border-b border-white/5 mb-2`}>
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-accent-gradientStart to-accent-gradientEnd flex items-center justify-center shadow-lg shadow-blue-500/20 shrink-0">
                    <Sparkles className="text-white fill-white" size={16} />
                </div>

                {!isCollapsed && (
                    <span className="text-white font-medium text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 whitespace-nowrap overflow-hidden">
                        Tachyon
                    </span>
                )}
            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-20 bg-gemini-900 border border-white/10 rounded-full p-1 text-gemini-500 hover:text-white hover:bg-gemini-800 transition-colors shadow-lg z-50"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <PanelLeftClose size={14} />}
            </button>

            {/* Navigation */}
            <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto custom-scrollbar overflow-x-hidden">
                {!isCollapsed && <div className="px-3 mb-2 text-xs font-medium text-gemini-600 uppercase tracking-wider fade-in">Main Menu</div>}

                {menuItems.map((item) => {
                    const isActive = activePage === item.id;
                    return (
                        <button
                            key={item.id}
                            onClick={() => handleNav(item.id)}
                            className={`w-full flex items-center ${isCollapsed ? 'justify-center px-0' : 'gap-3 px-3'} py-2.5 rounded-lg text-sm transition-all duration-200 group relative ${isActive
                                    ? 'bg-accent-primary/15 text-accent-primary'
                                    : 'text-gemini-300/80 hover:bg-white/5 hover:text-white'
                                }`}
                            title={isCollapsed ? item.label : ''}
                        >
                            <item.icon
                                size={20}
                                className={`${isActive ? 'text-accent-primary' : 'text-gemini-600 group-hover:text-white transition-colors'}`}
                            />

                            {!isCollapsed && <span className="font-medium truncate">{item.label}</span>}

                            {/* Tooltip for collapsed state */}
                            {isCollapsed && (
                                <div className="absolute left-full ml-4 px-2 py-1 bg-gemini-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 shadow-xl border border-white/10">
                                    {item.label}
                                </div>
                            )}
                        </button>
                    );
                })}
            </nav>

            {/* Bottom User Area */}
            <div className={`p-4 border-t border-white/5 bg-black/20 ${isCollapsed ? 'flex justify-center' : ''}`}>
                <button className={`flex items-center ${isCollapsed ? 'justify-center w-full' : 'gap-3 w-full px-3'} py-2 rounded-lg text-gemini-300 hover:bg-white/5 transition-colors text-sm group`}>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                        JS
                    </div>

                    {!isCollapsed && (
                        <>
                            <div className="flex flex-col items-start truncate">
                                <span className="text-white text-xs font-medium truncate">Jane Smith</span>
                                <span className="text-gemini-600 text-[10px]">Pro Plan</span>
                            </div>
                            <Settings size={16} className="ml-auto text-gemini-600 hover:text-white" />
                        </>
                    )}
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;
