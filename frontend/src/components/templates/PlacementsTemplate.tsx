"use client";

import ElegantHeader from '@/components/ElegantHeader';
import ElegantFooter from '@/components/ElegantFooter';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { Announcement, Banner, GalleryItem } from '@/lib/types';

interface PlacementsTemplateProps {
    announcements: Announcement[];
    banners: Banner[];
    gallery: GalleryItem[];
}

// Animations
const fadeInUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
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

export default function PlacementsTemplate({ announcements, banners }: PlacementsTemplateProps) {
    const stats = [
        { number: "100%", label: "Placement since 10 Years" },
    ];

    const partners = [
        // ... (rest of partners list)
        { name: "Royal Enfield", location: "Chennai" },
        { name: "TVS Lucas", location: "Chennai" },
        { name: "5k Networks", location: "Coimbatore" },
        { name: "Enkey Engineering Works", location: "Coimbatore" },
        { name: "Lakshmi CNC", location: "Coimbatore" },
        { name: "Norton Industries", location: "Coimbatore" },
        { name: "Bharath Automation", location: "Coimbatore" },
        { name: "TVS Brakes India Pvt Ltd", location: "Chennai" },
        { name: "LMW", location: "Coimbatore" },
        { name: "Solar Power Solutions", location: "Coimbatore" },
        { name: "Magna Automobile India Pvt Ltd", location: "Chengalpattu" },
    ];

    const processSteps = [
        {
            title: "Skill Enhancement",
            desc: "Intensive training in communication, aptitude, and technical domains.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
                    <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M12 8V12L15 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Performance Review",
            desc: "Regular mock interviews and online assessment tests.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 18.25 4 19 5M12 7V12L15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M21 4V7H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        },
        {
            title: "Industry Connect",
            desc: "Campus recruitment drives with pan-India corporate giants.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 10C19.2091 10 21 8.20914 21 6C21 3.79086 19.2091 2 17 2C14.7909 2 13 3.79086 13 6C13 8.20914 14.7909 10 17 10Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M7 10C9.20914 10 11 8.20914 11 6C11 3.79086 9.20914 2 7 2C4.79086 2 3 3.79086 3 6C3 8.20914 4.79086 10 7 10Z" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M21 21V19C21 16.7909 19.2091 15 17 15H14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M3 21V19C3 16.7909 4.79086 15 7 15H9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                    <path d="M12 12V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
            )
        },
        {
            title: "Career Launch",
            desc: "Final selection with competitive packages and onboarding support.",
            icon: (
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            )
        }
    ];

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-red-900 selection:text-white">
            <ElegantHeader announcements={announcements} />

            <main className="flex-grow">
                {/* 1. Hero Section - Professional Institutional Hero */}
                <section className="relative h-[65vh] min-h-[500px] w-full flex items-center justify-center bg-blue-950/90 overflow-hidden">
                    {/* Background with Subtle Zoom */}
                    <motion.div
                        initial={{ scale: 1.1, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.4 }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="absolute inset-0 z-0"
                    >
                        {banners && banners.length > 0 ? (
                            <Image
                                src={banners[0].image}
                                alt="DPC Placements"
                                fill
                                priority
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-blue-900/20"></div>
                        )}
                        {/* Professional Dark Overlay for High Contrast */}
                        <div className="absolute inset-0 bg-gradient-to-b from-blue-90/90 via-blue-950/60 to-blue-950/90"></div>
                    </motion.div>

                    <div className="container mx-auto px-6 relative z-10 text-center flex flex-col items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerContainer}
                            className="max-w-4xl w-full flex flex-col items-center"
                        >
                            {/* Structured Top Label */}
                            <motion.div variants={fadeInUp} className="flex items-center justify-center gap-4 mb-8">
                                <span className="w-10 h-px bg-yellow-500/40"></span>
                                <span className="text-[11px] font-bold text-yellow-500 uppercase tracking-[0.4em]">
                                    Training & Placement Cell
                                </span>
                                <span className="w-10 h-px bg-yellow-500/40"></span>
                            </motion.div>

                            {/* Main Title - Institutional Style */}
                            <motion.h1 
                                variants={fadeInUp} 
                                className="text-5xl md:text-7xl font-playfair font-bold text-white mb-6 tracking-tight leading-tight text-center"
                            >
                                Bridging Aspirations
                            </motion.h1>

                            {/* Subtitle - Professional Italic */}
                            <motion.p 
                                variants={fadeInUp}
                                className="text-xl md:text-2xl font-serif italic text-stone-200 opacity-90 tracking-wide text-center"
                            >
                                With Industry Leaders
                            </motion.p>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1, duration: 1 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
                    >
                        <div className="flex flex-col items-center gap-3">
                            <span className="text-[9px] font-bold text-stone-400 uppercase tracking-[0.3em]">Explore</span>
                            <div className="w-px h-10 bg-gradient-to-b from-yellow-500/60 to-transparent"></div>
                        </div>
                    </motion.div>
                </section>

                {/* 2. Stats Section */}
                <section className="py-20 bg-stone-50 border-b border-stone-100 relative z-10 -mt-20">
                    <div className="container mx-auto px-6">
                        <div className="relative bg-[#0a192f] shadow-2xl shadow-blue-900/20 border-t-4 border-yellow-500 p-12 md:p-16 overflow-hidden group">
                            {/* Decorative Background Elements */}
                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl group-hover:bg-yellow-500/20 transition-all duration-700"></div>
                            <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
                            
                            <div className="relative z-10 flex justify-center text-center">
                                {stats.map((stat, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="flex flex-col items-center"
                                    >
                                        <h3 className="text-6xl md:text-8xl font-playfair font-bold text-white mb-4 tracking-tighter tabular-nums drop-shadow-sm">
                                            {stat.number}
                                        </h3>
                                        <div className="flex items-center gap-4">
                                            <span className="w-10 h-px bg-yellow-500/40"></span>
                                            <p className="text-sm font-bold text-yellow-500 uppercase tracking-[0.4em] leading-tight">
                                                {stat.label}
                                            </p>
                                            <span className="w-10 h-px bg-yellow-500/40"></span>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3. Placement Cell Message */}
                <section className="py-20 px-6 bg-[#f9f8f6]">
                    <div className="container mx-auto max-w-4xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-center"
                        >
                            <span className="flex items-center justify-center gap-3 text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-8">
                                <span className="w-8 h-px bg-red-700"></span>
                                Placement Desk
                                <span className="w-8 h-px bg-red-700"></span>
                            </span>
                            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-stone-900 mb-8 leading-tight">
                                Empowering Futures Through <span className="text-blue-900">Professional Excellence</span>
                            </h2>
                            <div className="prose prose-lg prose-stone text-stone-600 font-serif leading-relaxed mb-10 mx-auto">
                                <p>
                                    Our Training and Placement Cell works relentlessly to ensure that our students are not just graduates, but industry-ready professionals. By fostering strong partnerships with leading corporations across various sectors, we facilitate a seamless transition from the classroom to the corporate world.
                                </p>
                                <p>
                                    We believe in nurturing the unique potential of every student through rigorous training modules that cover everything from fundamental technical skills to the nuances of corporate etiquette.
                                </p>
                            </div>
                            <div className="flex flex-col items-center border-t border-stone-200 pt-8 mt-12">
                                <span className="text-xs text-stone-500 uppercase tracking-widest font-bold">Training & Placement Cell</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* 4. Recruitment Process */}
                <section className="py-32 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-24">
                            <h2 className="text-4xl md:text-6xl font-playfair font-bold text-blue-900 mb-8 tracking-tight">Recruitment Journey</h2>
                            <div className="w-24 h-1 bg-yellow-500 mx-auto mb-8 rounded-full opacity-60"></div>
                            <p className="text-xl text-stone-500 font-serif leading-relaxed italic">
                                A systematic approach to transforming academic talent into corporate leadership.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {processSteps.map((step, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative p-10 bg-white border border-stone-100 hover:border-blue-900/10 hover:shadow-[0_20px_50px_rgba(8,112,184,0.1)] transition-all duration-500 group overflow-hidden"
                                >
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-stone-50 rounded-bl-full -mr-12 -mt-12 group-hover:bg-blue-50 transition-colors duration-500"></div>
                                    
                                    <div className="relative z-10">
                                        <div className="text-stone-300 group-hover:text-blue-900 transition-colors duration-500 mb-8">
                                            {step.icon}
                                        </div>
                                        <h3 className="text-2xl font-playfair font-bold text-stone-900 mb-6 leading-tight group-hover:text-blue-900 transition-colors">
                                            {step.title}
                                        </h3>
                                        <div className="w-10 h-0.5 bg-yellow-500 mb-6 transform origin-left transition-transform duration-500"></div>
                                        <p className="text-stone-500 leading-relaxed font-serif text-sm">
                                            {step.desc}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 5. Top Recruiters Logo Section */}
                <section className="py-24 bg-stone-900 text-white overflow-hidden">
                    <div className="container mx-auto px-6 mb-16">
                        <h2 className="text-center text-3xl font-playfair font-bold mb-4">Our Distinguished Partners</h2>
                        <div className="w-16 h-px bg-yellow-500 mx-auto"></div>
                    </div>

                    {/* Infinite Marquee for Partners */}
                    <div className="relative mt-8">
                        <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_20%,black_80%,transparent)]">
                            <motion.div
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    duration: 60,
                                    repeat: Infinity,
                                    ease: "linear"
                                }}
                                className="flex whitespace-nowrap"
                            >
                                {[...partners, ...partners].map((partner, i) => (
                                    <div
                                        key={i}
                                        className="inline-flex flex-col items-center justify-center min-w-[250px] h-32 bg-white/5 border border-white/10 rounded-sm p-6 mx-2 group hover:bg-white/10 transition-colors"
                                    >
                                        <span className="font-bold text-sm tracking-widest uppercase text-white/80 group-hover:text-yellow-500 transition-colors mb-2">{partner.name}</span>
                                        <span className="text-[9px] text-stone-500 uppercase tracking-tighter">{partner.location}</span>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        <div className="mt-16 text-center">
                            <p className="text-stone-500 font-serif italic text-sm">
                                and over 100+ other regional and national organizations.
                            </p>
                        </div>
                    </div>
                </section>
            </main>

            <ElegantFooter />
        </div>
    );
}
