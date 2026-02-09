import React from 'react';
import {
    X,
    CheckCircle2,
    DollarSign,
    Zap,
    Cpu,
    BarChart3,
    Globe
} from 'lucide-react';

const MODELS_DATA = [
    {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'Google',
        type: 'Multimodal',
        context: '1M Tokens',
        inputPrice: '$3.50',
        outputPrice: '$10.50',
        latency: 'Fast (0.5s)',
        reasoning: 95,
        coding: 92
    },
    {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'OpenAI',
        type: 'General',
        context: '128k Tokens',
        inputPrice: '$5.00',
        outputPrice: '$15.00',
        latency: 'Fast (0.4s)',
        reasoning: 96,
        coding: 94
    },
    {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'Anthropic',
        type: 'Reasoning',
        context: '200k Tokens',
        inputPrice: '$3.00',
        outputPrice: '$15.00',
        latency: 'Med (0.8s)',
        reasoning: 98,
        coding: 95
    },
    {
        id: 'llama-3-70b',
        name: 'Llama 3 (70B)',
        provider: 'Meta (Open Source)',
        type: 'Text',
        context: '8k Tokens',
        inputPrice: '$0.70',
        outputPrice: '$0.90',
        latency: 'Ultra Fast (0.2s)',
        reasoning: 89,
        coding: 85
    },
];

const ModelComparisonModal = ({ isOpen, onClose, onSelectModel }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-10 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-gemini-950 border border-white/10 rounded-2xl shadow-2xl w-full max-w-5xl h-[80vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-white/5 bg-gemini-900/50">
                    <div>
                        <h2 className="text-xl font-semibold text-white">Model Comparison</h2>
                        <p className="text-sm text-gemini-500">Compare pricing, performance, and capabilities across top models.</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/10 text-gemini-400 hover:text-white transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Comparison Table */}
                <div className="flex-1 overflow-auto custom-scrollbar p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {MODELS_DATA.map((model) => (
                            <div key={model.id} className="bg-gemini-900/30 border border-white/5 rounded-xl p-5 hover:border-accent-primary/30 transition-all flex flex-col h-full group relative">
                                {model.id === 'gemini-1.5-pro' && (
                                    <div className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-accent-primary/10 text-accent-primary text-[10px] font-bold uppercase tracking-wider">Recommended</div>
                                )}

                                <div className="mb-4">
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-accent-primary transition-colors">{model.name}</h3>
                                    <div className="flex items-center gap-2 text-xs text-gemini-500">
                                        <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5">{model.provider}</span>
                                        <span>{model.type}</span>
                                    </div>
                                </div>

                                <div className="space-y-4 flex-1">
                                    {/* Specs */}
                                    <div className="grid grid-cols-2 gap-2 text-xs mb-4">
                                        <div className="p-2 rounded bg-white/5">
                                            <span className="block text-gemini-500 mb-0.5">Context</span>
                                            <span className="text-white font-mono">{model.context}</span>
                                        </div>
                                        <div className="p-2 rounded bg-white/5">
                                            <span className="block text-gemini-500 mb-0.5">Latency</span>
                                            <span className="text-white font-mono">{model.latency}</span>
                                        </div>
                                    </div>

                                    {/* Scores */}
                                    <div>
                                        <div className="flex justify-between text-xs text-gemini-400 mb-1">
                                            <span>Reasoning</span>
                                            <span className="text-white">{model.reasoning}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gemini-800 rounded-full overflow-hidden mb-3">
                                            <div className="h-full bg-purple-500 rounded-full" style={{ width: `${model.reasoning}%` }}></div>
                                        </div>

                                        <div className="flex justify-between text-xs text-gemini-400 mb-1">
                                            <span>Coding</span>
                                            <span className="text-white">{model.coding}%</span>
                                        </div>
                                        <div className="h-1.5 bg-gemini-800 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 rounded-full" style={{ width: `${model.coding}%` }}></div>
                                        </div>
                                    </div>

                                    {/* Pricing */}
                                    <div className="mt-4 pt-4 border-t border-white/5">
                                        <div className="text-[10px] uppercase text-gemini-600 font-bold tracking-wider mb-2">Pricing (per 1M tokens)</div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gemini-400">Input</span>
                                            <span className="text-white font-mono">{model.inputPrice}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-gemini-400">Output</span>
                                            <span className="text-white font-mono">{model.outputPrice}</span>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => { onSelectModel(model.id); onClose(); }}
                                    className="w-full mt-6 py-2.5 rounded-lg bg-white/5 hover:bg-accent-primary hover:text-black text-white font-medium text-sm transition-all border border-white/5 hover:border-transparent flex items-center justify-center gap-2"
                                >
                                    Select Model
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModelComparisonModal;
