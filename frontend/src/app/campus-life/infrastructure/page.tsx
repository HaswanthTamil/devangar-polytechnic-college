import { getInfrastructure, getAnnouncements } from "@/lib/content";
import ElegantHeader from "@/components/ElegantHeader";
import ElegantFooter from "@/components/ElegantFooter";
import Image from "next/image";

export default function InfrastructurePage() {
    const data = getInfrastructure();
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
                        <h1 className="text-5xl md:text-6xl font-playfair font-bold text-white mb-6">World-Class Infrastructure</h1>
                        <p className="text-xl text-stone-300 font-serif max-w-2xl mx-auto leading-relaxed">
                            Designed to foster innovation and academic excellence, our campus provides a state-of-the-art environment for holistic development.
                        </p>
                    </div>
                </section>

                {/* Infrastructure Sections */}
                {data.items.map((item, index) => (
                    <section key={index} className={`py-24 ${index % 2 === 0 ? 'bg-white' : 'bg-stone-50'}`}>
                        <div className="container mx-auto px-6 max-w-6xl">
                            <div className={`grid md:grid-cols-2 gap-16 items-center ${index % 2 === 1 ? 'md:grid-flow-dense' : ''}`}>

                                {/* Image Column */}
                                <div className={`relative ${index % 2 === 1 ? 'md:col-start-2' : ''}`}>
                                    <div className="aspect-[4/3] bg-stone-200 relative overflow-hidden shadow-2xl shadow-stone-200 group">
                                        {/* Placeholder/Actual Image */}
                                        <div className="absolute inset-0 bg-stone-300 flex items-center justify-center text-stone-400 font-serif italic text-lg z-0">
                                            {item.image ? (
                                                <Image
                                                    src={item.image}
                                                    alt={item.title}
                                                    fill
                                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                            ) : (
                                                <span>{item.title} Image</span>
                                            )}
                                        </div>
                                        {/* Decorative Border */}
                                        <div className="absolute inset-4 border border-white/20 z-10 pointer-events-none"></div>
                                    </div>
                                    {/* Offset Decorative Box */}
                                    <div className={`absolute -bottom-6 w-2/3 h-2/3 border-2 border-yellow-500/20 -z-10 ${index % 2 === 0 ? '-right-6' : '-left-6'}`}></div>
                                </div>

                                {/* Content Column */}
                                <div className={`${index % 2 === 1 ? 'md:col-start-1' : ''}`}>
                                    <span className="flex items-center gap-3 text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-6">
                                        <span className="w-8 h-px bg-red-700"></span>
                                        0{index + 1}
                                    </span>
                                    <h2 className="text-4xl font-playfair font-bold text-stone-900 mb-6 leading-tight">{item.title}</h2>
                                    <p className="text-lg text-stone-600 font-serif leading-relaxed mb-8">
                                        {item.description}
                                    </p>

                                    {item.features && item.features.length > 0 && (
                                        <ul className="grid grid-cols-1 gap-3 mb-8">
                                            {item.features.map((feature, i) => (
                                                <li key={i} className="flex items-start gap-3 text-sm font-bold text-stone-500 uppercase tracking-wide">
                                                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 mt-1.5"></span>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* <button className="group inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-stone-900 hover:text-red-700 transition-colors">
                                        Learn More
                                        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </svg>
                                    </button> */}
                                </div>

                            </div>
                        </div>
                    </section>
                ))}
            </main>

            <ElegantFooter />
        </div>
    );
}
