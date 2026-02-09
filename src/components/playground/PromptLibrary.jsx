import React, { useState } from 'react';
import {
    Search,
    Bookmark,
    ChevronRight,
    Plus,
    X,
    PanelRightClose,
    PanelRightOpen,
    Trash2
} from 'lucide-react';

const PromptLibrary = ({ prompts, onCreatePrompt, onSelectPrompt, isOpen, onToggle }) => {
    const [isCreating, setIsCreating] = useState(false);
    const [newPromptTitle, setNewPromptTitle] = useState('');
    const [newPromptDesc, setNewPromptDesc] = useState('');

    const handleCreate = () => {
        if (!newPromptTitle || !newPromptDesc) return;
        onCreatePrompt({ title: newPromptTitle, desc: newPromptDesc, tag: 'Custom' });
        setIsCreating(false);
        setNewPromptTitle('');
        setNewPromptDesc('');
    };

    if (!isOpen) {
        return (
            <div className="h-full border-l border-white/5 bg-gemini-900/30 flex flex-col items-center py-4 w-12 transition-all">
                <button
                    onClick={onToggle}
                    className="p-2 mb-4 rounded-lg text-gemini-500 hover:text-white hover:bg-white/5 transition-colors"
                    title="Open Prompt Library"
                >
                    <PanelRightOpen size={18} />
                </button>
                <div className="flex-1 flex flex-col items-center gap-4">
                    <div className="writing-vertical text-xs font-mono text-gemini-600 tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        Prompt Library
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-80 h-full border-l border-white/5 bg-gemini-900/30 flex flex-col relative transition-all animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/5">
                <div className="flex items-center gap-2">
                    <button onClick={onToggle} className="text-gemini-500 hover:text-white transition-colors">
                        <PanelRightClose size={16} />
                    </button>
                    <h3 className="text-xs font-semibold text-gemini-400 uppercase tracking-wider">Prompt Library</h3>
                </div>
                <button
                    onClick={() => setIsCreating(true)}
                    className="text-[10px] bg-accent-secondary/10 text-accent-secondary px-2 py-1 rounded border border-accent-secondary/20 hover:bg-accent-secondary/20 transition-colors flex items-center gap-1"
                >
                    <Plus size={10} /> New
                </button>
            </div>

            {/* Categories */}
            <div className="flex gap-2 px-4 py-3 overflow-x-auto text-xs border-b border-white/5">
                <button className="px-2 py-1 rounded bg-white/10 text-white whitespace-nowrap">All</button>
                <button className="px-2 py-1 rounded hover:bg-white/5 text-gemini-500 whitespace-nowrap">Coding</button>
                <button className="px-2 py-1 rounded hover:bg-white/5 text-gemini-500 whitespace-nowrap">Creative</button>
            </div>

            {/* Prompt List */}
            <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar">
                {prompts.map((prompt) => (
                    <div key={prompt.id} className="p-3 bg-gemini-950/50 border border-white/5 rounded-xl hover:border-accent-secondary/30 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                            <button className="p-1 hover:text-white text-gemini-500"><Bookmark size={12} /></button>
                        </div>

                        <div className="flex items-center gap-2 mb-1.5">
                            <span className="text-xs px-1.5 py-0.5 rounded bg-accent-secondary/10 text-accent-secondary font-mono">{prompt.tag}</span>
                            <h4 className="text-sm text-gemini-200 font-medium line-clamp-1">{prompt.title}</h4>
                        </div>

                        <p className="text-xs text-gemini-500 line-clamp-2 leading-relaxed mb-3">
                            {prompt.desc}
                        </p>

                        <div className="flex items-center justify-between pt-2 border-t border-white/5">
                            <button
                                onClick={(e) => { e.stopPropagation(); /* Delete handler placeholder */ }}
                                className="text-[10px] text-gemini-600 hover:text-rose-400 transition-colors flex items-center gap-1 opacity-0 group-hover:opacity-100"
                            >
                                <Trash2 size={10} />
                            </button>
                            <button
                                onClick={() => onSelectPrompt(prompt)}
                                className="text-[10px] flex items-center gap-1 text-gemini-400 hover:text-white transition-colors ml-auto"
                            >
                                Use <ChevronRight size={10} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Inline Creation Modal (Overlay) */}
            {isCreating && (
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gemini-950/95 backdrop-blur-md z-20 p-4 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-white">Create Prompt</h3>
                        <button onClick={() => setIsCreating(false)} className="text-gemini-500 hover:text-white"><X size={14} /></button>
                    </div>

                    <input
                        type="text"
                        placeholder="Title (e.g., Code Refactor)"
                        className="bg-gemini-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-3 focus:outline-none focus:border-accent-secondary"
                        value={newPromptTitle}
                        onChange={(e) => setNewPromptTitle(e.target.value)}
                        autoFocus
                    />

                    <textarea
                        placeholder="Enter system prompt..."
                        className="bg-gemini-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white mb-4 flex-1 resize-none focus:outline-none focus:border-accent-secondary"
                        value={newPromptDesc}
                        onChange={(e) => setNewPromptDesc(e.target.value)}
                    />

                    <button
                        onClick={handleCreate}
                        className="w-full py-2 rounded-lg bg-accent-secondary text-white font-medium text-sm hover:bg-accent-secondary/90 transition-colors shadow-lg shadow-accent-secondary/20"
                    >
                        Save to Library
                    </button>
                </div>
            )}
        </div>
    );
};

export default PromptLibrary;
