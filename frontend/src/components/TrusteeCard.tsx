'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Trustee } from '@/lib/types';

export default function TrusteeCard({ trustee }: { trustee: Trustee }) {
    const [isFlipped, setIsFlipped] = useState(false);

    return (
        <div className="group h-[450px] w-full [perspective:1000px] bg-transparent">
            <div 
                className={`relative w-full h-full transition-all duration-700 [transform-style:preserve-3d] shadow-sm hover:shadow-2xl ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
            >
                
                {/* Front Face */}
                <div className="absolute inset-0 w-full h-full bg-white flex flex-col items-center p-6 border border-stone-200 [backface-visibility:hidden] overflow-hidden">
                    {/* Decorative Top Border */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-red-700"></div>

                    <div className="w-56 h-56 mb-8 mt-4 relative rounded-full overflow-hidden border-4 border-stone-100 shadow-inner shrink-0">
                         <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">
                            {trustee.image && !trustee.image.includes('placeholder') ? (
                                <Image 
                                    src={trustee.image} 
                                    alt={trustee.name}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                            ) : (
                                <svg className="w-20 h-20" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                </svg>
                            )}
                         </div>
                    </div>

                    <h3 className="text-2xl font-playfair font-bold text-stone-900 mb-3 text-center">
                        {trustee.name}
                    </h3>
                    
                    <p className="text-stone-500 font-serif text-sm leading-relaxed text-center">
                        {trustee.description}
                    </p>

                    <div className="mt-auto mb-4">
                         <button 
                            onClick={() => setIsFlipped(true)}
                            className="text-xs text-red-700 font-bold uppercase tracking-widest border-b border-red-700 pb-0.5 hover:text-red-900 hover:border-red-900 transition-colors"
                         >
                            Read Biography
                         </button>
                    </div>
                </div>

                {/* Back Face */}
                <div className="absolute inset-0 w-full h-full bg-blue-900 text-white p-8 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center justify-center border border-blue-900 overflow-hidden">
                    <button 
                        onClick={() => setIsFlipped(false)}
                        className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors p-2"
                        title="Close"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <h3 className="text-xl font-playfair font-bold mb-6 text-center border-b border-red-500 pb-2">
                        {trustee.name}
                    </h3>
                    <div className="overflow-y-auto max-h-full scrollbar-thin scrollbar-thumb-red-500 scrollbar-track-blue-900 pr-2">
                        <p className="text-blue-50 font-serif text-sm leading-relaxed text-center">
                            {trustee.longDescription || trustee.description}
                        </p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-blue-800 w-full flex justify-center">
                         <div className="w-8 h-1 bg-red-600 rounded-full"></div>
                    </div>
                </div>

            </div>
        </div>
    );
}
