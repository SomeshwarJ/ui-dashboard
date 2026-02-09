import React from 'react';
import { Plus, Zap, Activity } from 'lucide-react';

const StageHeader = ({ title, count, color, actionLabel }) => {
    const getColorClasses = () => {
        switch (color) {
            case 'green': return 'text-accent-green bg-accent-green/10 border-accent-green/20';
            case 'blue': return 'text-accent-blue bg-accent-blue/10 border-accent-blue/20';
            case 'purple': return 'text-accent-purple bg-accent-purple/10 border-accent-purple/20';
            default: return 'text-white bg-white/10';
        }
    };

    const getIcon = () => {
        switch (color) {
            case 'green': return <Plus size={16} />;
            case 'blue': return <Zap size={16} />;
            case 'purple': return <Activity size={16} />;
            default: return null;
        }
    }

    return (
        <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${color === 'green' ? 'bg-accent-green' : color === 'blue' ? 'bg-accent-blue' : 'bg-accent-purple'} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} style={{ boxShadow: `0 0 12px ${color === 'green' ? '#46f0a8' : color === 'blue' ? '#4a9dff' : '#b26bff'}` }}></div>
                    <h2 className="text-white font-bold text-lg tracking-wide uppercase">{title}</h2>
                    <span className="bg-panel-muted text-text-subtle px-2 py-0.5 rounded text-xs font-mono">{count}</span>
                </div>
            </div>

            <button className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-dashed transition-all hover:bg-opacity-20 font-medium text-sm ${getColorClasses()}`}>
                {getIcon()}
                {actionLabel}
            </button>
        </div>
    );
};

export default StageHeader;
