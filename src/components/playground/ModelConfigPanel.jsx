import React, { useState, useEffect } from 'react';
import {
    Settings,
    X,
    Thermometer,
    Zap,
    Cpu,
    Hash,
    RotateCcw,
    Info
} from 'lucide-react';

const ModelConfigPanel = ({ isOpen, onClose, config, onConfigChange }) => {
    if (!isOpen) return null;

    const handleChange = (key, value) => {
        onConfigChange({ ...config, [key]: value });
    };

    return (
        <div className="absolute top-14 right-4 w-80 bg-gemini-900 border border-white/10 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-4 duration-200">
            <div className="flex items-center justify-between p-4 border-b border-white/5">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                    <Settings size={14} className="text-accent-primary" />
                    Model Configuration
                </h3>
                <button onClick={onClose} className="text-gemini-500 hover:text-white transition-colors">
                    <X size={14} />
                </button>
            </div>

            <div className="p-4 space-y-5">
                {/* Temperature */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gemini-300 flex items-center gap-1.5"><Thermometer size={12} /> Temperature</span>
                        <span className="text-accent-primary font-mono">{config.temperature}</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="2" step="0.1"
                        value={config.temperature}
                        onChange={(e) => handleChange('temperature', parseFloat(e.target.value))}
                        className="w-full h-1 bg-gemini-700 rounded-lg appearance-none cursor-pointer accent-accent-primary"
                    />
                    <div className="flex justify-between text-[10px] text-gemini-600 font-mono">
                        <span>Precise</span>
                        <span>Creative</span>
                    </div>
                </div>

                {/* Max Tokens */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gemini-300 flex items-center gap-1.5"><Hash size={12} /> Max Tokens</span>
                        <span className="text-accent-primary font-mono">{config.maxTokens}</span>
                    </div>
                    <input
                        type="range"
                        min="256" max="8192" step="256"
                        value={config.maxTokens}
                        onChange={(e) => handleChange('maxTokens', parseInt(e.target.value))}
                        className="w-full h-1 bg-gemini-700 rounded-lg appearance-none cursor-pointer accent-accent-primary"
                    />
                </div>

                {/* Top P */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gemini-300 flex items-center gap-1.5"><Zap size={12} /> Top P</span>
                        <span className="text-accent-primary font-mono">{config.topP}</span>
                    </div>
                    <input
                        type="range"
                        min="0" max="1" step="0.05"
                        value={config.topP}
                        onChange={(e) => handleChange('topP', parseFloat(e.target.value))}
                        className="w-full h-1 bg-gemini-700 rounded-lg appearance-none cursor-pointer accent-accent-primary"
                    />
                </div>

                {/* System Prompt (Quick Edit) */}
                <div className="space-y-2 pt-2 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs">
                        <span className="text-gemini-300 flex items-center gap-1.5"><Cpu size={12} /> System Instruction</span>
                    </div>
                    <textarea
                        className="w-full bg-gemini-950 border border-white/10 rounded-lg p-2 text-xs text-white resize-none h-20 focus:outline-none focus:border-accent-primary/50"
                        placeholder="You are a helpful AI assistant..."
                        value={config.systemPrompt}
                        onChange={(e) => handleChange('systemPrompt', e.target.value)}
                    />
                </div>

                <div className="flex items-center justify-between pt-2">
                    <button
                        onClick={() => onConfigChange({ temperature: 0.7, maxTokens: 4096, topP: 1, systemPrompt: '' })}
                        className="text-xs text-gemini-500 hover:text-white flex items-center gap-1"
                    >
                        <RotateCcw size={10} /> Reset
                    </button>
                    <div className="text-[10px] text-gemini-600 flex items-center gap-1">
                        <Info size={10} /> Auto-saves to experiment
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelConfigPanel;
