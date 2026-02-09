import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Dashboard/Sidebar';
import ChatArea from '../components/playground/ChatArea';
import FileSidebar from '../components/playground/FileSidebar';
import PromptLibrary from '../components/playground/PromptLibrary';
import ModelComparisonModal from '../components/playground/ModelComparisonModal';

// Mock Data Generators
const generateId = () => Math.random().toString(36).substr(2, 9);

const INITIAL_PROMPTS = [
    { id: '1', title: 'React Expert', tag: 'Dev', desc: 'Act as a Senior React Engineer. Focus on performance patterns.' },
    { id: '2', title: 'Legal Auditor', tag: 'Legal', desc: 'Analyze the uploaded contract for loopholes and risk factors.' },
];

const INITIAL_EXPERIMENTS = [
    {
        id: 'default',
        name: 'Default Research',
        lastActive: 'Now',
        config: { temperature: 0.7, maxTokens: 4096, topP: 1, systemPrompt: '' },
        messages: [],
        files: [],
        selectedFileIds: [] // Track selection per experiment
    },
    {
        id: 'exp-1',
        name: 'Code Refactor Test',
        lastActive: '2h ago',
        config: { temperature: 0.1, maxTokens: 8192, topP: 0.9, systemPrompt: 'You are a strict code reviewer.' },
        messages: [],
        files: [
            { id: 'f1', name: 'App.tsx', size: '12kb' }
        ],
        selectedFileIds: ['f1']
    },
];

const Playground = ({ onNavigate }) => {
    // --- State Management ---
    const [experiments, setExperiments] = useState(INITIAL_EXPERIMENTS);
    const [activeExperimentId, setActiveExperimentId] = useState('default');

    // Derived Active Data
    const activeExperiment = experiments.find(e => e.id === activeExperimentId) || experiments[0];

    const [prompts, setPrompts] = useState(INITIAL_PROMPTS);
    const [activeModel, setActiveModel] = useState('gemini-1.5-pro');
    const [activeTools, setActiveTools] = useState([]);

    // UI State
    const [isPromptLibraryOpen, setIsPromptLibraryOpen] = useState(false);
    const [isComparisonOpen, setIsComparisonOpen] = useState(false);

    // --- Handlers ---

    const updateActiveExperiment = (updates) => {
        setExperiments(prev => prev.map(exp =>
            exp.id === activeExperimentId ? { ...exp, ...updates } : exp
        ));
    };

    // File Handlers
    const handleUpload = (uploadedFiles) => {
        const newFiles = Array.from(uploadedFiles).map(f => ({
            id: generateId(),
            name: f.name,
            size: 'Uploading...'
        }));

        // Optimistic update
        updateActiveExperiment({
            files: [...(activeExperiment.files || []), ...newFiles],
            selectedFileIds: [...(activeExperiment.selectedFileIds || []), ...newFiles.map(f => f.id)] // Auto-select new uploads
        });

        // Simulate upload finish
        setTimeout(() => {
            setExperiments(prev => prev.map(exp => {
                if (exp.id === activeExperimentId) {
                    return {
                        ...exp,
                        files: exp.files.map(f => f.size === 'Uploading...' ? { ...f, size: 'Ready' } : f)
                    };
                }
                return exp;
            }));
        }, 800);
    };

    const handleDeleteFile = (fileId) => {
        updateActiveExperiment({
            files: activeExperiment.files.filter(f => f.id !== fileId),
            selectedFileIds: activeExperiment.selectedFileIds.filter(id => id !== fileId)
        });
    };

    const handleToggleFileSelection = (fileId) => {
        const currentSelection = activeExperiment.selectedFileIds || [];
        const newSelection = currentSelection.includes(fileId)
            ? currentSelection.filter(id => id !== fileId)
            : [...currentSelection, fileId];

        updateActiveExperiment({ selectedFileIds: newSelection });
    };

    // Config Handlers
    const handleConfigChange = (newConfig) => {
        updateActiveExperiment({ config: newConfig });
    };

    // Chat Handlers
    const handleSendMessage = (text) => {
        // 1. Add User Message
        const userMsg = { role: 'user', content: text };
        const updatedMessages = [...activeExperiment.messages, userMsg];
        updateActiveExperiment({ messages: updatedMessages, lastActive: 'Now' });

        // 2. Simulate Bot Response
        const thinkingTime = Math.random() * 800 + 400;
        setTimeout(() => {
            const selectedCount = activeExperiment.selectedFileIds?.length || 0;
            const fileContext = selectedCount > 0
                ? `[Read ${selectedCount} active files]`
                : '[No files selected]';

            const responseText = `[${activeModel}] ${fileContext} \nResponse to: "${text}"...`;

            const botMsg = {
                role: 'assistant',
                content: responseText,
                meta: { latency: `${Math.floor(thinkingTime)}ms`, tokens: Math.floor(text.length * 1.5) }
            };

            updateActiveExperiment({ messages: [...updatedMessages, botMsg] });
        }, thinkingTime);
    };

    // Experiment Handlers
    const handleNewExperiment = () => {
        const newExp = {
            id: generateId(),
            name: `New Experiment ${experiments.length + 1}`,
            lastActive: 'Just now',
            config: { temperature: 0.7, maxTokens: 2048, topP: 1, systemPrompt: '' },
            messages: [],
            files: [],
            selectedFileIds: []
        };
        setExperiments(prev => [newExp, ...prev]);
        setActiveExperimentId(newExp.id);
    };

    const handleSaveExperiment = () => {
        alert(`Experiment "${activeExperiment.name}" saved successfully!`);
    };

    return (
        <div className="flex h-screen bg-gemini-950 font-sans text-gemini-100 overflow-hidden selection:bg-accent-primary/30">
            <Sidebar activePage="playground" onNavigate={onNavigate} />

            <div className="flex-1 flex flex-col min-w-0">
                <div className="flex-1 flex overflow-hidden">
                    {/* 1. File Sidebar (Dedicated) */}
                    <FileSidebar
                        activeFiles={activeExperiment.files || []}
                        selectedFiles={activeExperiment.selectedFileIds || []} // Pass selection state
                        onUpload={handleUpload}
                        onDeleteFile={handleDeleteFile}
                        onToggleFile={handleToggleFileSelection} // Pass toggle handler
                    />

                    {/* 2. Chat Area */}
                    <ChatArea
                        activeModel={activeModel}
                        onModelChange={setActiveModel}
                        messages={activeExperiment.messages}
                        config={activeExperiment.config}
                        onConfigChange={handleConfigChange}
                        onSendMessage={handleSendMessage}
                        onSaveConversation={handleSaveExperiment}
                        activeTools={activeTools}
                        onToggleTool={(id) => setActiveTools(prev => prev.includes(id) ? prev.filter(t => t !== id) : [...prev, id])}
                        onOpenPromptLibrary={() => setIsPromptLibraryOpen(true)}
                        onOpenComparison={() => setIsComparisonOpen(true)}
                        onUploadClick={() => document.querySelector('input[type="file"]')?.click()}
                        activeFilesCount={activeExperiment.selectedFileIds?.length || 0} // Show SELECTED count in header

                        // New Props for Experiment Selector
                        experiments={experiments}
                        activeExperimentId={activeExperimentId}
                        onSelectExperiment={setActiveExperimentId}
                        onNewExperiment={handleNewExperiment}
                    />

                    {/* 3. Prompt Library */}
                    <PromptLibrary
                        prompts={prompts}
                        onCreatePrompt={(p) => setPrompts(prev => [...prev, { id: generateId(), ...p }])}
                        onSelectPrompt={(p) => setIsPromptLibraryOpen(false)}
                        isOpen={isPromptLibraryOpen}
                        onToggle={() => setIsPromptLibraryOpen(!isPromptLibraryOpen)}
                    />
                </div>
            </div>

            {/* Global Modals */}
            <ModelComparisonModal
                isOpen={isComparisonOpen}
                onClose={() => setIsComparisonOpen(false)}
                onSelectModel={setActiveModel}
            />
        </div>
    );
};

export default Playground;
