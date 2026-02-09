import React from 'react';
import Header from '../components/Dashboard/Header';
import Sidebar from '../components/Dashboard/Sidebar';
import Card from '../components/Dashboard/Card';
import { Plus, Activity, ArrowRight, Sparkles } from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
    return (
        <div className="flex min-h-screen bg-gemini-950 font-sans selection:bg-accent-primary/30 selection:text-white">
            {/* Background Gradient Mesh (Subtle) */}
            <div className="fixed inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-blue-900/40 via-gemini-950 to-gemini-950"></div>

            <Sidebar activePage="dashboard" onNavigate={onNavigate} />

            <main className="flex-1 flex flex-col h-screen overflow-hidden relative z-10">
                <Header />

                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 lg:p-10">

                    {/* Welcome / Hero Section */}
                    <div className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div>
                            <h2 className="text-3xl font-medium text-white mb-2 tracking-tight">
                                Hello, <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 font-semibold">Jane</span>
                            </h2>
                            <p className="text-gemini-300/60 text-sm max-w-xl">
                                Your GenAI studio is active. You have 3 models training and 2 deployments scaling.
                            </p>
                        </div>

                        <button className="px-5 py-2.5 rounded-full bg-white text-black font-medium text-sm hover:bg-gray-100 transition-colors shadow-[0_0_20px_rgba(255,255,255,0.15)] flex items-center gap-2">
                            <Plus size={16} /> New Project
                        </button>
                    </div>

                    {/* Stages Grid - Using CSS Grid for cleaner layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">

                        {/* COLUMN 1: IDEATION */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center px-1 mb-2">
                                <h3 className="text-white font-medium text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]"></span> Ideation
                                </h3>
                                <span className="text-xs text-gemini-600 bg-white/5 px-2 py-0.5 rounded-full">3</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Card
                                    title="Legal Summarizer"
                                    status="Validating Concept"
                                    description="AI-driven summarization for complex legal documents and NDAs."
                                    recommendedStep="Define Schema"
                                    type="ideation"
                                    meta={{ time: '2d ago' }}
                                />
                                <Card
                                    title="Sales Assistant"
                                    status="Drafting Prompts"
                                    description="Generating cold email variations based on prospect persona."
                                    recommendedStep="Test Prompts"
                                    type="ideation"
                                    meta={{ time: '5h ago' }}
                                />
                                {/* Empty State / Add New */}
                                <button className="p-4 rounded-2xl border border-dashed border-white/10 hover:border-emerald-500/30 hover:bg-emerald-500/5 transition-all flex flex-col items-center justify-center gap-2 text-gemini-600 hover:text-emerald-400 group h-32">
                                    <div className="p-2 rounded-full bg-white/5 group-hover:bg-emerald-500/10 transition-colors">
                                        <Plus size={18} />
                                    </div>
                                    <span className="text-xs font-medium">Create New Idea</span>
                                </button>
                            </div>
                        </div>

                        {/* COLUMN 2: BUILD */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center px-1 mb-2">
                                <h3 className="text-white font-medium text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.6)]"></span> Training & Build
                                </h3>
                                <span className="text-xs text-gemini-600 bg-white/5 px-2 py-0.5 rounded-full">2</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Card
                                    title="Marketing Copywriter"
                                    status="Fine-Tuning (Llama 3)"
                                    description="Training on internal blog posts to match brand voice."
                                    recommendedStep="Check Loss"
                                    type="build"
                                    meta={{ time: '45m remaining' }}
                                />
                                <Card
                                    title="Image Auto-Tagger"
                                    status="Evaluating"
                                    description="Running accuracy tests against COCO validation set."
                                    recommendedStep="Review Matrix"
                                    type="build"
                                    meta={{ success: '98% Accuracy' }}
                                />
                            </div>
                        </div>

                        {/* COLUMN 3: DEPLOYED */}
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center px-1 mb-2">
                                <h3 className="text-white font-medium text-sm flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(192,132,252,0.6)]"></span> Production
                                </h3>
                                <span className="text-xs text-gemini-600 bg-white/5 px-2 py-0.5 rounded-full">4</span>
                            </div>

                            <div className="flex flex-col gap-3">
                                {/* Highlights Graph placeholder */}
                                <div className="glass-card rounded-2xl p-4 mb-1 h-32 flex items-center justify-center relative overflow-hidden group">
                                    <div className="absolute inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
                                    <Activity className="text-purple-400 mb-2" size={24} />
                                    <div className="absolute bottom-3 left-4 text-xs text-white z-10 font-mono">
                                        <span className="block text-gemini-500 text-[10px] mb-1">TOTAL REQUESTS</span>
                                        2.4M / day
                                    </div>
                                    {/* Decorative wave */}
                                    <svg viewBox="0 0 100 20" className="absolute bottom-0 w-full h-12 fill-purple-500/10 stroke-purple-500/20">
                                        <path d="M0 10 Q 25 20 50 10 T 100 10 V 20 H 0 Z" />
                                    </svg>
                                </div>

                                <Card
                                    title="Sentiment Analyzer"
                                    status="Scaling: 4 Replicas"
                                    description="Real-time processing of customer support tickets."
                                    recommendedStep="View Logs"
                                    type="deployed"
                                    meta={{ success: '99.99% Uptime' }}
                                />
                            </div>
                        </div>

                    </div>

                    {/* Resources Section - Grid of visual cards */}
                    <div>
                        <div className="flex items-center justify-between mb-6 border-t border-white/5 pt-8">
                            <h2 className="text-lg font-medium text-white flex items-center gap-2">
                                <Sparkles className="text-accent-secondary" size={18} />
                                Latest from Tachyon
                            </h2>
                            <button className="text-sm text-gemini-300 hover:text-white transition-colors">Browse all</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            {[
                                { title: "Gemini 1.5 Pro", tag: "New Model", color: "from-blue-500/20 to-cyan-500/20" },
                                { title: "Prompting Guide", tag: "Tutorial", color: "from-purple-500/20 to-pink-500/20" },
                                { title: "API Documentation", tag: "Reference", color: "from-orange-500/20 to-amber-500/20" },
                                { title: "Fine-tuning Specs", tag: "Guide", color: "from-emerald-500/20 to-teal-500/20" },
                            ].map((item, i) => (
                                <div key={i} className={`rounded-xl p-4 bg-gradient-to-br ${item.color} border border-white/5 hover:border-white/20 transition-all cursor-pointer group`}>
                                    <span className="text-[10px] uppercase font-bold tracking-wider text-white/50 mb-8 block">{item.tag}</span>
                                    <h4 className="text-white font-medium group-hover:translate-x-1 transition-transform">{item.title}</h4>
                                    <div className="mt-4 flex justify-end">
                                        <ArrowRight size={14} className="text-white/40 group-hover:text-white" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
