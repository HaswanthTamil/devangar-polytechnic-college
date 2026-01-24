import React from 'react';
import { FileItem } from '@/lib/types';

export default function FileList({ data }: { data: FileItem[] }) {
    if (!data || data.length === 0) return null;

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                <ul className="divide-y divide-gray-100">
                    {data.map((file, idx) => (
                        <li key={idx} className="p-6 flex items-center justify-between hover:bg-blue-50/50 transition-colors group">
                            <div className="flex items-center space-x-4">
                                <div className="flex-shrink-0 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-semibold text-gray-900 text-lg group-hover:text-blue-700 transition-colors">{file.title}</span>
                                    <span className="text-sm text-gray-500 font-medium">Published Year: {file.year}</span>
                                </div>
                            </div>
                            <a
                                href={file.file}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center px-4 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105"
                            >
                                <span>Download</span>
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                </svg>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
