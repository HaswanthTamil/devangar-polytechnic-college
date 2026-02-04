import React from 'react';
import { getDepartments } from '@/lib/content';
import ElegantHeader from '@/components/ElegantHeader';
import ElegantFooter from '@/components/ElegantFooter';
import Link from 'next/link';
import { getAnnouncements } from '@/lib/content'; // Header might need announcements

export default function DepartmentsPage() {
    const departments = getDepartments();
    const announcements = getAnnouncements();

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-red-900 selection:text-white">
            <ElegantHeader announcements={announcements} />
            
            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <header className="mb-16 text-center">
                        <span className="text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                            Academic Programs
                        </span>
                        <h1 className="text-5xl md:text-6xl font-playfair font-bold text-stone-900 mb-6">
                            Our Departments
                        </h1>
                        <p className="text-lg text-stone-600 font-serif max-w-2xl mx-auto leading-relaxed">
                            Discover our wide range of engineering disciplines, designed to foster innovation, practical skills, and technical excellence.
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {departments.map((dept) => (
                            <Link 
                                key={dept.slug} 
                                href={`/departments/${dept.slug}`}
                                className="group block h-full"
                            >
                                <div className="bg-white p-8 border border-stone-200 shadow-sm hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                                     {/* Decorative Border */}
                                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-700 to-blue-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>

                                    <h2 className="text-2xl font-playfair font-bold text-stone-900 mb-3 group-hover:text-red-700 transition-colors">
                                        {dept.name}
                                    </h2>
                                    <p className="text-sm text-stone-500 font-serif mb-6 flex-grow">
                                        Click to explore curriculum, faculty, and facilities.
                                    </p>
                                    
                                    <div className="flex items-center text-xs font-bold uppercase tracking-widest text-stone-400 group-hover:text-stone-900 transition-colors mt-auto">
                                        <span className="w-8 h-px bg-stone-300 mr-3 group-hover:bg-red-700 transition-colors"></span>
                                        View Details
                                        <span className="ml-2 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all duration-300 text-red-700">&rarr;</span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </main>

            <ElegantFooter />
        </div>
    );
}
