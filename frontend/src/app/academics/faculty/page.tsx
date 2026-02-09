import React from 'react';
import ElegantHeader from '@/components/ElegantHeader';
import ElegantFooter from '@/components/ElegantFooter';
import { getFacultyByDepartment, getAnnouncements, getDepartments } from '@/lib/content';
import { Faculty } from '@/lib/types';
import Image from 'next/image';

export default function FacultyPage() {
    const announcements = getAnnouncements();
    const departments = getDepartments();

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-red-900 selection:text-white">
            <ElegantHeader announcements={announcements} />
            
            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <header className="mb-16 text-center">
                        <span className="text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                            Academic Team
                        </span>
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-stone-900 mb-6">
                            Faculty Directory
                        </h1>
                    </header>

                    <div className="space-y-24">
                        {departments.map((dept) => {
                            const facultyMembers = getFacultyByDepartment(dept.slug);
                            if (facultyMembers.length === 0) return null;

                            // Assuming the first sorted member (position 1) is likely the HOD or Lead
                            // We can also check designation for "HOD" or "Head"
                            const hod = facultyMembers.find(f => f.designation.toLowerCase().includes('hod') || f.designation.toLowerCase().includes('head'));
                            const otherFaculty = facultyMembers.filter(f => f !== hod);

                            return (
                                <section key={dept.slug} className="scroll-mt-32" id={dept.slug}>
                                    <div className="flex items-center mb-10">
                                        <div className="h-px bg-stone-300 flex-grow"></div>
                                        <h2 className="text-2xl font-playfair font-bold text-blue-900 px-6 uppercase tracking-wider text-center">
                                            {dept.name}
                                        </h2>
                                        <div className="h-px bg-stone-300 flex-grow"></div>
                                    </div>
                                    
                                    {/* HOD Section */}
                                    {hod && (
                                        <div className="mb-10 flex justify-center">
                                            <div className="max-w-md w-full">
                                                <div className="flex items-center p-6 bg-white border-l-4 border-red-700 shadow-md rounded-r-lg">
                                                     <div className="w-24 h-24 relative rounded-full overflow-hidden shrink-0 border-2 border-stone-100 mr-6">
                                                        {hod.photo && !hod.photo.includes('placeholder') ? (
                                                            <Image 
                                                                src={hod.photo} 
                                                                alt={hod.name}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-300">
                                                                 <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                                </svg>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div>
                                                        <span className="text-red-700 text-xs font-bold uppercase tracking-widest mb-1 block">Head of Department</span>
                                                        <h3 className="text-xl font-playfair font-bold text-stone-900 mb-1">{hod.name}</h3>
                                                        <p className="text-stone-500 text-xs uppercase tracking-wider">{hod.designation}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Other Faculty Grid */}
                                    {otherFaculty.length > 0 && (
                                        <div className="flex flex-wrap justify-center gap-6">
                                            {otherFaculty.map((faculty, index) => (
                                                <div 
                                                    key={`${dept.slug}-${index}`} 
                                                    className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                                                >
                                                    <FacultyCompactCard faculty={faculty} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </section>
                            );
                        })}
                    </div>
                </div>
            </main>

            <ElegantFooter />
        </div>
    );
}

function FacultyCompactCard({ faculty }: { faculty: Faculty }) {
    return (
        <div className="flex items-center p-4 bg-white border border-stone-200 shadow-sm hover:shadow-lg hover:border-red-200 transition-all duration-300 rounded-lg group">
             {/* Image - Larger & Prioritized */}
            <div className="w-20 h-20 relative rounded-full overflow-hidden shrink-0 border-2 border-stone-50 group-hover:border-red-50 transition-colors shadow-inner">
                {faculty.photo && !faculty.photo.includes('placeholder') ? (
                    <Image 
                        src={faculty.photo} 
                        alt={faculty.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        sizes="80px"
                    />
                ) : (
                    <div className="w-full h-full bg-stone-100 flex items-center justify-center text-stone-300">
                         <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="ml-5 flex-grow min-w-0">
                <h3 className="text-base font-playfair font-bold text-stone-900 group-hover:text-red-700 transition-colors leading-tight">
                    {faculty.name}
                </h3>
                <p className="text-stone-500 text-[10px] font-bold uppercase tracking-widest truncate mt-1">
                    {faculty.designation}
                </p>
            </div>
        </div>
    );
}
