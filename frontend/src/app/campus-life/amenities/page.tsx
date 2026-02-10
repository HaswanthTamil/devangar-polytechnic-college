
import { getAnnouncements } from "@/lib/content";
import ElegantHeader from "@/components/ElegantHeader";
import ElegantFooter from "@/components/ElegantFooter";
import Image from "next/image";

export const metadata = {
    title: 'Hostel & Transport - Devangar Polytechnic College',
    description: 'Information about hostel facilities and transport services at Devangar Polytechnic College.',
};

export default function AmenitiesPage() {
    const announcements = getAnnouncements();

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 selection:bg-red-900 selection:text-white">
            <ElegantHeader announcements={announcements} />

            <main>
                {/* Hero Section */}
                <section className="relative py-24 bg-stone-900 overflow-hidden">
                    <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
                    <div className="container mx-auto px-6 relative z-10 text-center">
                        <span className="inline-block py-2 px-6 border-y border-yellow-500/30 text-xs font-bold tracking-[0.3em] text-yellow-500 uppercase bg-black/20 backdrop-blur-sm mb-6">
                            Campus Life
                        </span>
                        <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">Hostel & Transport</h1>
                        <p className="text-xl text-stone-300 font-serif max-w-2xl mx-auto leading-relaxed">
                            Comfortable living spaces and reliable transportation services ensuring a hassle-free academic journey.
                        </p>
                    </div>
                </section>

                {/* Hostel Facilities Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-16 items-center">
                            {/* Image Column */}
                            <div className="relative">
                                <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden shadow-2xl shadow-stone-200 group">
                                    <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-400 font-serif italic text-lg z-0">
                                        <span>Hostel Building</span>
                                    </div>
                                    <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none"></div>
                                </div>
                                <div className="absolute -bottom-6 -right-6 w-2/3 h-2/3 border-2 border-yellow-500/20 -z-10"></div>
                            </div>

                            {/* Content Column */}
                            <div>
                                <span className="flex items-center gap-3 text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-6">
                                    <span className="w-8 h-px bg-red-700"></span>
                                    01
                                </span>
                                <h2 className="text-4xl font-playfair font-bold text-stone-900 mb-6 leading-tight">Hostel Facilities</h2>
                                <p className="text-lg text-stone-600 font-serif leading-relaxed mb-6">
                                    Devangar Polytechnic College provides a safe and secure hostel environment conducive to academic excellence. Currently, our hostel facilities are exclusively available for male students.
                                </p>
                                <p className="text-lg text-stone-600 font-serif leading-relaxed mb-8">
                                    The hostel offers well-ventilated rooms, hygienic dining facilities, and a disciplined atmosphere that helps students focus on their studies while building community spirit.
                                </p>
                                <ul className="grid grid-cols-1 gap-3">
                                    <li className="flex items-start gap-3 text-sm font-bold text-stone-500 uppercase tracking-wide">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                                        Safe & Secure Environment
                                    </li>
                                    <li className="flex items-start gap-3 text-sm font-bold text-stone-500 uppercase tracking-wide">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                                        Hygienic Dining
                                    </li>
                                    <li className="flex items-start gap-3 text-sm font-bold text-stone-500 uppercase tracking-wide">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                                        Disciplined Atmosphere
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Transport Services Section */}
                <section className="py-24 bg-stone-50">
                    <div className="container mx-auto px-6 max-w-6xl">
                        <div className="grid md:grid-cols-2 gap-16 items-center md:grid-flow-dense">
                            {/* Image Column */}
                            <div className="relative md:col-start-2">
                                <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden shadow-2xl shadow-stone-200 group">
                                    <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-400 font-serif italic text-lg z-0">
                                        <span>Transport Fleet</span>
                                    </div>
                                    <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none"></div>
                                </div>
                                <div className="absolute -bottom-6 -left-6 w-2/3 h-2/3 border-2 border-yellow-500/20 -z-10"></div>
                            </div>

                            {/* Content Column */}
                            <div className="md:col-start-1">
                                <span className="flex items-center gap-3 text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-6">
                                    <span className="w-8 h-px bg-red-700"></span>
                                    02
                                </span>
                                <h2 className="text-4xl font-playfair font-bold text-stone-900 mb-6 leading-tight">Transport Services</h2>
                                <p className="text-lg text-stone-600 font-serif leading-relaxed mb-6">
                                    To ensure hassle-free commuting for our students and staff, the college operates a fleet of buses covering key routes in and around the city.
                                </p>
                                <ul className="grid grid-cols-1 gap-3">
                                    <li className="flex items-start gap-3 text-sm font-bold text-stone-500 uppercase tracking-wide">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                                        Safe & Reliable for Day Scholars
                                    </li>
                                    <li className="flex items-start gap-3 text-sm font-bold text-stone-500 uppercase tracking-wide">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                                        Extensive Coverage of Nearby Towns
                                    </li>
                                    <li className="flex items-start gap-3 text-sm font-bold text-stone-500 uppercase tracking-wide">
                                        <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                                        Timely Arrival & Departure
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <ElegantFooter />
        </div>
    );
}
