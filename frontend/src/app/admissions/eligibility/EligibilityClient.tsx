"use client";

import React from 'react';
import ElegantHeader from '@/components/ElegantHeader';
import ElegantFooter from '@/components/ElegantFooter';
import { motion } from "framer-motion";
import { Announcement, EligibilityData } from '@/lib/types';

interface EligibilityClientProps {
    announcements: Announcement[];
    data: EligibilityData;
}

export default function EligibilityClient({ announcements, data }: EligibilityClientProps) {
    const { eligibility, fees, sessions } = data;

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-red-900 selection:text-white">
            <ElegantHeader announcements={announcements} />
            
            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-5xl">
                    <header className="mb-20 text-center">
                        <span className="text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                            Admissions
                        </span>
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-stone-900 mb-6">
                            Eligibility & Fee Structure
                        </h1>
                        <p className="text-lg text-stone-500 font-serif max-w-2xl mx-auto leading-relaxed">
                            Everything you need to know about joining Devangar Polytechnic College.
                        </p>
                    </header>

                    {/* Eligibility Section */}
                    <section className="mb-20">
                        <div className="flex items-center mb-10">
                            <div className="h-px bg-stone-200 flex-grow"></div>
                            <h2 className="mx-6 text-2xl font-playfair font-bold text-stone-900 italic">{eligibility.title}</h2>
                            <div className="h-px bg-stone-200 flex-grow"></div>
                        </div>
                        
                        <div className="bg-white border border-stone-200 p-8 md:p-12 rounded-lg shadow-sm">
                            <p className="text-stone-600 mb-8 leading-relaxed italic border-l-4 border-red-700 pl-6">
                                &quot;{eligibility.description}&quot;
                            </p>
                            <ul className="space-y-4">
                                {eligibility.criteria.map((item, idx) => (
                                    <motion.li 
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex items-start text-stone-700"
                                    >
                                        <span className="w-6 h-6 rounded-full bg-red-50 text-red-700 flex items-center justify-center shrink-0 mr-4 mt-1 border border-red-100">
                                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <span className="text-base leading-relaxed">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* Fees Section */}
                    <section className="mb-20">
                        <div className="flex items-center mb-10">
                            <div className="h-px bg-stone-200 flex-grow"></div>
                            <h2 className="mx-6 text-2xl font-playfair font-bold text-stone-900 italic">{fees.title}</h2>
                            <div className="h-px bg-stone-200 flex-grow"></div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {fees.items.map((fee, idx) => (
                                <motion.div 
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="bg-white border border-stone-200 p-8 rounded-lg flex justify-between items-center group hover:border-red-200 hover:shadow-md transition-all duration-300"
                                >
                                    <div>
                                        <h3 className="font-bold text-stone-900 group-hover:text-red-700 transition-colors uppercase tracking-widest text-xs mb-1">{fee.label}</h3>
                                        {fee.note && <p className="text-[10px] text-stone-400 font-bold uppercase tracking-tighter">{fee.note}</p>}
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xl font-playfair font-bold text-stone-900">{fee.amount}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                        <p className="mt-8 text-center text-xs text-stone-400 italic font-serif">
                            {fees.description}
                        </p>
                    </section>

                    {/* Sessions Section */}
                    <section>
                        <div className="flex items-center mb-10">
                            <div className="h-px bg-stone-200 flex-grow"></div>
                            <h2 className="mx-6 text-2xl font-playfair font-bold text-stone-900 italic">{sessions.title}</h2>
                            <div className="h-px bg-stone-200 flex-grow"></div>
                        </div>

                        <div className="bg-stone-900 text-white rounded-lg overflow-hidden shadow-xl">
                            <div className="p-8 md:p-12">
                                <p className="text-stone-400 mb-10 text-center font-serif text-lg italic">
                                    &quot;{sessions.description}&quot;
                                </p>
                                <div className="space-y-6">
                                    {sessions.details.map((detail, idx) => (
                                        <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between border-b border-stone-800 pb-4 last:border-0 hover:bg-stone-800/30 transition-colors px-4 -mx-4 rounded">
                                            <span className="text-stone-500 uppercase tracking-[0.2em] text-[10px] font-bold mb-2 md:mb-0">{detail.label}</span>
                                            <span className="text-lg font-playfair text-stone-100">{detail.value}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <ElegantFooter />
        </div>
    );
}
