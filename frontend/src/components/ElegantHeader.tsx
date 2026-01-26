"use client";

import React, { useState } from 'react';
import { Announcement } from '@/lib/types';
import AnnouncementsCarousel from './AnnouncementsCarousel';
import { motion, AnimatePresence } from "framer-motion";
import { menuItems } from '@/lib/constants';

interface ElegantHeaderProps {
    announcements: Announcement[];
}

export default function ElegantHeader({ announcements }: ElegantHeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [mobileExpandedIndex, setMobileExpandedIndex] = useState<number | null>(null);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    const toggleAccordion = (index: number) => {
        setMobileExpandedIndex(mobileExpandedIndex === index ? null : index);
    };

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
                            {/* Brand Name */}
                            <h1 className="text-2xl font-bold font-playfair text-blue-900 tracking-tight leading-none">DEVANGAR</h1>
                            <p className="text-[11px] text-stone-500 uppercase tracking-[0.2em] font-medium mt-1">Polytechnic College</p>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden lg:flex items-center space-x-8 xl:space-x-10 text-sm font-bold text-stone-800 tracking-wide uppercase">
                        {menuItems.map((item, index) => (
                            <div key={index} className="relative group py-6">
                                <a
                                    href={item.href}
                                    className="relative hover:text-red-700 transition-colors duration-300 flex items-center gap-1"
                                >
                                    {item.label}
                                    {/* Hover Underline - Gold */}
                                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                </a>

                                {/* Dropdown Menu */}
                                {item.dropdown && item.dropdown.length > 0 && (
                                    <div className="absolute left-0 top-full w-60 bg-white shadow-lg border-t-2 border-yellow-500 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50">
                                        <div className="py-2">
                                            {item.dropdown.map((subItem, subIndex) => (
                                                <a
                                                    key={subIndex}
                                                    href={subItem.href}
                                                    className="block px-6 py-3 text-stone-600 hover:bg-stone-50 hover:text-red-700 transition-colors text-xs font-semibold tracking-wider border-b border-stone-100 last:border-0"
                                                >
                                                    {subItem.label}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {/* CTA Button */}
                        <button className="px-8 py-3 bg-red-700 text-white font-bold text-xs uppercase tracking-widest hover:bg-red-800 transition-colors duration-300 shadow-md shadow-red-100">
                            Apply Now
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden text-stone-800 p-2 focus:outline-none"
                        onClick={toggleMobileMenu}
                        aria-label="Toggle menu"
                    >
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={toggleMobileMenu}
                            className="fixed inset-0 bg-black/50 z-50 lg:hidden backdrop-blur-sm"
                        />

                        {/* Drawer */}
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-white z-[60] shadow-2xl overflow-y-auto"
                        >
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-6">
                                    <div>
                                        <h2 className="text-xl font-playfair font-bold text-blue-900">Menu</h2>
                                    </div>
                                    <button
                                        onClick={toggleMobileMenu}
                                        className="p-2 text-stone-500 hover:text-red-700 transition-colors"
                                        aria-label="Close menu"
                                    >
                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Mobile CTA */}
                                <div className="mb-6">
                                    <button className="w-full py-3 bg-red-700 text-white font-bold text-sm uppercase tracking-widest hover:bg-red-800 transition-colors duration-300 shadow-md">
                                        Apply Now
                                    </button>
                                </div>

                                {/* Mobile Menu Items */}
                                <div className="space-y-2">
                                    {menuItems.map((item, index) => (
                                        <div key={index} className="border-b border-stone-100 last:border-0">
                                            <div
                                                className="flex justify-between items-center py-4 cursor-pointer"
                                                onClick={() => item.dropdown && toggleAccordion(index)}
                                            >
                                                <a
                                                    href={item.href}
                                                    className="text-stone-800 font-bold uppercase text-sm tracking-wide"
                                                    onClick={(e) => {
                                                        if (item.dropdown) {
                                                            e.preventDefault();
                                                            toggleAccordion(index);
                                                        }
                                                    }}
                                                >
                                                    {item.label}
                                                </a>
                                                {item.dropdown && (
                                                    <span className={`transform transition-transform duration-300 ${mobileExpandedIndex === index ? 'rotate-180 text-red-700' : 'text-stone-400'}`}>
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                        </svg>
                                                    </span>
                                                )}
                                            </div>

                                            {/* Accordion Content */}
                                            <AnimatePresence>
                                                {mobileExpandedIndex === index && item.dropdown && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden bg-stone-50"
                                                    >
                                                        <div className="py-2 pl-4 space-y-2">
                                                            {item.dropdown.map((subItem, subIndex) => (
                                                                <a
                                                                    key={subIndex}
                                                                    href={subItem.href}
                                                                    className="block py-2 text-stone-600 text-xs font-semibold uppercase tracking-wider hover:text-red-700"
                                                                >
                                                                    {subItem.label}
                                                                </a>
                                                            ))}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
