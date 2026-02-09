import React from 'react';
import { ArrowRight, Clock, CheckCircle2, AlertCircle, Play } from 'lucide-react';

const ProjectCard = ({ title, status, time, progress, nextStep, type }) => {
    // Determine colors based on type
    const getColors = () => {
        switch (type) {
            case 'ideation': return { border: 'border-accent-green', text: 'text-accent-green', bg: 'bg-accent-green/10' };
            case 'build': return { border: 'border-accent-blue', text: 'text-accent-blue', bg: 'bg-accent-blue/10' };
            case 'deployed': return { border: 'border-accent-purple', text: 'text-accent-purple', bg: 'bg-accent-purple/10' };
            default: return { border: 'border-gray-500', text: 'text-gray-500', bg: 'bg-gray-500/10' };
        }
    };

    const colors = getColors();

    return (
        <div className="bg-panel-card rounded-xl p-5 border border-panel-muted hover:border-panel-muted/80 transition-all hover:shadow-soft group relative overflow-hidden">
            {/* Status indicator line */}
            <div className={`absolute top-0 left-0 w-1 h-full ${colors.bg.replace('/10', '')}`}></div>

            <div className="flex justify-between items-start mb-3 pl-2">
                <div>
                    <h3 className="text-white font-semibold text-lg">{title}</h3>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${colors.bg} ${colors.text} inline-block mt-1 uppercase tracking-wider`}>
                        {status}
                    </span>
                </div>
                {time && <span className="text-text-subtle text-xs flex items-center gap-1"><Clock size={12} /> {time}</span>}
            </div>

            <div className="pl-2 mb-4">
                <p className="text-text-subtle text-sm mb-3">
                    AI component generation for real-time data processing...
                </p>

                {progress && (
                    <div className="flex items-center gap-2 mb-2">
                        <div className="flex-1 h-1.5 bg-panel-muted rounded-full overflow-hidden">
                            <div className={`h-full ${colors.bg.replace('/10', '')}`} style={{ width: progress }}></div>
                        </div>
                        <span className="text-white text-xs font-medium">{progress}</span>
                    </div>
                )}
            </div>

            <div className="pl-2 pt-3 border-t border-panel-muted flex justify-between items-center">
                <div className="text-xs text-text-subtle">
                    <span className="block opacity-60 uppercase text-[10px]">Recommended Step</span>
                    <span className="text-white hover:underline cursor-pointer flex items-center gap-1 group-hover:text-accent-blue transition-colors">
                        {nextStep} <ArrowRight size={12} />
                    </span>
                </div>
                <button className={`p-2 rounded-full hover:bg-panel-muted transition-colors ${colors.text}`}>
                    <Play size={16} fill="currentColor" />
                </button>
            </div>
        </div>
    );
};

export default ProjectCard;
