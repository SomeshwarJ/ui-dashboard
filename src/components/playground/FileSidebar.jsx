import React, { useRef } from 'react';
import {
    FileText,
    UploadCloud,
    X,
    Paperclip,
    Trash2,
    CheckSquare,
    Square
} from 'lucide-react';

const FileSidebar = ({
    activeFiles,
    onUpload,
    onDeleteFile,
    selectedFiles, // New: List of selected file IDs
    onToggleFile // New: Handler for toggling selection
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(e.target.files);
        }
    };

    return (
        <div className="w-64 h-full border-r border-white/5 bg-gemini-900/30 flex flex-col min-w-0">
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-gemini-950/20">
                <h3 className="text-xs font-semibold text-gemini-400 uppercase tracking-wider mb-2 flex items-center gap-2">
                    <Paperclip size={12} /> Context Files
                </h3>
                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 rounded-lg bg-accent-primary/10 hover:bg-accent-primary/20 border border-accent-primary/20 text-xs font-medium text-accent-primary flex items-center justify-center gap-2 transition-all active:scale-95"
                >
                    <UploadCloud size={14} />
                    Upload New File
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                />
            </div>

            {/* Info */}
            <div className="px-4 py-2 bg-white/5 text-[10px] text-gemini-500 border-b border-white/5 flex justify-between items-center">
                <span>Select files to include in chat context.</span>
            </div>

            {/* File List */}
            <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1 custom-scrollbar">
                {activeFiles && activeFiles.length > 0 ? (
                    activeFiles.map((file) => {
                        const isSelected = selectedFiles.includes(file.id);
                        return (
                            <div
                                key={file.id}
                                onClick={() => onToggleFile(file.id)}
                                className={`group flex items-center justify-between p-2 rounded-lg transition-colors border mb-1 cursor-pointer ${isSelected
                                        ? 'bg-accent-primary/5 border-accent-primary/20'
                                        : 'bg-gemini-950/30 border-transparent hover:bg-white/5 hover:border-white/5'
                                    }`}
                            >
                                <div className="flex items-center gap-3 overflow-hidden">
                                    {/* Checkbox State */}
                                    <div className={`shrink-0 ${isSelected ? 'text-accent-primary' : 'text-gemini-600 group-hover:text-gemini-400'}`}>
                                        {isSelected ? <CheckSquare size={16} /> : <Square size={16} />}
                                    </div>

                                    <div className="min-w-0 flex flex-col">
                                        <h4 className={`text-xs truncate font-medium max-w-[130px] ${isSelected ? 'text-white' : 'text-gemini-300'}`} title={file.name}>
                                            {file.name}
                                        </h4>
                                        <span className="text-[10px] text-gemini-600">{file.size}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={(e) => { e.stopPropagation(); onDeleteFile(file.id); }}
                                    className="text-gemini-600 hover:text-rose-400 p-1 rounded hover:bg-white/5 transition-all opacity-0 group-hover:opacity-100"
                                    title="Remove File"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        );
                    })
                ) : (
                    <div className="h-40 flex flex-col items-center justify-center text-gemini-600 gap-3 opacity-60">
                        <div className="p-3 rounded-full bg-white/5">
                            <UploadCloud size={20} />
                        </div>
                        <span className="text-[10px] text-center max-w-[150px]">Drag & drop files or click upload to add context.</span>
                    </div>
                )}
            </div>

            {/* Footer Stats */}
            <div className="p-3 border-t border-white/5 bg-gemini-950/20 text-[10px] text-gemini-500 flex justify-between items-center">
                <span>{selectedFiles.length} selected</span>
                <span>{activeFiles.length} total</span>
            </div>
        </div>
    );
};

export default FileSidebar;
