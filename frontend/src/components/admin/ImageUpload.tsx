
'use client';

import React, { useState, useEffect } from 'react';
import { uploadImageAction, listImagesAction } from '../../app/admin/actions';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploadProps {
    value: string;
    onChange: (url: string) => void;
    label: string;
}

export default function ImageUpload({ value, onChange, label }: ImageUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const [showLibrary, setShowLibrary] = useState(false);
    const [library, setLibrary] = useState<string[]>([]);

    useEffect(() => {
        if (showLibrary) {
            listImagesAction().then(setLibrary);
        }
    }, [showLibrary]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        const result = await uploadImageAction(formData);
        if (result.success && result.url) {
            onChange(result.url);
        } else {
            alert(result.message || 'Upload failed');
        }
        setIsUploading(false);
    };

    return (
        <div className="mb-8">
            <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-400 mb-3">{label}</label>

            <div className="flex flex-col md:flex-row gap-6 items-start">
                {/* Preview */}
                <div className="relative group w-full md:w-64 aspect-video bg-stone-100 border border-stone-200 overflow-hidden">
                    {value ? (
                        <img
                            src={value}
                            alt="Preview"
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-stone-300 text-[10px] font-bold uppercase tracking-widest">
                            No Image Selected
                        </div>
                    )}
                    <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Current Image</span>
                    </div>
                </div>

                {/* Controls */}
                <div className="flex-grow space-y-4 w-full">
                    <div className="flex gap-2">
                        <label className={`flex-grow relative cursor-pointer py-3 px-4 text-center border font-bold uppercase tracking-widest text-[10px] transition-all ${isUploading ? 'bg-stone-50 text-stone-400 border-stone-100' : 'bg-white text-stone-900 border-stone-200 hover:border-red-700 hover:text-red-700'
                            }`}>
                            {isUploading ? 'Uploading...' : 'Upload New'}
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={handleFileChange}
                                disabled={isUploading}
                            />
                        </label>
                        <button
                            onClick={() => setShowLibrary(!showLibrary)}
                            className="px-6 py-3 bg-stone-900 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-red-700 transition-colors"
                        >
                            Library
                        </button>
                    </div>

                    <div className="flex flex-col gap-2">
                        <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Path:</span>
                        <input
                            type="text"
                            value={value || ''}
                            onChange={(e) => onChange(e.target.value)}
                            placeholder="/images/example.jpg"
                            className="w-full p-2 bg-stone-50 border border-stone-200 text-stone-600 font-mono text-[10px] outline-none focus:border-red-700 transition-colors"
                        />
                    </div>
                </div>
            </div>

            {/* Library Modalish Overlay */}
            <AnimatePresence>
                {showLibrary && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-6 overflow-hidden"
                    >
                        <div className="p-6 bg-stone-50 border border-stone-200">
                            <div className="flex justify-between items-center mb-6">
                                <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-stone-900">Image Library</h4>
                                <button
                                    onClick={() => setShowLibrary(false)}
                                    className="text-[10px] font-bold uppercase text-stone-400 hover:text-red-700"
                                >
                                    Close
                                </button>
                            </div>

                            {library.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3">
                                    {library.map((url) => (
                                        <button
                                            key={url}
                                            onClick={() => {
                                                onChange(url);
                                                setShowLibrary(false);
                                            }}
                                            className={`aspect-square border-2 transition-all group relative overflow-hidden ${value === url ? 'border-red-700 shadow-lg shadow-red-900/10' : 'border-stone-200 hover:border-stone-400'
                                                }`}
                                        >
                                            <img src={url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt="Library item" />
                                            {value === url && (
                                                <div className="absolute top-1 right-1 w-3 h-3 bg-red-700 rounded-full border-2 border-white"></div>
                                            )}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="py-10 text-center text-[10px] font-bold text-stone-300 uppercase tracking-widest">
                                    No Uploaded Images Yet
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
