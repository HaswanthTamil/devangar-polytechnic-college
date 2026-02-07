/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { Banner } from '@/lib/types';
import Link from 'next/link';

export default function Banners({ data }: { data: Banner[] }) {
    if (!data || data.length === 0) return null;

    const hero = data[0];

    return (
        <div className="relative h-[500px] md:h-[700px] w-full overflow-hidden group">
            {/* Background Image with Zoom Effect */}
            {hero.image ? (
                <div className="absolute inset-0 transition-transform duration-10000 ease-linear transform scale-100 group-hover:scale-105">
                    <img
                        src={hero.image}
                        alt={hero.alt || 'Banner'}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent opacity-80"></div>
                </div>
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900"></div>
            )}

            {/* Content Overlay */}
            <div className="relative container mx-auto px-4 h-full flex flex-col justify-center items-start text-white">
                <div className="max-w-3xl animate-fade-in-up">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 drop-shadow-lg">
                        Excellence in <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Technical Education</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed max-w-2xl font-light">
                        Empowering the next generation of engineers with world-class infrastructure and industry-oriented curriculum.
                    </p>
                    <div className="flex flex-wrap gap-4">
                        {/* <button type="button" className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-500/50 transition-all transform hover:-translate-y-1">
                            Apply Now
                        </button> */}
                        <Link href="/departments">
                        <button type="button" className="px-8 py-4 bg-white/10 backdrop-blur-md hover:bg-white/20 text-white font-bold rounded-lg border border-white/30 transition-all">
                            Explore Departments
                        </button></Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
