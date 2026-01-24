"use client";

import React from 'react';
import { Page, Banner, Announcement, GalleryItem, FileItem } from '@/lib/types';
import Banners from '../Banners';
import Gallery from '../Gallery';
import FileList from '../FileList';
import ElegantHeader from '../ElegantHeader';
import ElegantFooter from '../ElegantFooter';
import { motion, Variants } from "framer-motion";

// Animations
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 1.0, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.1
        }
    }
};

interface ElegantTemplateProps {
    page: Page;
    banners: Banner[];
    announcements: Announcement[];
    gallery: GalleryItem[];
    files: FileItem[];
}

export default function ElegantTemplate({ page, banners, announcements, gallery, files }: ElegantTemplateProps) {
    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-red-900 selection:text-white">

            <ElegantHeader announcements={announcements} />

            <main>
                {/* 2. Hero Section */}
                <div className="relative min-h-[92vh] w-full flex items-center justify-center bg-stone-900 overflow-hidden">
                    <motion.div
                        initial={{ scale: 1.0 }}
                        animate={{ scale: 1.05 }}
                        transition={{ duration: 25, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
                        className="absolute inset-0 z-0"
                    >
                        {banners && banners.length > 0 && banners[0].image ? (
                            <img
                                src={banners[0].image}
                                alt="Hero Background"
                                className="w-full h-full object-cover opacity-50"
                            />
                        ) : (
                            <div className="w-full h-full bg-stone-800"></div>
                        )}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </motion.div>

                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={staggerContainer}
                            className="max-w-5xl mx-auto"
                        >
                            <motion.div variants={fadeInUp} className="flex justify-center mb-10">
                                {/* Badge - text-xs */}
                                <span className="inline-block py-2 px-8 border-y border-yellow-500/30 text-xs font-bold tracking-[0.3em] text-yellow-500 uppercase bg-black/20 backdrop-blur-sm">
                                    Est. 1998 &bull; Theni, Tamil Nadu
                                </span >
                            </motion.div>

                            <motion.h1 variants={fadeInUp} className="text-6xl md:text-7xl lg:text-8xl font-playfair font-bold text-white leading-[1.05] mb-10 drop-shadow-xl tracking-tight">
                                Excellence in <br /><span className="italic font-light opacity-95 text-yellow-50">Engineering Education</span>
                            </motion.h1>

                            {/* Body Text: text-xl/2xl */}
                            <motion.p variants={fadeInUp} className="text-xl md:text-2xl text-stone-100 font-serif leading-relaxed max-w-3xl mx-auto mb-16 antialiased font-light opacity-90">
                                {page.title || "Cultivating the next generation of global leaders through rigorous academic discipline and practical innovation."}
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-6 justify-center">
                                {/* Button Text: text-xs/sm */}
                                <a
                                    href="#"
                                    className="min-w-[200px] px-8 py-4 bg-red-700 text-white font-bold tracking-[0.15em] text-xs uppercase hover:bg-red-800 transition-colors duration-300 shadow-lg shadow-red-900/20"
                                >
                                    Explore Academics
                                </a>
                                <a
                                    href="#"
                                    className="min-w-[200px] px-8 py-4 bg-transparent text-white border border-white/40 font-bold tracking-[0.15em] text-xs uppercase hover:bg-white hover:text-stone-900 transition-all duration-300 backdrop-blur-sm"
                                >
                                    Virtual Tour
                                </a>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>

                {/* 3. Statistics */}
                <section className="py-24 bg-white border-b border-stone-100 relative z-10">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center divide-x divide-stone-100">
                            {[
                                { number: "25+", label: "Years of Heritage" },
                                { number: "06", label: "Academic Departments" },
                                { number: "100%", label: "Placement Record" },
                                { number: "50+", label: "Distinguished Faculty" },
                            ].map((stat, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 15 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center px-4"
                                >
                                    <h3 className="text-5xl font-playfair font-normal text-stone-900 mb-4">{stat.number}</h3>
                                    <p className="text-xs font-bold text-stone-500 uppercase tracking-[0.2em]">{stat.label}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* NEW: Welcome Section (Refined & Aligned) */}
                <section className="py-24 px-6 bg-white relative overflow-hidden">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid md:grid-cols-12 gap-16 items-start">

                            {/* Left: Image (Building) - Clean & Structural */}
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="md:col-span-5 relative mt-8"
                            >
                                <div className="aspect-[3/4] bg-stone-100 relative z-10 shadow-2xl shadow-stone-200 overflow-hidden">
                                    {/* Main Image Placeholder */}
                                    <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400 font-serif italic">
                                        [College Building]
                                    </div>
                                    {/* Inner Border (Ivy League Style) */}
                                    <div className="absolute inset-4 border border-white/30"></div>
                                </div>

                                {/* Structural Graphic Elements */}
                                {/* Removed Blue Block to prevent 'glitch' visual */}
                                {/* 2. Gold Outline frame */}
                                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-yellow-500/30 -z-0"></div>
                            </motion.div>

                            {/* Right: Text Content */}
                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                                className="md:col-span-7 flex flex-col justify-center"
                            >
                                <span className="flex items-center gap-3 text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-8">
                                    <span className="w-8 h-px bg-red-700"></span>
                                    Welcome To
                                </span>

                                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-stone-900 mb-8 leading-tight">
                                    Devangar Polytechnic <span className="text-blue-900 border-b-4 border-yellow-400">College</span>
                                </h2>

                                <div className="prose prose-lg prose-stone text-stone-600 font-serif leading-relaxed mb-10">
                                    <p>
                                        We would like to introduce ourselves as a new team of Devangar Educational Trust, belonging to diverse fields. We are keenly interested in taking over the entire administration and functioning of the institution namely called <strong>"DEVANGAR POLYTECHNIC COLLEGE"</strong>.
                                    </p>
                                    <p>
                                        Our new team has united from strong backgrounds to reach new heights in education. Realizing the importance of uplifting downtrodden children and rural communities, we are committed to developing world-class educational institutions.
                                    </p>
                                </div>

                                <div className="flex flex-wrap gap-6">
                                    <a
                                        href="#"
                                        className="inline-flex items-center px-8 py-4 bg-red-700 text-white font-bold tracking-[0.15em] text-xs uppercase hover:bg-red-800 transition-colors shadow-lg shadow-red-900/10 group"
                                    >
                                        Read Our Story
                                        <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                                    </a>
                                </div>
                            </motion.div>

                        </div>
                    </div>
                </section>

                {/* 4. Principal's Message */}
                <section className="py-32 px-6 bg-[#f9f8f6]">
                    <div className="container mx-auto max-w-6xl">
                        <div className="grid md:grid-cols-12 gap-16 items-center">
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                className="md:col-span-7 order-2 md:order-1"
                            >
                                <span className="text-red-700 font-bold tracking-[0.2em] uppercase text-xs mb-8 block flex items-center gap-3">
                                    <span className="w-6 h-px bg-red-700"></span>
                                    From the Principal's Desk
                                </span>
                                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-stone-900 mb-10 leading-tight">
                                    "We are committed to fostering an environment of intellectual curiosity and ethical leadership."
                                </h2>
                                {/* Prose: prose-lg (not xl) */}
                                <div className="prose prose-lg prose-stone text-stone-600 font-serif leading-relaxed mb-12">
                                    {page.sections?.map((section, index) => (
                                        <div key={index} dangerouslySetInnerHTML={{ __html: section.content }} />
                                    ))}
                                </div>
                                <div className="flex items-center gap-8 border-t border-stone-200 pt-8">
                                    <div className="flex flex-col">
                                        <span className="font-playfair font-bold text-xl text-stone-900">Dr. Name Here</span>
                                        <span className="text-xs text-stone-500 uppercase tracking-wider mt-1 font-bold">Principal</span>
                                    </div>
                                    <a href="#" className="text-red-700 text-xs font-bold uppercase tracking-widest border-b border-red-700 pb-1 hover:text-stone-900 hover:border-stone-900 transition-colors">Read Full Message</a>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className="md:col-span-5 order-1 md:order-2 relative mt-8 md:mt-0"
                            >
                                <div className="aspect-[3/4] bg-stone-100 relative z-10 shadow-2xl shadow-stone-200 overflow-hidden">
                                    {/* Main Image Placeholder */}
                                    <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400 font-serif italic text-xl">
                                        Principal's Portrait
                                    </div>
                                    {/* Inner Border */}
                                    <div className="absolute inset-4 border border-white/30"></div>
                                </div>

                                {/* Structural Graphic Elements - Mirrored from Welcome Section */}
                                {/* Removed Blue Block to prevent 'glitch' visual */}
                                {/* 2. Gold Outline frame (Bottom Left) */}
                                <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 border-2 border-yellow-500/30 -z-0"></div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* 5. Departments */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-24 border-b border-stone-200 pb-10">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-5xl font-playfair font-bold text-blue-900 mb-6">Academic Programs</h2>
                                {/* Description: text-lg */}
                                <p className="text-lg text-stone-500 font-serif leading-relaxed">
                                    Our curriculum bridges theoretical foundations with cutting-edge application, preparing students for dynamic careers.
                                </p>
                            </div>
                            <a href="#" className="hidden md:flex items-center text-red-700 font-bold hover:text-stone-900 transition mt-6 md:mt-0 group uppercase text-xs tracking-[0.15em]">
                                Explore All Departments
                                <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                            </a>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-16">
                            {['Civil Engineering', 'Mechanical Engineering', 'Electrical & Electronics', 'Electronics & Comm.', 'Computer Engineering'].map((dept, i) => (
                                <motion.div
                                    key={i}
                                    variants={fadeInUp}
                                    initial="hidden"
                                    whileInView="visible"
                                    viewport={{ once: true }}
                                    className="group cursor-pointer"
                                >
                                    <div className="aspect-[16/10] bg-stone-100 mb-8 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-stone-200 transition-transform duration-1000 ease-out group-hover:scale-105"></div>
                                    </div>
                                    <div className="pr-4">
                                        <h3 className="text-2xl font-playfair font-bold text-stone-900 mb-4 group-hover:text-red-700 transition-colors duration-300">{dept}</h3>
                                        {/* Desc: text-sm */}
                                        <p className="text-stone-500 leading-relaxed mb-6 text-sm">Rigorous coursework combined with hands-on laboratory experience.</p>
                                        <span className="inline-flex items-center text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors">
                                            Details <span className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300">&rarr;</span>
                                        </span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. Gallery */}
                {gallery.length > 0 && (
                    <section className="py-32 bg-stone-50">
                        <div className="container mx-auto px-6">
                            <h2 className="text-center text-3xl md:text-4xl font-playfair font-bold text-blue-900 mb-20">Campus Life</h2>
                            <div className="bg-white p-8 shadow-sm border border-stone-200">
                                <Gallery data={gallery} />
                            </div>
                        </div>
                    </section>
                )}

                {/* 7. Downloads */}
                {files.length > 0 && (
                    <section className="py-24 bg-stone-900">
                        <div className="container mx-auto px-6 max-w-5xl text-center">
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white mb-6">Student & Faculty Resources</h2>
                            <p className="mb-12 text-stone-400 font-light text-lg">Access updated schedules, syllabi, and administrative forms.</p>
                            <div className="bg-white/5 border border-white/10 p-12 text-left">
                                <FileList data={files} />
                            </div>
                        </div>
                    </section>
                )}

                {/* NEW: Newsletter Section (Legacy Integration) */}
                <section className="bg-blue-950 py-16 border-t border-blue-900 relative overflow-hidden">
                    {/* Decorative Background Texture */}
                    <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

                    <div className="container mx-auto px-6 relative z-10">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8 max-w-6xl mx-auto">

                            <div className="flex items-center space-x-6">
                                {/* Ticket Icon - Styled */}
                                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20 transform -rotate-12">
                                    <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-3xl font-playfair font-bold text-white">Subscribe for Newsletter</h3>
                                    <p className="text-blue-200 text-sm mt-1 font-serif tracking-wide">Stay updated with the latest campus news and events.</p>
                                </div>
                            </div>

                            <form className="flex w-full md:w-auto bg-white p-1.5 rounded shadow-lg shadow-blue-900/50">
                                <input
                                    type="email"
                                    placeholder="Enter your email address..."
                                    className="px-4 py-3 bg-transparent w-full md:w-80 outline-none text-stone-800 placeholder-stone-400 font-medium"
                                />
                                <button
                                    type="button"
                                    className="bg-red-700 text-white px-8 py-3 font-bold uppercase tracking-widest text-xs hover:bg-red-800 transition-colors whitespace-nowrap"
                                >
                                    Subscribe Now
                                </button>
                            </form>

                        </div>
                    </div>
                </section>

            </main>

            <ElegantFooter />


        </div>
    );
}
