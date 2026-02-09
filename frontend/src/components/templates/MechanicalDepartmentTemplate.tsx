"use client";

import React from 'react';
import { Department, DepartmentContent, Faculty, Announcement } from '@/lib/types';
import ElegantHeader from '../ElegantHeader';
import ElegantFooter from '../ElegantFooter';
import { motion, Variants } from "framer-motion";
import Image from 'next/image';

interface MechanicalDepartmentTemplateProps {
    department: Department;
    content: DepartmentContent | undefined;
    faculty: Faculty[];
    announcements: Announcement[];
    heroImage?: string;
    heroOverlayText?: string;
    estYear?: string;
}

// Animations
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.1
        }
    }
};

export default function MechanicalDepartmentTemplate({
    department,
    content,
    faculty,
    announcements,
    heroImage,
    heroOverlayText,
    estYear
}: MechanicalDepartmentTemplateProps) {
    const finalHeroImage: string = heroImage || department.heroImage || "/images/college-hero-bg.png";
    const finalHeroOverlayText = heroOverlayText || department.heroOverlayText || "Building the Future";
    const finalEstYear = estYear || department.estYear || "2010";

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-blue-900 selection:text-white">
            <ElegantHeader announcements={announcements} />

            <main>
                {/* 1. Hero Section */}
                <div className="relative h-[80vh] w-full flex items-center justify-center bg-stone-900 overflow-hidden">
                    {/* Background Image Parallax */}
                    <motion.div
                        initial={{ scale: 1.1 }}
                        animate={{ scale: 1.0 }}
                        transition={{ duration: 10, ease: "easeOut" }}
                        className="absolute inset-0 z-0"
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-900 via-stone-900/60 to-transparent z-10" />
                        <Image
                            width={1024}
                            height={768}
                            src={finalHeroImage}
                            alt={department.name}
                            className="w-full h-full object-cover opacity-60"
                        />
                    </motion.div>

                    <div className="container mx-auto px-6 relative z-20 pt-20">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="max-w-4xl"
                        >
                            <motion.span variants={fadeInUp} className="inline-block py-2 px-4 border border-yellow-500/50 text-yellow-500 text-xs font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-sm bg-black/30">
                                Est. {finalEstYear}
                            </motion.span>
                            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-[1.1]">
                                Department of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                                    {department.name.replace('Department of ', '')}
                                </span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-xl text-stone-300 max-w-2xl font-light leading-relaxed mb-10 border-l-4 border-red-700 pl-6">
                                {finalHeroOverlayText}
                            </motion.p>

                            {/* <motion.div variants={fadeInUp} className="flex gap-4">
                                <button className="px-8 py-4 bg-red-700 text-white font-bold uppercase text-xs tracking-widest hover:bg-red-800 transition-colors shadow-xl shadow-red-900/20">
                                    Course Modules
                                </button>
                                <button className="px-8 py-4 bg-white/10 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                                    Virtual Lab
                                </button>
                            </motion.div> */}
                        </motion.div>
                    </div>
                </div>

                {/* 2. Intro & Vision */}
                <section className="py-24 bg-white relative">
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-stone-50/50 -z-0" />
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid md:grid-cols-2 gap-16 items-start">
                            <div>
                                <h2 className="text-4xl font-playfair font-bold text-blue-950 mb-8 leading-tight">
                                    Empowering <br />
                                    <span className="italic font-normal text-stone-500">Innovation</span>
                                </h2>
                                <div className="prose prose-lg prose-stone text-stone-600 font-serif">
                                    <p>
                                        The Department of {department.name} is committed to providing a rigorous academic environment that fosters technical excellence and ethical leadership.
                                    </p>
                                    <p>
                                        Our curriculum integrates core engineering principles with modern technological advancements to prepare students for the challenges of the future.
                                    </p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-6 mt-12">
                                    <div className="bg-blue-950 p-8 text-white text-center shadow-lg transform transition hover:-translate-y-2">
                                        <h3 className="text-4xl font-playfair font-bold text-yellow-400 mb-2">15+</h3>
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Years of Excellence</p>
                                    </div>
                                    <div className="bg-stone-100 p-8 text-center border border-stone-200 transition hover:border-yellow-500">
                                        <h3 className="text-4xl font-playfair font-bold text-stone-900 mb-2">100%</h3>
                                        <p className="text-xs font-bold uppercase tracking-widest text-stone-500">Placement Record</p>
                                    </div>
                                </div>
                                <div className="space-y-6">
                                    <div className="bg-stone-100 p-8 text-center border border-stone-200 transition hover:border-yellow-500">
                                        <h3 className="text-4xl font-playfair font-bold text-stone-900 mb-2">09</h3>
                                        <p className="text-xs font-bold uppercase tracking-widest text-stone-500">State-of-Art Labs</p>
                                    </div>
                                    <div className="bg-red-700 p-8 text-white text-center shadow-lg transform transition hover:-translate-y-2">
                                        <h3 className="text-4xl font-playfair font-bold text-white mb-2">15+</h3>
                                        <p className="text-xs font-bold uppercase tracking-widest opacity-80">Industry Partners</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Academic Programs / Labs (Dynamic Content) */}
                {content && content.sections && (
                    <section className="py-24 bg-stone-50">
                        <div className="container mx-auto px-6">
                            <div className="text-center max-w-3xl mx-auto mb-16">
                                <span className="text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">Academic Excellence</span>
                                <h2 className="text-4xl font-playfair font-bold text-blue-950 mb-6">Laboratories & Facilities</h2>
                                <p className="text-stone-500 font-serif italic text-lg">Hands-on experience with modern equipment is at the core of our curriculum.</p>
                            </div>

                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

                                {content.sections.facilities && (
                                    <div className="bg-white p-8 shadow-sm border-t-4 border-blue-900 group hover:shadow-xl transition-all duration-300">
                                        <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-900 transition-colors">
                                            <svg className="w-6 h-6 text-blue-900 group-hover:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                        </div>
                                        <h3 className="text-xl font-playfair font-bold text-stone-900 mb-4">Core Labs</h3>
                                        <div className="text-stone-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content.sections.facilities }}></div>
                                    </div>
                                )}

                                <div className="bg-white p-8 shadow-sm border-t-4 border-yellow-500 group hover:shadow-xl transition-all duration-300">
                                    <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                                        <svg className="w-6 h-6 text-yellow-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    </div>
                                    <h3 className="text-xl font-playfair font-bold text-stone-900 mb-4">Design & Simulation</h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        Equipped with high-end workstations and industry-standard software for specific domain simulation.
                                    </p>
                                </div>

                                <div className="bg-white p-8 shadow-sm border-t-4 border-red-700 group hover:shadow-xl transition-all duration-300">
                                    <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors">
                                        <svg className="w-6 h-6 text-red-700 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                                    </div>
                                    <h3 className="text-xl font-playfair font-bold text-stone-900 mb-4">Research & Testing</h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        Dedicated facilities for advanced research and material/project testing.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}

                {/* 4. Faculty Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-stone-200 pb-8">
                            <div>
                                <span className="text-blue-900 font-bold uppercase tracking-[0.2em] text-xs mb-2 block">Our Pillars</span>
                                <h2 className="text-4xl font-playfair font-bold text-stone-900">Distinguished Faculty</h2>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {faculty && faculty.map((f, idx) => (
                                <div key={idx} className="group relative">
                                    <h3 className="text-lg font-playfair font-bold text-stone-900 mb-1">{f.name}</h3>
                                    <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">{f.designation}</p>
                                    <p className="text-sm text-stone-500 font-serif leading-relaxed line-clamp-2">
                                        Academic professional with deep expertise in the field.
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Call to Action */}
                <section className="py-24 bg-blue-950 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
                    <div className="container mx-auto px-6 text-center relative z-10">
                        <span className="text-yellow-500 font-bold uppercase tracking-[0.2em] text-xs mb-6 block">Join the Legacy</span>
                        <h2 className="text-4xl md:text-5xl font-playfair font-bold text-white mb-10 max-w-4xl mx-auto leading-tight">
                            Start Your Journey in <span className="italic font-serif text-blue-200">{department.name.replace('Department of ', '')}</span>
                        </h2>
                        {/* <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button className="px-10 py-4 bg-yellow-500 text-blue-950 font-bold uppercase text-xs tracking-widest hover:bg-yellow-400 transition-colors shadow-lg">
                                Apply for Admission
                            </button>
                            <button className="px-10 py-4 border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-blue-950 transition-all">
                                Download Brochure
                            </button>
                        </div> */}
                    </div>
                </section>

            </main>

            <ElegantFooter />
        </div>
    );
}
