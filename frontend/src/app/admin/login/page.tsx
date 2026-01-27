
'use client';

import React, { useState, useTransition } from 'react';
import { loginAction } from '../actions';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await loginAction(formData);
            if (result?.error) {
                setError(result.error);
            } else if (result?.success) { // Added this block
                sessionStorage.setItem('admin_tab_active', 'true');
                router.push('/admin');
            }
        });
    };

    return (
        <div className="min-h-screen bg-stone-900 flex items-center justify-center p-6 font-sans">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md bg-stone-50 p-12 border border-stone-200 shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1.5 bg-red-700"></div>

                <header className="mb-10 text-center">
                    <h1 className="text-3xl font-playfair font-bold text-stone-900 mb-2">Admin Login</h1>
                    <p className="text-xs font-bold uppercase tracking-[0.3em] text-stone-400">Authenticated Access Only</p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3 ml-1">Username</label>
                        <input
                            name="username"
                            type="text"
                            required
                            className="w-full p-4 bg-white border border-stone-200 focus:border-red-700 outline-none transition-colors font-serif"
                        />
                    </div>

                    <div>
                        <label className="block text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-3 ml-1">Password</label>
                        <input
                            name="password"
                            type="password"
                            required
                            className="w-full p-4 bg-white border border-stone-200 focus:border-red-700 outline-none transition-colors font-serif"
                        />
                    </div>

                    {error && (
                        <div className="text-[10px] font-bold uppercase tracking-wide text-red-700 bg-red-50 p-4 border border-red-100 text-center">
                            {error}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isPending}
                        className={`w-full py-5 font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 shadow-xl ${isPending
                            ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
                            : 'bg-stone-900 text-white hover:bg-red-700'
                            }`}
                    >
                        {isPending ? 'Verifying Identity...' : 'Access Dashboard'}
                    </button>
                </form>

                <footer className="mt-12 text-center">
                    <p className="text-[8px] font-bold text-stone-300 uppercase tracking-widest">
                        Devangar Polytechnic College &bull; Academic Management
                    </p>
                </footer>
            </motion.div>
        </div>
    );
}
