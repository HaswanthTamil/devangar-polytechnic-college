'use client';

import React, { useState, useTransition, useEffect } from 'react';
import { rebuildContentAction, listContentFilesAction, logoutAction, changePasswordAction } from './actions';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function AdminPage() {
    const [isPending, startTransition] = useTransition();
    const [status, setStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({
        type: 'idle',
        message: '',
    });
    const [files, setFiles] = useState<string[]>([]);
    const [newPassword, setNewPassword] = useState('');
    const [pwdStatus, setPwdStatus] = useState<{ type: 'idle' | 'success' | 'error'; message: string }>({ type: 'idle', message: '' });

    useEffect(() => {
        listContentFilesAction().then(setFiles);
    }, []);

    const handleRebuild = () => {
        setStatus({ type: 'idle', message: '' });
        startTransition(async () => {
            const result = await rebuildContentAction();
            if (result.success) {
                setStatus({ type: 'success', message: result.message });
            } else {
                setStatus({ type: 'error', message: result.message });
            }
        });
    };

    const handleLogout = async () => {
        await logoutAction();
    };

    const handlePasswordChange = async () => {
        if (!newPassword) return;
        setPwdStatus({ type: 'idle', message: '' });
        const result = await changePasswordAction(newPassword);
        if (result.success) {
            setPwdStatus({ type: 'success', message: result.message });
            setNewPassword('');
        } else {
            setPwdStatus({ type: 'error', message: result.message });
        }
    };

    return (
        <div className="min-h-screen bg-stone-50 text-stone-900 font-sans p-8 md:p-20">
            <div className="max-w-6xl mx-auto">
                <header className="mb-12 border-b border-stone-200 pb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-4xl font-playfair font-bold text-stone-900 mb-2">Admin Dashboard</h1>
                        <p className="text-stone-500 font-serif italic">Devangar Polytechnic College &bull; Content Management</p>
                    </div>
                    <div className="text-right flex items-center gap-6">
                        {/* <span className="text-xs font-bold uppercase tracking-widest text-red-700 bg-red-50 px-3 py-1 border border-red-100 rounded-full">Serverless Mode</span> */}
                        <button
                            onClick={handleLogout}
                            className="text-[10px] font-bold uppercase tracking-widest text-stone-400 hover:text-red-700 transition-colors flex items-center gap-2"
                        >
                            Logout
                            <span>&rarr;</span>
                        </button>
                    </div>
                </header>

                <main className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left: Content Files List */}
                    <div className="lg:col-span-7">
                        <h2 className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400 mb-8 flex items-center gap-4">
                            Editable Content
                            <span className="h-px flex-grow bg-stone-200"></span>
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {files.map((file, idx) => (
                                <Link
                                    key={file}
                                    href={`/admin/edit/${file}`}
                                    className="group"
                                >
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: idx * 0.05 }}
                                        className="bg-white p-6 border border-stone-200 hover:border-red-700 hover:shadow-xl hover:shadow-red-900/5 transition-all duration-300 relative overflow-hidden h-full flex flex-col justify-between"
                                    >
                                        <div className="relative z-10">
                                            <div className="text-[10px] font-bold text-red-700 uppercase tracking-widest mb-1 opacity-0 group-hover:opacity-100 transition-opacity">Edit Data</div>
                                            <h3 className="text-lg font-playfair font-bold text-stone-800">{file.replace('.json', '')}</h3>
                                        </div>
                                        {/* <div className="mt-4 text-[10px] text-stone-400 font-serif italic uppercase flex justify-between items-center group-hover:text-stone-900">
                                            <span>JSON Source</span>
                                            <span className="opacity-0 group-hover:opacity-100 transition-transform group-hover:translate-x-1">&rarr;</span>
                                        </div> */}
                                        <div className="absolute top-0 right-0 w-16 h-16 bg-stone-50 -mr-8 -mt-8 rotate-45 group-hover:bg-red-50 transition-colors"></div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Right: Actions & Status */}
                    <div className="lg:col-span-5 space-y-8">
                        {/* Content Rebuild Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white p-8 border border-stone-200 shadow-sm hover:shadow-md transition-shadow duration-300"
                        >
                            <div className="w-12 h-12 bg-stone-900 rounded-full flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                            </div>
                            <h2 className="text-2xl font-playfair font-bold mb-4">Save all changes</h2>
                            {/* <p className="text-stone-600 text-sm mb-8 leading-relaxed">
                                Synchronize raw content changes, validate against schemas, and generate processed data for the public site.
                            </p> */}

                            <button
                                onClick={handleRebuild}
                                disabled={isPending}
                                className={`w-full py-4 font-bold uppercase tracking-widest text-xs transition-all duration-300 ${isPending
                                    ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                                    : 'bg-red-700 text-white hover:bg-stone-900 shadow-lg shadow-red-900/10'
                                    }`}
                            >
                                {isPending ? 'Processing Pipeline...' : 'Save and redeploy'}
                            </button>

                            <AnimatePresence>
                                {status.type !== 'idle' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className={`mt-6 p-4 text-xs font-bold uppercase tracking-wide border ${status.type === 'success'
                                            ? 'bg-green-50 text-green-700 border-green-100'
                                            : 'bg-red-50 text-red-700 border-red-100'
                                            }`}
                                    >
                                        {status.message}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* Password Change Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 border border-stone-200 shadow-sm transition-shadow duration-300"
                        >
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-stone-400 mb-6">Security Settings</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">New Password</label>
                                    <input
                                        type="password"
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter new password..."
                                        className="w-full p-3 bg-stone-50 border border-stone-200 focus:border-red-700 outline-none transition-colors font-serif text-sm"
                                    />
                                </div>
                                <button
                                    onClick={handlePasswordChange}
                                    className="w-full py-3 bg-stone-100 text-stone-900 font-bold uppercase tracking-widest text-[10px] hover:bg-stone-900 hover:text-white transition-all duration-300"
                                >
                                    Update Password
                                </button>
                                {pwdStatus.type !== 'idle' && (
                                    <div className={`mt-2 p-3 text-[10px] font-bold uppercase tracking-wide border ${pwdStatus.type === 'success' ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-700 border-red-100'
                                        }`}>
                                        {pwdStatus.message}
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Info Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-stone-900 p-8 text-white shadow-xl"
                        >
                            <h3 className="text-xl font-playfair font-bold text-yellow-500 mb-6 uppercase tracking-wider">System Status</h3>
                            <ul className="space-y-4 font-serif text-sm opacity-90">
                                <li className="flex justify-between border-b border-white/10 pb-2">
                                    <span>Content Directory</span>
                                    <span className="text-white/60 font-mono">/content</span>
                                </li>
                                <li className="flex justify-between border-b border-white/10 pb-2">
                                    <span>Validation Engine</span>
                                    <span className="text-white/60">Ajv 8.17</span>
                                </li>
                                <li className="flex justify-between border-b border-white/10 pb-2">
                                    <span>Processed At</span>
                                    <span className="text-white/60">IST (+05:30)</span>
                                </li>
                            </ul>
                        </motion.div>
                    </div>
                </main>

                <footer className="mt-20 pt-8 border-t border-stone-200 text-center">
                    <p className="text-[10px] font-bold text-stone-400 uppercase tracking-[0.3em]">
                        &copy; 2026 Devangar Polytechnic College &bull; Academic Excellence Since 2010
                    </p>
                </footer>
            </div>
        </div>
    );
}
