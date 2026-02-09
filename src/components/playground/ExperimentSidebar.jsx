import React, { useRef } from 'react';
import {
    FlaskConical,
    Clock,
    Trash2,
    Edit2,
    Plus,
    FileText,
    UploadCloud,
    X,
    Paperclip
} from 'lucide-react';

const ExperimentSidebar = ({
    experiments,
    activeExperimentId,
    onSelect,
    onDelete,
    onNew,
    activeFiles, // New prop
    onUpload, // New prop
    onDeleteFile // New prop
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(e.target.files);
        }
    };

    return (
        <div className="w-64 h-full border-r border-white/5 bg-gemini-900/30 flex flex-col">
            {/* --- Experiments Section --- */}
            <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-white/5 flex items-center justify-between shrink-0">
                    <h3 className="text-xs font-semibold text-gemini-400 uppercase tracking-wider">Experiments</h3>
                    <button
                        onClick={onNew}
                        className="p-1.5 rounded-md bg-accent-primary/10 text-accent-primary hover:bg-accent-primary/20 transition-colors"
                        title="New Experiment"
                    >
                        <Plus size={14} />
                    </button>
                </div>

                {/* Experiment List */}
                <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
                    {experiments.map((exp) => (
                        <div
                            key={exp.id}
                            onClick={() => onSelect(exp.id)}
                            className={`group flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition-all border ${activeExperimentId === exp.id
                                    ? 'bg-accent-primary/5 border-accent-primary/20 shadow-sm'
                                    : 'bg-transparent border-transparent hover:bg-white/5'
                                }`}
                        >
                            <div className={`p-2 rounded-md ${activeExperimentId === exp.id ? 'bg-accent-primary/20 text-accent-primary' : 'bg-white/5 text-gemini-500'}`}>
                                <FlaskConical size={14} />
                            </div>

                            <div className="flex-1 min-w-0">
                                <h4 className={`text-sm font-medium truncate ${activeExperimentId === exp.id ? 'text-white' : 'text-gemini-300'}`}>
                                    {exp.name}
                                </h4>
                                <div className="flex items-center gap-2 text-[10px] text-gemini-600 mt-0.5">
                                    <Clock size={10} />
                                    <span>{exp.lastActive}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- Context Files Section (Bottom Pane) --- */}
            <div className="h-1/3 border-t border-white/5 bg-gemini-950/30 flex flex-col min-h-0">
                <div className="p-3 border-b border-white/5 flex items-center justify-between shrink-0">
                    <h3 className="text-xs font-semibold text-gemini-400 uppercase tracking-wider flex items-center gap-2">
                        <Paperclip size={12} /> Context
                    </h3>
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-[10px] bg-white/5 hover:bg-white/10 text-gemini-300 px-2 py-1 rounded border border-white/5 hover:border-white/10 transition-colors flex items-center gap-1"
                    >
                        <UploadCloud size={10} /> Add
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        multiple
                        onChange={handleFileChange}
                    />
                </div>

                <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
                    {activeFiles && activeFiles.length > 0 ? (
                        activeFiles.map((file) => (
                            <div key={file.id} className="group flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/5">
                                <div className="flex items-center gap-2 overflow-hidden">
                                    <FileText size={14} className="text-gemini-500 group-hover:text-accent-primary transition-colors shrink-0" />
                                    <span className="text-xs text-gemini-300 truncate group-hover:text-white">{file.name}</span>
                                </div>
                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteFile(file.id); }}
                                    className="text-gemini-600 hover:text-rose-400 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <X size={12} />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center text-gemini-600 gap-2 opacity-60">
                            <UploadCloud size={24} />
                            <span className="text-[10px]">No files attached</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ExperimentSidebar;
