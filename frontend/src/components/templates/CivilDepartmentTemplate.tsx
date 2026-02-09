"use client";

import { Department, DepartmentContent, Faculty, Announcement } from '@/lib/types';
import ElegantHeader from '../ElegantHeader';
import ElegantFooter from '../ElegantFooter';
import { motion, Variants } from "framer-motion";
import Image from 'next/image';

interface CivilDepartmentTemplateProps {
    department: Department;
    content: DepartmentContent | undefined;
    faculty: Faculty[];
    announcements: Announcement[];
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

export default function CivilDepartmentTemplate({ content, faculty, announcements }: CivilDepartmentTemplateProps) {
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
                            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop"
                            alt="Civil Engineering"
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
                                Est. 2010
                            </motion.span>
                            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 leading-[1.1]">
                                Department of <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600">
                                    Civil Engineering
                                </span>
                            </motion.h1>
                            <motion.p variants={fadeInUp} className="text-xl text-stone-300 max-w-2xl font-light leading-relaxed mb-10 border-l-4 border-red-700 pl-6">
                                Building the foundation of modern society through sustainable infrastructure and innovative design.
                            </motion.p>

                            <motion.div variants={fadeInUp} className="flex gap-4">
                                <button className="px-8 py-4 bg-red-700 text-white font-bold uppercase text-xs tracking-widest hover:bg-red-800 transition-colors shadow-xl shadow-red-900/20">
                                    Course Modules
                                </button>
                                <button className="px-8 py-4 bg-white/10 text-white font-bold uppercase text-xs tracking-widest hover:bg-white/20 transition-colors backdrop-blur-sm border border-white/20">
                                    Virtual Lab
                                </button>
                            </motion.div>
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
                                    Constructing a <br />
                                    <span className="italic font-normal text-stone-500">Sustainable Future</span>
                                </h2>
                                <div className="prose prose-lg prose-stone text-stone-600 font-serif">
                                    <p>
                                        Civil Engineering is the oldest and broadest engineering discipline, encompassing the design, construction, and maintenance of the physical and natural built environment.
                                    </p>
                                    <p>
                                        At Devangar Polytechnic, we focus on producing engineers who are not only technically proficient but also socially responsible. Our curriculum integrates traditional engineering principles with modern technologies like CAD, GIS, and Sustainable Design practices.
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
                                        <h3 className="text-4xl font-playfair font-bold text-stone-900 mb-2">06</h3>
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
                                {/* We can manually map these if we know them, or render dangerously if it's HTML. 
                                    For a "Template" feel, let's try to extract or just visually style the HTML block 
                                    if standard JSON structure isn't granular enough. 
                                    Assuming content.sections.facilities is HTML string. */}

                                {content.sections.facilities && (
                                    <div className="bg-white p-8 shadow-sm border-t-4 border-blue-900 group hover:shadow-xl transition-all duration-300">
                                        <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-900 transition-colors">
                                            <svg className="w-6 h-6 text-blue-900 group-hover:text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                                        </div>
                                        <h3 className="text-xl font-playfair font-bold text-stone-900 mb-4">Survey Lab</h3>
                                        <div className="text-stone-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: content.sections.facilities }}></div>
                                    </div>
                                )}

                                {/* Placeholder Labs to fill grid if data is singular blob */}
                                <div className="bg-white p-8 shadow-sm border-t-4 border-yellow-500 group hover:shadow-xl transition-all duration-300">
                                    <div className="h-12 w-12 bg-yellow-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-yellow-500 transition-colors">
                                        <svg className="w-6 h-6 text-yellow-600 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                                    </div>
                                    <h3 className="text-xl font-playfair font-bold text-stone-900 mb-4">CAD / Drafting Studio</h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        Equipped with high-end workstations and latest AutoCAD, Revit, and Staad.Pro software for structural modeling.
                                    </p>
                                </div>

                                <div className="bg-white p-8 shadow-sm border-t-4 border-red-700 group hover:shadow-xl transition-all duration-300">
                                    <div className="h-12 w-12 bg-red-50 rounded-full flex items-center justify-center mb-6 group-hover:bg-red-700 transition-colors">
                                        <svg className="w-6 h-6 text-red-700 group-hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                                    </div>
                                    <h3 className="text-xl font-playfair font-bold text-stone-900 mb-4">Material Testing Lab</h3>
                                    <p className="text-stone-600 text-sm leading-relaxed">
                                        Facilities for testing strength of concrete, steel, and soil mechanics to ensure structural integrity.
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
                            <a href="#" className="hidden md:block text-red-700 font-bold uppercase text-xs tracking-widest hover:text-stone-900 transition-colors">View All Staff &rarr;</a>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                            {faculty && faculty.map((f, idx) => (
                                <div key={idx} className="group relative">
                                    <div className="aspect-[3/4] overflow-hidden bg-stone-200 mb-4 relative">
                                        {f.photo ? (
                                            <Image
                                                src={f.photo}
                                                alt={f.name}
                                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 filter grayscale group-hover:grayscale-0"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-stone-400 bg-stone-100">
                                                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                            </div>
                                        )}
                                        {/* Overlay Stats */}
                                        <div className="absolute bottom-0 left-0 w-full bg-blue-900/90 backdrop-blur-sm p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                            <p className="text-white text-xs font-bold uppercase tracking-widest text-center">View Profile</p>
                                        </div>
                                    </div>
                                    <h3 className="text-lg font-playfair font-bold text-stone-900 mb-1">{f.name}</h3>
                                    <p className="text-xs font-bold text-red-700 uppercase tracking-wider mb-2">{f.designation}</p>
                                    <p className="text-sm text-stone-500 font-serif leading-relaxed line-clamp-2">
                                        Expert in Structural Engineering with over 10 years of academic experience.
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
                            Start Your Journey in <span className="italic font-serif text-blue-200">Civil Engineering</span>
                        </h2>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <button className="px-10 py-4 bg-yellow-500 text-blue-950 font-bold uppercase text-xs tracking-widest hover:bg-yellow-400 transition-colors shadow-lg">
                                Apply for Admission
                            </button>
                            <button className="px-10 py-4 border border-white/30 text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-blue-950 transition-all">
                                Download Brochure
                            </button>
                        </div>
                    </div>
                </section>

            </main>

            <ElegantFooter />
        </div>
    );
}
