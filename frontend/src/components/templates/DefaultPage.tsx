"use client";

import React from 'react';
import { TemplateProps } from '@/lib/types';
import ElegantHeader from '@/components/ElegantHeader';
import ElegantFooter from '@/components/ElegantFooter';
import { motion } from 'framer-motion';

export default function DefaultPage({ page, announcements, banners, gallery, files }: TemplateProps) {
    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-amber-900 selection:text-white">
            <ElegantHeader announcements={announcements} />

            <main className="flex-grow">
                {/* Page Header - Consistent with Elegant Theme */}
                <div className="bg-stone-900 py-24 relative overflow-hidden">
                    <div className="absolute inset-0 bg-black/20 z-0"></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-4">{page.title}</h1>
                        <div className="w-16 h-1 bg-amber-600 mx-auto"></div>
                    </div>
                </div>

                <div className="container mx-auto px-6 py-20 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="prose prose-lg prose-stone prose-headings:font-playfair prose-headings:font-bold hover:prose-a:text-amber-800 prose-img:rounded-sm bg-white p-10 md:p-16 border border-stone-100 shadow-sm"
                    >
                        {page.sections?.map((section, index) => (
                            <div key={index} className="mb-8">
                                <div dangerouslySetInnerHTML={{ __html: section.content }} />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </main>

            <ElegantFooter />
        </div>
    );
}
