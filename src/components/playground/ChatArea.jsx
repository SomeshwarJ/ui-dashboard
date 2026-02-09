import React, { useState, useRef, useEffect } from 'react';
import {
    Bot,
    Database,
    Upload,
    Settings,
    ChevronDown,
    Split,
    Save,
    Terminal,
    Check,
    Search,
    Plus,
    Trash2,
    Sparkles,
    Send,
    Zap,
    Globe,
    Sliders,
    Paperclip,
    FlaskConical,
    Clock // Added for experiment selector
} from 'lucide-react';
import ModelConfigPanel from './ModelConfigPanel';

const MODELS = [
    { id: 'gemini-1.5-pro', name: 'Gemini 1.5 Pro', type: 'Multimodal', context: '1M', speed: 'Fast' },
    { id: 'gpt-4o', name: 'GPT-4o', type: 'General', context: '128k', speed: 'Fast' },
    { id: 'claude-3-5-sonnet', name: 'Claude 3.5 Sonnet', type: 'Reasoning', context: '200k', speed: 'Med' },
    { id: 'llama-3-70b', name: 'Llama 3 (70B)', type: 'Open Source', context: '8k', speed: 'Ultra Fast' },
];

const INITIAL_MCP_TOOLS = [
    { id: 'github', name: 'GitHub Copilot', icon: Terminal, active: false },
    { id: 'web', name: 'Web Search', icon: Globe, active: false },
    { id: 'fs', name: 'FileSystem', icon: Database, active: false },
];

const ChatArea = ({
    activeModel,
    onModelChange,
    messages,
    onSendMessage,
    onSaveConversation,
    activeTools,
    onToggleTool,
    onOpenPromptLibrary,
    onOpenComparison,
    config,
    onConfigChange,
    onUploadClick,
    activeFilesCount = 0,
    // Experiment Selection Props
    experiments,
    activeExperimentId,
    onSelectExperiment,
    onNewExperiment
}) => {
    const [input, setInput] = useState('');
    const [toolDropdownOpen, setToolDropdownOpen] = useState(false);
    const [customTools, setCustomTools] = useState(INITIAL_MCP_TOOLS);
    const [newToolName, setNewToolName] = useState('');
    const [isConfigOpen, setIsConfigOpen] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSend = () => {
        if (!input.trim()) return;
        onSendMessage(input);
        setInput('');
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleAddTool = () => {
        if (!newToolName.trim()) return;
        const newTool = {
            id: newToolName.toLowerCase().replace(/\s+/g, '-'),
            name: newToolName,
            icon: Zap,
            active: true
        };
        setCustomTools(prev => [...prev, newTool]);
        onToggleTool(newTool.id);
        setNewToolName('');
    };

    // --- Components ---

    const ExperimentSelector = () => {
        const activeExp = experiments.find(e => e.id === activeExperimentId);

        return (
            <div className="relative group z-20">
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm text-white max-w-[200px]">
                    <FlaskConical size={16} className="text-accent-secondary" />
                    <span className="truncate">{activeExp?.name || 'Select Experiment'}</span>
                    <ChevronDown size={14} className="text-gemini-500 shrink-0" />
                </button>

                {/* Dropdown */}
                <div className="absolute top-full left-0 mt-2 w-72 bg-gemini-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden">
                    <div className="p-2 border-b border-white/5">
                        <button
                            onClick={onNewExperiment}
                            className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 text-xs font-medium transition-colors"
                        >
                            <Plus size={14} /> New Experiment
                        </button>
                    </div>
                    <div className="max-h-60 overflow-y-auto custom-scrollbar p-1">
                        {experiments.map(exp => (
                            <button
                                key={exp.id}
                                onClick={() => onSelectExperiment(exp.id)}
                                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left hover:bg-white/5 transition-colors ${activeExperimentId === exp.id ? 'bg-white/5' : ''}`}
                            >
                                <FlaskConical size={14} className={activeExperimentId === exp.id ? 'text-accent-secondary' : 'text-gemini-600'} />
                                <div className="flex-1 min-w-0">
                                    <div className={`text-sm truncate ${activeExperimentId === exp.id ? 'text-white' : 'text-gemini-300'}`}>{exp.name}</div>
                                    <div className="text-[10px] text-gemini-600 flex items-center gap-1">
                                        <Clock size={10} /> {exp.lastActive}
                                    </div>
                                </div>
                                {activeExperimentId === exp.id && <Check size={12} className="text-accent-secondary" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const ModelSelector = ({ selected, onChange, label }) => (
        <div className="relative group z-20">
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-all text-sm text-white">
                <Bot size={16} className="text-accent-primary" />
                <span>{MODELS.find(m => m.id === selected)?.name || 'Select Model'}</span>
                <ChevronDown size={14} className="text-gemini-500" />
            </button>
            {/* Dropdown */}
            <div className="absolute top-full left-0 mt-2 w-64 bg-gemini-900 border border-white/10 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all overflow-hidden">
                <div className="p-2">
                    <div className="text-[10px] font-semibold text-gemini-500 uppercase tracking-wider px-2 py-1 mb-1">{label}</div>
                    {MODELS.map(model => (
                        <button
                            key={model.id}
                            onClick={() => onChange(model.id)}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-left hover:bg-white/5 ${selected === model.id ? 'bg-accent-primary/10 text-accent-primary' : 'text-gemini-300'}`}
                        >
                            <span>{model.name}</span>
                            {selected === model.id && <Check size={12} />}
                        </button>
                    ))}
                </div>
                <div className="bg-gemini-950 p-2 border-t border-white/5">
                    <button
                        onClick={onOpenComparison}
                        className="w-full py-1.5 rounded text-xs text-gemini-400 hover:text-white hover:bg-white/5 transition-colors flex items-center justify-center gap-2"
                    >
                        <Split size={12} /> Compare All Models
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="flex-1 flex flex-col h-full relative">
            {/* Header */}
            <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 bg-gemini-950/50 backdrop-blur-sm z-10 relative">
                <div className="flex items-center gap-4">
                    {/* Experiment Selector (Top Left) */}
                    <ExperimentSelector />

                    <div className="h-6 w-px bg-white/10"></div>

                    <ModelSelector selected={activeModel} onChange={onModelChange} label="Model" />

                    {/* Config Quick View */}
                    <div className="hidden lg:flex items-center gap-3 text-xs text-gemini-500 font-mono ml-2">
                        <span title="Temperature">T: {config.temperature}</span>
                        <span className="w-1 h-1 rounded-full bg-gemini-700"></span>
                        <span title="Max Tokens">Len: {config.maxTokens}</span>
                        {activeFilesCount > 0 && (
                            <>
                                <span className="w-1 h-1 rounded-full bg-gemini-700"></span>
                                <span title="Context Files" className="flex items-center gap-1 text-accent-secondary">
                                    <Paperclip size={10} /> {activeFilesCount}
                                </span>
                            </>
                        )}
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsConfigOpen(!isConfigOpen)}
                        className={`p-2 rounded-lg transition-colors ${isConfigOpen ? 'bg-accent-primary/20 text-accent-primary' : 'hover:bg-white/5 text-gemini-500 hover:text-white'}`}
                        title="Model Settings"
                    >
                        <Sliders size={16} />
                    </button>
                    <button
                        onClick={onSaveConversation}
                        className="p-2 hover:bg-white/5 rounded-lg text-gemini-500 hover:text-white transition-colors"
                        title="Save Experiment"
                    >
                        <Save size={16} />
                    </button>
                </div>

                {/* Config Panel Overlay */}
                <ModelConfigPanel
                    isOpen={isConfigOpen}
                    onClose={() => setIsConfigOpen(false)}
                    config={config}
                    onConfigChange={onConfigChange}
                />
            </div>

            {/* Chat Content */}
            <div className="flex-1 overflow-hidden relative flex flex-col">
                <div className="flex-1 overflow-y-auto px-6 py-8 custom-scrollbar space-y-6">
                    {messages.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full text-center opacity-40">
                            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-accent-primary/20 to-accent-secondary/20 flex items-center justify-center mb-4">
                                <Sparkles size={32} className="text-white" />
                            </div>
                            <h3 className="text-lg font-medium text-white mb-2">Start Experimenting</h3>
                            <p className="text-sm text-gemini-400 max-w-xs mb-4">
                                Select an experiment or start fresh.
                            </p>
                            <div className="flex gap-2 text-xs text-gemini-600 bg-white/5 px-3 py-1.5 rounded-full font-mono">
                                {config.temperature > 1 ? 'Creative Mode' : 'Precise Mode'} • {config.maxTokens} tokens
                            </div>
                        </div>
                    ) : (
                        messages.map((msg, idx) => (
                            <div key={idx} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role !== 'user' && (
                                    <div className="w-8 h-8 rounded-lg bg-accent-primary/20 flex items-center justify-center shrink-0">
                                        <Bot size={16} className="text-accent-primary" />
                                    </div>
                                )}
                                <div className={`max-w-[80%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user'
                                        ? 'bg-white/5 text-white rounded-tr-sm'
                                        : 'bg-transparent border border-white/5 text-gemini-100 rounded-tl-sm'
                                    }`}>
                                    <div className="whitespace-pre-wrap">{msg.content}</div>
                                    {msg.meta && <div className="mt-2 pt-2 border-t border-white/5 text-[10px] text-gemini-500 flex gap-2">
                                        <span>Latency: {msg.meta.latency}</span>
                                        <span>Tokens: {msg.meta.tokens}</span>
                                    </div>}
                                </div>
                            </div>
                        ))
                    )}
                    <div ref={bottomRef} />
                </div>
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2">
                <div className="bg-gemini-900/50 border border-white/10 rounded-2xl shadow-lg focus-within:ring-1 focus-within:ring-accent-primary/50 transition-all z-30">
                    {/* Tools & Attachments Bar */}
                    <div className="px-3 pt-2 flex items-center gap-2 border-b border-white/5 pb-2 mb-1">
                        <button
                            onClick={onUploadClick}
                            className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-white/5 text-xs text-gemini-400 hover:text-white transition-colors"
                        >
                            <Upload size={14} />
                            <span className="hidden sm:inline">Upload Context</span>
                        </button>
                        <div className="h-4 w-px bg-white/10 mx-1"></div>

                        {/* Active Tools List */}
                        <div className="flex items-center gap-1">
                            {customTools.map(tool => (
                                <button
                                    key={tool.id}
                                    onClick={() => onToggleTool(tool.id)}
                                    className={`p-1.5 rounded-md transition-all flex items-center gap-1.5 ${activeTools.includes(tool.id)
                                            ? 'bg-accent-primary/20 text-accent-primary'
                                            : 'text-gemini-600 hover:bg-white/5 hover:text-white'
                                        }`}
                                    title={tool.name}
                                >
                                    <tool.icon size={14} />
                                    {activeTools.includes(tool.id) && <span className="text-[10px] font-medium">{tool.name}</span>}
                                </button>
                            ))}

                            {/* Add New Tool Popover */}
                            <div className="relative ml-2">
                                <button
                                    onClick={() => setToolDropdownOpen(!toolDropdownOpen)}
                                    className="p-1 rounded bg-white/5 hover:bg-white/10 text-gemini-500 hover:text-white transition-colors"
                                >
                                    <Plus size={12} />
                                </button>

                                {toolDropdownOpen && (
                                    <div className="absolute bottom-full mb-2 left-0 w-48 bg-gemini-900 border border-white/10 rounded-lg shadow-xl p-2 z-50">
                                        <div className="text-[10px] uppercase font-bold text-gemini-600 mb-2">Add Custom Tool</div>
                                        <div className="flex gap-1">
                                            <input
                                                type="text"
                                                placeholder="Tool Name..."
                                                className="flex-1 bg-gemini-950 border border-white/10 rounded text-xs px-2 py-1 text-white focus:outline-none"
                                                value={newToolName}
                                                onChange={(e) => setNewToolName(e.target.value)}
                                            />
                                            <button
                                                onClick={handleAddTool}
                                                className="p-1 bg-accent-primary text-black rounded hover:bg-accent-primary/90"
                                            >
                                                <Plus size={12} />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <textarea
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`Experimenting with ${MODELS.find(m => m.id === activeModel)?.name}...`}
                        className="w-full bg-transparent border-none text-white px-4 py-2 min-h-[50px] max-h-[200px] resize-none focus:ring-0 placeholder:text-gemini-600 text-sm leading-relaxed custom-scrollbar"
                    />

                    <div className="px-3 pb-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={onOpenPromptLibrary}
                                className="p-2 rounded-lg hover:bg-white/5 text-gemini-500 hover:text-white transition-colors"
                                title="Open Prompt Library"
                            >
                                <Database size={16} />
                            </button>
                        </div>

                        <div className="flex items-center gap-4">
                            <span className="text-[10px] text-gemini-600 font-mono">{input.length} chars</span>
                            <button
                                onClick={handleSend}
                                disabled={!input.trim()}
                                className="w-8 h-8 rounded-lg bg-white text-black flex items-center justify-center hover:bg-gemini-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-white/10"
                            >
                                <Send size={14} className="ml-0.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatArea;
