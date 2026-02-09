'use client';

import { useState, useEffect } from 'react';
import { Announcement } from '@/lib/types';

export default function AnnouncementsCarousel({ data }: { data: Announcement[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (data.length <= 1) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % data.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [data]);

    if (!data || data.length === 0) return null;

    return (
       <div className="bg-blue-950 text-white relative overflow-hidden h-10 flex items-center z-50">
  <div className="container mx-auto px-6 relative flex items-center justify-between">
    <div className="flex items-center space-x-4 flex-1"> {/* Added flex-1 to grow */}
      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-yellow-400 pr-4 border-r border-blue-800 shrink-0"> 
        Latest News 
      </span>
      
      {/* Container now fills remaining space */}
      <div className="overflow-hidden h-6 relative flex-1"> 
        {data.map((item, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-x-0 transition-all duration-700 ease-in-out transform flex items-center h-full ${ 
              idx === currentIndex ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0 pointer-events-none' 
            }`}
          >
            <p className="w-full truncate text-xs md:text-sm font-medium font-serif tracking-wide text-blue-50 min-w-0">
              {item.text}
              {item.link && (
                <a href={item.link} className="ml-3 text-yellow-400 hover:text-white transition-colors text-[10px] uppercase font-bold underline decoration-yellow-400/50 underline-offset-2 shrink-0">
                  Read More
                </a>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Dots Navigation */}
    {data.length > 1 && (
      <div className="hidden md:flex space-x-2 ml-4">
        {data.map((_, idx) => (
          <button 
            key={idx} 
            className={`h-1 w-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'bg-yellow-400 scale-125' : 'bg-blue-800'}`} 
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    )}
  </div>
</div>
    );
}
