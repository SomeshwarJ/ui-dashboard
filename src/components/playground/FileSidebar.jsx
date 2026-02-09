import React, { useRef, useState, useMemo } from 'react';
import {
    FileText,
    UploadCloud,
    X,
    Paperclip,
    Trash2,
    CheckSquare,
    Square,
    Search,
    Image as ImageIcon,
    Code,
    FileCode,
    FileType,
    Loader2,
    Filter,
    Check
} from 'lucide-react';

const FileSidebar = ({
    activeFiles,
    onUpload,
    onDeleteFile,
    selectedFiles, // List of selected file IDs
    onToggleFile // Handler for toggling selection
}) => {
    const fileInputRef = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isDragOver, setIsDragOver] = useState(false);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            onUpload(e.target.files);
        }
    };

    // --- Drag & Drop Handlers ---
    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            onUpload(e.dataTransfer.files);
        }
    };

    // --- Helpers ---
    const getFileIcon = (fileName) => {
        const ext = fileName.split('.').pop().toLowerCase();
        if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'].includes(ext)) return <ImageIcon size={14} className="text-purple-400" />;
        if (['js', 'jsx', 'ts', 'tsx', 'py', 'html', 'css', 'json'].includes(ext)) return <Code size={14} className="text-blue-400" />;
        if (['md', 'txt', 'csv'].includes(ext)) return <FileText size={14} className="text-gray-400" />;
        return <FileType size={14} className="text-gemini-500" />;
    };

    const filteredFiles = useMemo(() => {
        return activeFiles.filter(f => f.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }, [activeFiles, searchTerm]);

    const selectAll = () => {
        // Find all currently unselected visible files
        const unselectedIds = filteredFiles
            .filter(f => !selectedFiles.includes(f.id))
            .map(f => f.id);

        // We can't bulk toggle with the current prop, so we might need a loop or a new prop.
        // Assuming onToggleFile just takes an ID. 
        // NOTE: Ideally we'd have a bulk select prop, but let's just toggle individually for now or just skip if not supported.
        // Actually, let's just implement a simple "toggle all" behavior if possible, or visually select all.
        // Since we don't have a bulk handler, we'll iterate. Use sparingly in real apps.
        unselectedIds.forEach(id => onToggleFile(id));
    };

    const clearSelection = () => {
        // Find all currently selected visible files
        const selectedIds = filteredFiles
            .filter(f => selectedFiles.includes(f.id))
            .map(f => f.id);
        selectedIds.forEach(id => onToggleFile(id));
    };

    return (
        <div
            className={`w-72 h-full border-r border-white/5 bg-gemini-900/30 flex flex-col min-w-0 transition-colors ${isDragOver ? 'bg-accent-primary/10 border-accent-primary/30' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-gemini-950/20 backdrop-blur-md">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-semibold text-gemini-400 uppercase tracking-wider flex items-center gap-2">
                        <Paperclip size={12} /> Context Files
                    </h3>
                    <span className="text-[10px] bg-white/5 text-gemini-500 px-1.5 py-0.5 rounded-md font-mono">{activeFiles.length}</span>
                </div>

                {/* Search Bar */}
                <div className="relative mb-3 group">
                    <Search size={12} className="absolute left-2.5 top-2.5 text-gemini-500 group-focus-within:text-white transition-colors" />
                    <input
                        type="text"
                        placeholder="Filter files..."
                        className="w-full bg-gemini-900/50 border border-white/5 rounded-lg pl-8 pr-3 py-2 text-xs text-white placeholder:text-gemini-600 focus:outline-none focus:border-accent-primary/50 transition-all"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-2 rounded-lg bg-accent-primary hover:bg-accent-primary/90 text-black text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-accent-primary/20"
                >
                    <UploadCloud size={14} />
                    Upload Files
                </button>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    multiple
                    onChange={handleFileChange}
                />
            </div>

            {/* Bulk Actions (Optional) */}
            {activeFiles.length > 0 && (
                <div className="px-4 py-2 border-b border-white/5 flex items-center justify-between gap-2 text-[10px]">
                    <button
                        onClick={selectAll}
                        className="text-gemini-500 hover:text-accent-primary transition-colors flex items-center gap-1"
                    >
                        <CheckSquare size={10} /> Select All
                    </button>
                    <button
                        onClick={clearSelection}
                        className="text-gemini-500 hover:text-white transition-colors flex items-center gap-1"
                    >
                        <Square size={10} /> Clear
                    </button>
                </div>
            )}

            {/* File List */}
            <div className="flex-1 overflow-y-auto p-2 space-y-1 custom-scrollbar">
                {activeFiles.length === 0 ? (
                    <div className={`h-full flex flex-col items-center justify-center text-gemini-600 gap-4 opacity-60 transition-all ${isDragOver ? 'scale-105 opacity-100' : ''}`}>
                        <div className={`p-4 rounded-full ${isDragOver ? 'bg-accent-primary/20 text-accent-primary' : 'bg-white/5'}`}>
                            <UploadCloud size={24} />
                        </div>
                        <div className="text-center">
                            <p className="text-xs font-medium text-gemini-400 mb-1">No files uploaded</p>
                            <p className="text-[10px] max-w-[150px]">Drag & drop files here or click upload to add context.</p>
                        </div>
                    </div>
                ) : filteredFiles.length === 0 ? (
                    <div className="text-center py-8 opacity-50">
                        <p className="text-xs text-gemini-500">No matching files found.</p>
                    </div>
                ) : (
                    filteredFiles.map((file) => {
                        const isSelected = selectedFiles.includes(file.id);
                        const isUploading = file.size === 'Uploading...';

                        return (
                            <div
                                key={file.id}
                                onClick={() => !isUploading && onToggleFile(file.id)}
                                className={`group flex items-center justify-between p-2.5 rounded-xl transition-all border cursor-pointer relative overflow-hidden ${isSelected
                                    ? 'bg-accent-primary/10 border-accent-primary/30 shadow-md shadow-black/20'
                                    : 'bg-gemini-950/30 border-transparent hover:bg-white/5 hover:border-white/5'
                                    } ${isUploading ? 'opacity-70 cursor-wait' : ''}`}
                            >
                                {/* Selection Indicator Bar */}
                                {isSelected && <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-primary"></div>}

                                <div className="flex items-center gap-3 overflow-hidden flex-1">
                                    {/* Icon Box */}
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? 'bg-gemini-950/50' : 'bg-white/5'}`}>
                                        {isUploading ? <Loader2 size={14} className="animate-spin text-accent-secondary" /> : getFileIcon(file.name)}
                                    </div>

                                    <div className="min-w-0 flex flex-col flex-1">
                                        <h4 className={`text-xs truncate font-medium ${isSelected ? 'text-white' : 'text-gemini-300 group-hover:text-gemini-200'}`} title={file.name}>
                                            {file.name}
                                        </h4>
                                        <span className="text-[10px] text-gemini-600 flex items-center gap-1">
                                            {file.size}
                                            {/* {isSelected && <span className="text-accent-primary">• Selected</span>} */}
                                        </span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1 pl-2">
                                    {/* Checkbox (Visual only, usually) */}
                                    {/* <div className={`text-gemini-600 ${isSelected ? 'text-accent-primary' : 'group-hover:text-gemini-400'}`}>
                                        {isSelected ? <Check size={14} /> : null}
                                     </div> */}

                                    <button
                                        onClick={(e) => { e.stopPropagation(); onDeleteFile(file.id); }}
                                        className="text-gemini-600 hover:text-rose-400 p-1.5 rounded-lg hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100"
                                        title="Remove File"
                                    >
                                        <Trash2 size={12} />
                                    </button>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>

            {/* Footer Stats / Drag Hint */}
            {isDragOver && (
                <div className="absolute inset-0 z-50 bg-accent-primary/20 backdrop-blur-sm border-2 border-dashed border-accent-primary flex items-center justify-center">
                    <div className="bg-gemini-950 p-4 rounded-xl shadow-2xl flex flex-col items-center animate-in zoom-in-50">
                        <UploadCloud size={32} className="text-accent-primary mb-2" />
                        <span className="text-sm font-bold text-white">Drop to Upload</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FileSidebar;
