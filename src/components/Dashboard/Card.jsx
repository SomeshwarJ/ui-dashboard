import React from 'react';
import { Clock, ArrowUpRight, PlayCircle, Box, Activity } from 'lucide-react';

const Card = ({ title, status, description, recommendedStep, type, meta }) => {
    // Config for gradient accents
    const getTypeStyles = () => {
        switch (type) {
            case 'ideation': return {
                badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
                icon: 'text-emerald-400'
            };
            case 'build': return {
                badge: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
                icon: 'text-blue-400'
            };
            case 'deployed': return {
                badge: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
                icon: 'text-purple-400'
            };
            default: return {
                badge: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
                icon: 'text-gray-400'
            };
        }
    };

    const styles = getTypeStyles();

    return (
        <div className="glass-card rounded-2xl p-5 group flex flex-col h-full relative overflow-hidden">
            {/* Subtle gradient shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>

            <div className="flex justify-between items-start mb-3 relative z-10">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-gemini-900 border border-white/5 ${styles.icon}`}>
                        {type === 'ideation' ? <Box size={18} /> : type === 'build' ? <PlayCircle size={18} /> : <Activity size={18} />}
                    </div>
                    <div>
                        <h3 className="text-white font-medium text-sm leading-tight group-hover:text-accent-primary transition-colors">{title}</h3>
                        <span className="text-[10px] text-gemini-600 font-mono mt-1 block">{status}</span>
                    </div>
                </div>

                <button className="text-gemini-600 hover:text-white transition-colors">
                    <ArrowUpRight size={16} />
                </button>
            </div>

            {/* Description */}
            <p className="text-gemini-300/70 text-xs mb-4 line-clamp-2 leading-relaxed flex-grow relative z-10">
                {description}
            </p>

            {/* Footer Meta */}
            <div className="flex items-center justify-between pt-3 border-t border-white/5 relative z-10">
                {meta?.time && (
                    <span className="flex items-center gap-1.5 text-[10px] text-gemini-600 font-medium bg-black/20 px-2 py-1 rounded">
                        <Clock size={10} /> {meta.time}
                    </span>
                )}
                {meta?.success && (
                    <span className="flex items-center gap-1.5 text-[10px] text-emerald-400 font-medium bg-emerald-500/5 px-2 py-1 rounded">
                        {meta.success}
                    </span>
                )}

                <a href="#" className="text-[10px] font-medium text-accent-primary hover:text-accent-secondary transition-colors flex items-center gap-1 ml-auto">
                    {recommendedStep}
                </a>
            </div>
        </div>
    );
};

export default Card;
