import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

export default function ElegantFooter() {
    return (
        <footer className="bg-white border-t border-stone-200 pt-24 font-sans text-stone-900">
            <div className="container mx-auto px-6 pb-12">
                <div className="grid md:grid-cols-4 gap-8 lg:gap-12 text-sm">

                    {/* Column 1: Logo & Info */}
                    <div className="md:col-span-1">
                        <Link href="/">
                            <div className="flex items-center gap-3 mb-6">
                                {/* Logo - Brand Blue & Gold */}
                                <Image src="/logo.png" alt="Logo" width={50} height={50} />
                                <div className='flex flex-col'>
                                    <h4 className="font-playfair font-bold text-xl text-blue-900">Devangar</h4>
                                    <span className='font-playfair font-bold text-md text-blue-900'>Polytechnic College</span>
                                </div> </div>
                        </Link>
                        <p className="text-stone-500 leading-relaxed font-serif mb-8 max-w-xs">
                            Established in 2010, we are dedicated to setting global standards in technical education.
                        </p>
                    </div>

                    {/* Column 2: Academics */}
                    <div>
                        <h5 className="font-bold text-blue-900 mb-6 uppercase text-xs tracking-[0.2em]">Academics</h5>
                        <ul className="space-y-3 text-stone-500">
                            <li><Link href="/academics/administration" className="hover:text-red-700 transition-colors duration-300">Administration & Trust</Link></li>
                            <li><Link href="/academics/faculty" className="hover:text-red-700 transition-colors duration-300">Faculty Directory</Link></li>
                            <li><Link href="/academics/disclosures" className="hover:text-red-700 transition-colors duration-300">Mandatory Disclosures</Link></li>
                        </ul>
                    </div>

                    {/* Column 3: Departments */}
                    <div>
                        <h5 className="font-bold text-blue-900 mb-6 uppercase text-xs tracking-[0.2em]">Departments</h5>
                        <ul className="space-y-3 text-stone-500">
                            <li><Link href="/departments/civil-engineering" className="hover:text-red-700 transition-colors duration-300">Civil Engineering</Link></li>
                            <li><Link href="/departments/mechanical-engineering" className="hover:text-red-700 transition-colors duration-300">Mechanical Engineering</Link></li>
                            <li><Link href="/departments/computer-engineering" className="hover:text-red-700 transition-colors duration-300">Computer Engineering</Link></li>
                            <li><Link href="/departments/electrical-electronics" className="hover:text-red-700 transition-colors duration-300">Electrical & Electronics (EEE)</Link></li>
                            <li><Link href="/departments/electronics-communication" className="hover:text-red-700 transition-colors duration-300">Electronics & Communication (ECE)</Link></li>
                        </ul>
                    </div>

                    {/* Column 4: Contact */}
                    <div>
                        <h5 className="font-bold text-blue-900 mb-6 uppercase text-xs tracking-[0.2em]">Contact Us</h5>
                        <address className="not-italic text-stone-500 mb-6 leading-relaxed font-serif">
                            842 - Devangar Polytechnic College,D.Vadipatti (Village),Periyakulam To Madurai Main Road,Periyakulam (TK),Theni - Dist Pin - 625602.,<br />
                            Tamil Nadu.
                        </address>
                        <p className="text-stone-900 font-bold mb-1 text-lg font-playfair tracking-wide"><a href="tel:04546235777" className="hover:text-red-700 transition-colors">04546-235777</a></p>
                    </div>
                </div>
            </div>

            {/* Combined Footer Strip - BytesBrush */}
            <div className="bg-stone-950 py-6 border-t border-white/5 relative z-20">
                <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500">

                    {/* Copyright & Links */}
                    <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
                        <span>&copy; Copyright 2026 <span className="hidden sm:inline">|</span> All Rights Reserved <span className="hidden sm:inline">|</span> Devangar Polytechnic College</span>
                    </div>

                    {/* Developer Credit */}
                    <Link
                        href="https://bytesbrush.in"
                        target="_blank"
                        className="flex items-center gap-3 group hover:text-white transition-colors duration-500"
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
                                width={24}
                                height={24}
                            />
                        </div>
                    </Link>

                </div>
            </div>
        </footer>
    );
}
