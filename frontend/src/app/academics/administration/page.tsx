import ElegantHeader from '@/components/ElegantHeader';
import ElegantFooter from '@/components/ElegantFooter';
import { getTrustees, getAnnouncements, getPrincipal } from '@/lib/content';
import Image from 'next/image';
import TrusteeCard from '@/components/TrusteeCard';

export default function AdministrationPage() {
    const dpcTrustees = getTrustees('DPC');
    const decTrustees = getTrustees('DET');
    const principal = getPrincipal();
    const announcements = getAnnouncements();

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-red-900 selection:text-white">
            <ElegantHeader announcements={announcements} />
            
            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <header className="mb-16 text-center">
                        <span className="text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                            Leadership & Vision
                        </span>
                        <h1 className="text-5xl md:text-6xl font-playfair font-bold text-stone-900 mb-6">
                            Administration
                        </h1>
                        <p className="text-lg text-stone-600 font-serif max-w-2xl mx-auto leading-relaxed">
                            Guided by a legacy of excellence and a commitment to future-ready education.
                        </p>
                    </header>

                    {/* DPC Trustees Section */}
                    {dpcTrustees.length > 0 && (
                        <section className="mb-20">
                            <h2 className="text-3xl font-playfair font-bold text-blue-900 mb-10 text-center relative inline-block w-full">
                                <span className="relative z-10 bg-stone-50 px-6">DPC Trustees</span>
                                <div className="absolute top-1/2 left-0 w-full h-px bg-stone-300 -z-0"></div>
                            </h2>
                            <div className="flex flex-wrap justify-center gap-8">
                                {dpcTrustees.map((trustee, index) => (
                                    <div key={`dpc-${index}`} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                                        <TrusteeCard trustee={trustee} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* DEC Trustees Section */}
                    {decTrustees.length > 0 && (
                        <section className="mb-20">
                            <h2 className="text-3xl font-playfair font-bold text-blue-900 mb-10 text-center relative inline-block w-full">
                                <span className="relative z-10 bg-stone-50 px-6">DET Trustees</span>
                                <div className="absolute top-1/2 left-0 w-full h-px bg-stone-300 -z-0"></div>
                            </h2>
                            <div className="flex flex-wrap justify-center gap-8">
                                {decTrustees.map((trustee, index) => (
                                    <div key={`dec-${index}`} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.33%-1.5rem)]">
                                        <TrusteeCard trustee={trustee} />
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {/* Principal Message Section */}
                    {principal && (
                        <section className="mb-20">
                             <h2 className="text-3xl font-playfair font-bold text-blue-900 mb-10 text-center relative inline-block w-full">
                                <span className="relative z-10 bg-stone-50 px-6">Principal&apos;s Message</span>
                                <div className="absolute top-1/2 left-0 w-full h-px bg-stone-300 -z-0"></div>
                            </h2>
                            <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-xl flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto relative overflow-hidden">
                                 {/* Decorative Background Element */}
                                 <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl opacity-50 -z-0 translate-x-1/2 -translate-y-1/2"></div>
                                 <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -z-0 -translate-x-1/2 translate-y-1/2"></div>

                                <div className="w-full md:w-1/3 flex flex-col items-center flex-shrink-0 relative z-10">
                                    <div className="w-64 h-64 relative rounded-lg overflow-hidden shadow-lg border-4 border-white mb-6 transform rotate-0 hover:rotate-3 transition-transform duration-500">
                                        {principal.image && !principal.image.includes('placeholder') ? (
                                            <Image 
                                                src={principal.image} 
                                                alt={principal.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-stone-200 flex items-center justify-center text-stone-400">
                                                <svg className="w-24 h-24" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <h3 className="text-2xl font-playfair font-bold text-stone-900 text-center">
                                        {principal.name}
                                    </h3>
                                    <p className="text-red-700 font-bold uppercase tracking-widest text-xs mt-2 text-center">
                                        {principal.designation}
                                    </p>
                                </div>

                                <div className="w-full md:w-2/3 relative z-10">
                                    <svg className="w-10 h-10 text-stone-200 mb-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M14.017 21L14.017 18C14.017 16.8954 13.1216 16 12.017 16H9C9.00012 13.1784 11.3199 10.9328 14.1534 10.9997L14.2185 11C14.7708 11 15.2185 10.5523 15.2185 10V6.99999C15.2185 6.44771 14.7708 6 14.2185 6C9.15541 6 5 10.0294 5 15V19C5 20.1046 5.89543 21 7 21H14.017ZM20.017 21L20.017 18C20.017 16.8954 19.1216 16 18.017 16H15C15.0001 13.1784 17.3199 10.9328 20.1534 10.9997L20.2185 11C20.7708 11 21.2185 10.5523 21.2185 10V6.99999C21.2185 6.44771 20.7708 6 20.2185 6C15.1554 6 11 10.0294 11 15V19C11 20.1046 11.8954 21 13 21H20.017Z" />
                                    </svg>
                                    <p className="text-lg text-stone-600 font-serif leading-8 italic mb-6">
                                        &ldquo;{principal.message}&rdquo;
                                    </p>
                                    <div className="w-12 h-1 bg-red-700"></div>
                                </div>
                            </div>
                        </section>
                    )}
                </div>
            </main>

            <ElegantFooter />
        </div>
    );
}
