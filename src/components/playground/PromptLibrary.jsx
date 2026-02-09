import React, { useState } from 'react';
import {
    Bookmark,
    ChevronRight,
    Plus,
    X,
    PanelRightClose,
    PanelRightOpen,
    Trash2,
    Cpu
} from 'lucide-react';

const PromptLibrary = ({
    prompts,
    onCreatePrompt,
    onSelectPrompt,
    isOpen,
    onToggle,
    // MCP Props
    availableTools = [],
    activeTools = [],
    onToggleTool,
    onAddTool
}) => {
    const [activeTab, setActiveTab] = useState('prompts'); // 'prompts' | 'tools'
    const [isCreating, setIsCreating] = useState(false);
    const [newPromptTitle, setNewPromptTitle] = useState('');
    const [newPromptDesc, setNewPromptDesc] = useState('');
    const [isAddingTool, setIsAddingTool] = useState(false); // For custom tool modal
    const [customToolName, setCustomToolName] = useState('');

    const handleCreatePrompt = () => {
        if (!newPromptTitle || !newPromptDesc) return;
        onCreatePrompt({ title: newPromptTitle, desc: newPromptDesc, tag: 'Custom' });
        setIsCreating(false);
        setNewPromptTitle('');
        setNewPromptDesc('');
    };

    const handleAddCustomTool = () => {
        if (onAddTool && customToolName) {
            onAddTool(customToolName);
            setCustomToolName('');
            setIsAddingTool(false);
        }
    }

    if (!isOpen) {
        return (
            <div className="h-full border-l border-white/5 bg-gemini-900/30 flex flex-col items-center py-4 w-12 transition-all">
                <button
                    onClick={onToggle}
                    className="p-2 mb-4 rounded-lg text-gemini-500 hover:text-white hover:bg-white/5 transition-colors"
                    title="Open Library"
                >
                    <PanelRightOpen size={18} />
                </button>
                <div className="flex-1 flex flex-col items-center gap-4">
                    <div className="writing-vertical text-xs font-mono text-gemini-600 tracking-widest uppercase rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        Library & Tools
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-80 h-full border-l border-white/5 bg-gemini-900/30 flex flex-col relative transition-all animate-in slide-in-from-right duration-300 backdrop-blur-sm">
            {/* Header */}
            <div className="flex flex-col border-b border-white/5 bg-gemini-950/20">
                <div className="flex items-center justify-between p-4 pb-2">
                    <div className="flex items-center gap-2">
                        <button onClick={onToggle} className="text-gemini-500 hover:text-white transition-colors">
                            <PanelRightClose size={16} />
                        </button>
                        <h3 className="text-xs font-semibold text-gemini-400 uppercase tracking-wider">Resources</h3>
                    </div>
                    {/* Action Button Changes based on Tab */}
                    {activeTab === 'prompts' ? (
                        <button
                            onClick={() => setIsCreating(true)}
                            className="text-[10px] bg-accent-secondary/10 text-accent-secondary px-2 py-1 rounded border border-accent-secondary/20 hover:bg-accent-secondary/20 transition-colors flex items-center gap-1"
                        >
                            <Plus size={10} /> New Prompt
                        </button>
                    ) : (
                        <button
                            onClick={() => setIsAddingTool(true)}
                            className="text-[10px] bg-accent-primary/10 text-accent-primary px-2 py-1 rounded border border-accent-primary/20 hover:bg-accent-primary/20 transition-colors flex items-center gap-1"
                        >
                            <Plus size={10} /> Add Tool
                        </button>
                    )}
                </div>

                {/* Tabs */}
                <div className="flex px-4 gap-4 text-sm font-medium">
                    <button
                        onClick={() => setActiveTab('prompts')}
                        className={`pb-2 border-b-2 transition-colors ${activeTab === 'prompts' ? 'border-accent-secondary text-white' : 'border-transparent text-gemini-500 hover:text-gemini-300'}`}
                    >
                        Prompts
                    </button>
                    <button
                        onClick={() => setActiveTab('tools')}
                        className={`pb-2 border-b-2 transition-colors ${activeTab === 'tools' ? 'border-accent-primary text-white' : 'border-transparent text-gemini-500 hover:text-gemini-300'}`}
                    >
                        MCP Tools
                    </button>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar relative">

                {/* --- PROMPTS TAB --- */}
                {activeTab === 'prompts' && (
                    <div className="p-4 space-y-3 animate-in fade-in slide-in-from-right-2 duration-300">
                        {/* Categories */}
                        <div className="flex gap-2 overflow-x-auto text-xs pb-2 mb-1 scrollbar-none">
                            <button className="px-2 py-1 rounded bg-white/10 text-white whitespace-nowrap">All</button>
                            <button className="px-2 py-1 rounded hover:bg-white/5 text-gemini-500 whitespace-nowrap">Coding</button>
                            <button className="px-2 py-1 rounded hover:bg-white/5 text-gemini-500 whitespace-nowrap">Creative</button>
                        </div>

                        {prompts.map((prompt) => (
                            <div key={prompt.id} className="p-3 bg-gemini-950/50 border border-white/5 rounded-xl hover:border-accent-secondary/30 hover:shadow-lg transition-all group cursor-pointer relative overflow-hidden">
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
                )}

                {/* --- TOOLS TAB --- */}
                {activeTab === 'tools' && (
                    <div className="p-4 space-y-4 animate-in fade-in slide-in-from-right-2 duration-300">
                        {/* Onboarding Banner */}
                        <div className="p-3 rounded-xl bg-gradient-to-br from-accent-primary/10 to-transparent border border-accent-primary/20 mb-4 text-center">
                            <div className="mx-auto w-8 h-8 rounded-full bg-accent-primary/20 flex items-center justify-center mb-2">
                                <Cpu size={16} className="text-accent-primary" />
                            </div>
                            <h4 className="text-xs font-bold text-white mb-1">Supercharge with MCP</h4>
                            <p className="text-[10px] text-gemini-400 leading-relaxed px-1">
                                Connect external tools and data sources to your agent context via Model Context Protocol.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h4 className="text-[10px] font-semibold text-gemini-500 uppercase tracking-wider px-1">Installed Tools</h4>

                            {availableTools.map((tool) => {
                                const isActive = activeTools.includes(tool.id);
                                return (
                                    <div key={tool.id} className={`p-3 rounded-xl border transition-all ${isActive ? 'bg-accent-primary/5 border-accent-primary/30' : 'bg-gemini-950/30 border-white/5 hover:border-white/10'}`}>
                                        <div className="flex justify-between items-start mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`p-2 rounded-lg ${isActive ? 'bg-accent-primary/20 text-accent-primary' : 'bg-white/5 text-gemini-500'}`}>
                                                    <tool.icon size={16} />
                                                </div>
                                                <div>
                                                    <h4 className="text-sm font-medium text-white">{tool.name}</h4>
                                                    <div className="text-[10px] text-gemini-500 flex items-center gap-1">
                                                        <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-emerald-500' : 'bg-gemini-700'}`}></span>
                                                        {isActive ? 'Active' : 'Disabled'}
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Toggle Switch */}
                                            <button
                                                onClick={() => onToggleTool && onToggleTool(tool.id)}
                                                className={`w-8 h-4 rounded-full transition-colors relative ${isActive ? 'bg-accent-primary' : 'bg-gemini-700'}`}
                                            >
                                                <div className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform ${isActive ? 'left-4.5' : 'left-0.5'}`} style={{ left: isActive ? '18px' : '2px' }}></div>
                                            </button>
                                        </div>
                                        <div className="text-[10px] text-gemini-400 pl-11">
                                            {tool.desc || "Standard MCP Interface implementation."}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>

            {/* Inline Creation Modal (Prompts) */}
            {isCreating && (
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gemini-950/95 backdrop-blur-md z-20 p-4 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-white">Create Prompt</h3>
                        <button onClick={() => setIsCreating(false)} className="text-gemini-500 hover:text-white"><X size={14} /></button>
                    </div>
                    {/* ... (Same inputs as before) ... */}
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
                        onClick={handleCreatePrompt}
                        className="w-full py-2 rounded-lg bg-accent-secondary text-white font-medium text-sm hover:bg-accent-secondary/90 transition-colors shadow-lg shadow-accent-secondary/20"
                    >
                        Save to Library
                    </button>
                </div>
            )}

            {/* Inline Creation Modal (Tools) */}
            {isAddingTool && (
                <div className="absolute inset-x-0 bottom-0 top-0 bg-gemini-950/95 backdrop-blur-md z-20 p-4 flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-200">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-sm font-medium text-white">Add Custom Tool</h3>
                        <button onClick={() => setIsAddingTool(false)} className="text-gemini-500 hover:text-white"><X size={14} /></button>
                    </div>

                    <div className="flex-1 space-y-4">
                        <div>
                            <label className="text-xs text-gemini-500 mb-1 block">Tool Name</label>
                            <input
                                type="text"
                                placeholder="e.g. My Custom Search"
                                className="w-full bg-gemini-900 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-accent-primary"
                                value={customToolName}
                                onChange={(e) => setCustomToolName(e.target.value)}
                                autoFocus
                            />
                        </div>
                        <div className="p-3 bg-white/5 rounded-lg border border-dashed border-white/10 text-center">
                            <p className="text-xs text-gemini-500">In a real app, this would connect to an MCP server URL.</p>
                        </div>
                    </div>

                    <button
                        onClick={handleAddCustomTool}
                        className="w-full py-2 rounded-lg bg-accent-primary text-black font-medium text-sm hover:bg-accent-primary/90 transition-colors shadow-lg shadow-accent-primary/20"
                    >
                        Connect Tool
                    </button>
                </div>
            )}
        </div>
    );
};

export default PromptLibrary;
