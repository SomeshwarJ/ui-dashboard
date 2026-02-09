import React from 'react';
import { ExternalLink, BookOpen } from 'lucide-react';

const ResourceCard = ({ title, date, description }) => {
    return (
        <div className="bg-panel-card p-4 rounded-xl border border-panel-muted hover:border-panel-muted/80 transition-colors group cursor-pointer">
            <div className="flex justify-between items-start mb-2">
                <h4 className="text-white font-medium group-hover:text-accent-blue transition-colors line-clamp-1">{title}</h4>
                <ExternalLink size={14} className="text-text-subtle group-hover:text-white" />
            </div>
            <div className="text-xs text-text-subtle mb-2 opacity-60">{date}</div>
            <p className="text-text-subtle text-sm line-clamp-2">{description}</p>
        </div>
    );
};

export default ResourceCard;
