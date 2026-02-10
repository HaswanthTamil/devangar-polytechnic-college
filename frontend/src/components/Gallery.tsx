/* eslint-disable @next/next/no-img-element */
'use client';

import { GalleryItem } from '@/lib/types';
import { motion } from 'framer-motion';

export default function Gallery({ data }: { data: GalleryItem[] }) {
    if (!data || data.length === 0) return null;
    const duplicatedItems = [...data, ...data, ...data];

    return (
        <div className="space-y-16 py-12">
                    <div className="w-full overflow-hidden">
                        <div className="container mx-auto px-4 mb-8">
                            <h3 className="text-3xl font-bold capitalize text-gray-900 border-l-4 border-blue-600 pl-4">Events</h3>
                        </div>

                        <div className="relative">
                            <motion.div
                                className="flex gap-6"
                                animate={{
                                    x: [0, -100 * duplicatedItems.length / 3],
                                }}
                                transition={{
                                    x: {
                                        repeat: Infinity,
                                        repeatType: "loop",
                                        duration: duplicatedItems.length,
                                        ease: "linear",
                                    },
                                }}
                            >
                                {duplicatedItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white flex-shrink-0"
                                        style={{ width: '400px' }}
                                    >
                                        {item.image ? (
                                            <div className="relative overflow-hidden">
                                                <img
                                                    src={item.image}
                                                    alt={item.name}
                                                    className="object-cover object-center w-full h-64 transform group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-100 transition-opacity duration-300">
                                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                                        <h4 className="text-white font-bold text-lg mb-1">
                                                            {item.name || 'Untitled'}
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                        )}
                                    </div>
                                ))}
                            </motion.div>

                            {/* Gradient overlays for fade effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-stone-50 to-transparent pointer-events-none z-10"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-stone-50 to-transparent pointer-events-none z-10"></div>
                        </div>
                    </div>
                
        </div>
    );
}
