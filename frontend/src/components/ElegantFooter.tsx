import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

export default function ElegantFooter() {
    return (
        <footer className="bg-white border-t border-stone-200 pt-24 font-sans text-stone-900">
            <div className="container mx-auto px-6 pb-24">
                <div className="grid md:grid-cols-4 gap-12 lg:gap-20 text-sm">
                    <Link href="/">
                    <div className="col-span-1 md:col-span-1">
                        {/* Logo - Brand Blue & Gold */}
                        <div className="w-10 h-10 bg-blue-900 flex items-center justify-center text-yellow-400 font-serif font-bold text-xl rounded-sm mb-6 border border-blue-800">
                            D
                        </div>
                        {/* Title - Brand Blue */}
                        <h4 className="font-playfair font-bold text-2xl text-blue-900 mb-6">Devangar Polytechnic</h4>
                        <p className="text-stone-500 leading-relaxed max-w-xs font-serif">
                            Established in 1998, we are dedicated to setting global standards in technical education.
                        </p>
                    </div></Link>
                    <div>
                        {/* Header - Brand Blue */}
                        <h5 className="font-bold text-blue-900 mb-6 uppercase text-sm tracking-[0.2em]">Academics</h5>
                        <ul className="space-y-3 text-stone-500">
                            {/* Links - Hover Red */}
                            <li><a href="#" className="hover:text-red-700 transition">Diploma Courses</a></li>
                            <li><a href="#" className="hover:text-red-700 transition">Admissions</a></li>
                            <li><a href="#" className="hover:text-red-700 transition">Results</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-blue-900 mb-6 uppercase text-sm tracking-[0.2em]">Campus</h5>
                        <ul className="space-y-3 text-stone-500">
                            <li><a href="#" className="hover:text-red-700 transition">Library</a></li>
                            <li><a href="#" className="hover:text-red-700 transition">Hostel</a></li>
                            <li><a href="#" className="hover:text-red-700 transition">Laboratories</a></li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="font-bold text-blue-900 mb-6 uppercase text-sm tracking-[0.2em]">Contact</h5>
                        <address className="not-italic text-stone-500 mb-6 leading-relaxed font-serif">
                            Periyakulam Road,<br />
                            Theni - 625531,<br />
                            Tamil Nadu.
                        </address>
                        <p className="text-stone-900 font-bold mb-1">+91 4546 252 525</p>
                    </div>
                </div>
            </div>

            {/* Combined Footer Strip - BytesBrush */}
            <div className="bg-stone-950 py-5 border-t border-white/5 relative z-20">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">

                    {/* Copyright & Links */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        <span>&copy; Copyright 2026 <span className="hidden sm:inline">|</span> All Rights Reserved <span className="hidden sm:inline">|</span> Devangar Polytechnic College</span>
                        {/* <div className="flex space-x-6">
                            <a href="#" className="hover:text-stone-300 transition-colors">Privacy</a>
                            <a href="#" className="hover:text-stone-300 transition-colors">Legal</a>
                        </div> */}
                    </div>

                    {/* Developer Credit */}
                    <a
                        href="https://bytesbrush.in"
                        target="_blank"
                        className="flex items-center gap-4 group hover:text-white transition-colors duration-500"
                    >
                        <div className="flex flex-col items-end leading-tight">
                            <span className="text-[8px] opacity-70 group-hover:opacity-100 transition-opacity">Developed by</span>
                            <span className="text-white group-hover:text-yellow-500 transition-colors">BytesBrush</span>
                        </div>
                        {/* Logo */}
                        <div className="w-6 h-6 opacity-60 group-hover:opacity-100 transition-all duration-500 filter grayscale group-hover:grayscale-0 group-hover:scale-110">
                            <Image
                                src="/images/bytesbrush-logo.png"
                                alt="BytesBrush Logo"
                                className="w-full h-full object-contain invert"
                                width={20}
                                height={20}
                            />
                        </div>
                    </a>

                </div>
            </div>
        </footer>
    );
}
