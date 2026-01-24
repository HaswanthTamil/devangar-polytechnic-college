"use client";

import React from 'react';
import { Announcement } from '@/lib/types';
import AnnouncementsCarousel from './AnnouncementsCarousel';
import { motion } from "framer-motion";

interface ElegantHeaderProps {
    announcements: Announcement[];
}

export default function ElegantHeader({ announcements }: ElegantHeaderProps) {
    return (
        <>
            {/* 1. Top Bar - Brand Blue (Anchor) */}
            <div className="bg-blue-950 text-blue-100 z-50 relative border-b border-blue-900">
                <AnnouncementsCarousel data={announcements} />
            </div>

            {/* 2. Main Navigation - Stone Base / Brand Accents */}
            <nav className="bg-white sticky top-0 z-40 border-b border-stone-200 shadow-sm">
                <div className="container mx-auto px-6 h-24 flex justify-between items-center">
                    <div className="flex items-center space-x-5">
                        {/* Logo / Brand Mark - Blue & Gold */}
                        <div className="w-12 h-12 bg-blue-900 flex items-center justify-center text-yellow-400 font-serif font-bold text-2xl rounded-sm shadow-sm">
                            D
                        </div>
                        <div className="flex flex-col">
                            {/* Brand Name - Stone (Neutral) or Blue? Blue aligns better with logo text */}
                            <h1 className="text-2xl font-bold font-playfair text-blue-900 tracking-tight leading-none">DEVANGAR</h1>
                            <p className="text-[11px] text-stone-500 uppercase tracking-[0.2em] font-medium mt-1">Polytechnic College</p>
                        </div>
                    </div>

                    <div className="hidden lg:flex items-center space-x-10 text-sm font-bold text-stone-800 tracking-wide uppercase">
                        {['Academics', 'Admissions', 'Departments', 'Campus Life', 'Alumni'].map((item) => (
                            <a key={item} href="#" className="relative group hover:text-red-700 transition-colors duration-300 py-2">
                                {item}
                                {/* Hover Underline - Gold */}
                                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                            </a>
                        ))}
                        {/* CTA Button - Red (Ribbon Color) */}
                        <button className="px-8 py-3 bg-red-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-800 transition-colors duration-300 shadow-md shadow-red-100">
                            Apply Now
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
