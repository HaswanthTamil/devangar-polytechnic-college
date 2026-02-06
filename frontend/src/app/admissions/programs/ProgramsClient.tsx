"use client";

import React from 'react';
import ElegantHeader from '@/components/ElegantHeader';
import ElegantFooter from '@/components/ElegantFooter';
import Link from 'next/link';
import { motion } from "framer-motion";
import { Announcement, Program } from '@/lib/types';

interface ProgramsClientProps {
    announcements: Announcement[];
    programs: Program[];
}

export default function ProgramsClient({ announcements, programs }: ProgramsClientProps) {
    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-red-900 selection:text-white">
            <ElegantHeader announcements={announcements} />
            
            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <header className="mb-20 text-center">
                        <span className="text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                            Academic Offerings
                        </span>
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-stone-900 mb-6">
                            Diploma Programs
                        </h1>
                        <p className="text-lg text-stone-500 font-serif max-w-2xl mx-auto leading-relaxed">
                            We offer 3-year full-time diploma courses approved by AICTE and affiliated with DOTE, Chennai.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {programs.filter(p => p.visible !== false).sort((a,b) => (a.position || 0) - (b.position || 0)).map((program, index) => (
                            <motion.div
                                key={program.slug}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-white border border-stone-200 rounded-lg shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group overflow-hidden"
                            >
                                <div className="h-2 bg-stone-100 group-hover:bg-red-700 transition-colors duration-500"></div>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-12 h-12 bg-stone-50 rounded-full flex items-center justify-center text-stone-400 group-hover:bg-red-50 group-hover:text-red-700 transition-colors">
                                            <span className="font-bold text-xs tracking-widest">{program.code.replace('D', '')}</span>
                                        </div>
                                        <div className="text-right">
                                            <span className="block text-2xl font-bold text-stone-900 leading-none">{program.intake}</span>
                                            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest">Seats</span>
                                        </div>
                                    </div>
                                    
                                    <h3 className="text-xl font-playfair font-bold text-stone-900 mb-3 group-hover:text-red-700 transition-colors">
                                        {program.name}
                                    </h3>
                                    
                                    <p className="text-stone-500 text-sm leading-relaxed mb-8 flex-grow">
                                        {program.description}
                                    </p>

                                    <Link 
                                        href={`/departments/${program.slug}`}
                                        className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-900 border-b-2 border-transparent hover:border-red-700 pb-1 hover:text-red-700 transition-colors self-start"
                                    >
                                        Program Details
                                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-20 p-8 md:p-12 bg-stone-900 rounded-lg text-white text-center">
                        <h2 className="text-2xl md:text-3xl font-playfair font-bold mb-4">Ready to Apply?</h2>
                        <p className="text-stone-400 mb-8 max-w-2xl mx-auto">
                            Join our vibrant community of learners and innovators. Admissions are open for the upcoming academic year.
                        </p>
                        <Link 
                            href="/admissions"
                            className="inline-block px-8 py-4 bg-red-700 text-white font-bold tracking-[0.15em] text-xs uppercase hover:bg-red-800 transition-colors rounded shadow-lg shadow-red-900/50"
                        >
                            Admission Guidelines
                        </Link>
                    </div>
                </div>
            </main>

            <ElegantFooter />
        </div>
    );
}
