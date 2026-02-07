/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { GalleryItem } from '@/lib/types';

export default function Gallery({ data }: { data: GalleryItem[] }) {
    if (!data || data.length === 0) return null;

    const categories = Array.from(new Set(data.map(item => item.category || 'General')));

    return (
        <div className="space-y-16 py-12">
            {categories.map(category => {
                const items = data.filter(d => (d.category || 'General') === category);
                if (items.length === 0) return null;

                return (
                    <div key={category} className="container mx-auto px-4">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-3xl font-bold capitalize text-gray-900 border-l-4 border-blue-600 pl-4">{category}</h3>
                            {/* <span className="text-sm font-semibold text-blue-600 uppercase tracking-wide cursor-pointer hover:underline">View All</span> */}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {items.map((item, idx) => (
                                <div key={idx} className="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 bg-white">
                                    {item.image ? (
                                        <div className="aspect-w-4 aspect-h-3 overflow-hidden">
                                            <img
                                                src={item.image}
                                                alt={category}
                                                className="object-cover object-center w-full h-64 transform group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                                                <p className="text-white font-medium transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                                    View Image
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="h-64 bg-gray-200 flex items-center justify-center text-gray-400">No Image</div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
