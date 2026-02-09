import { TemplateProps } from '@/lib/types';
import Banners from '../Banners';
import AnnouncementsCarousel from '../AnnouncementsCarousel';
import Gallery from '../Gallery';
import FileList from '../FileList';

export default function LandingPage({ page, banners, announcements, gallery, files }: TemplateProps) {

    return (
        <div className="flex flex-col min-h-screen bg-gray-50 font-sans">
            {/* Announcements Bar */}
            <AnnouncementsCarousel data={announcements} />

            {/* Hero / Banners */}
            <Banners data={banners} />

            {/* About / Welcome Section - Page Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    {page.title && (
                        <div className="text-center mb-16 max-w-4xl mx-auto">
                            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-2 block">Welcome</span>
                            <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">{page.title}</h2>
                            <div className="h-1.5 w-24 bg-blue-600 mx-auto rounded-full"></div>
                        </div>
                    )}

                    <div className="max-w-4xl mx-auto prose prose-lg prose-indigo text-gray-600 leading-relaxed">
                        {page.sections?.map((section, index) => (
                            <div key={index} className="mb-8">
                                <div dangerouslySetInnerHTML={{ __html: section.content }} />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features / Stats Placeholder (Static for Template Feel) */}
            <section className="py-16 bg-blue-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div className="p-4">
                            <div className="text-4xl font-bold mb-2">15+</div>
                            <div className="text-blue-200">Years of Excellence</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold mb-2">50+</div>
                            <div className="text-blue-200">Expert Faculty</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold mb-2">100%</div>
                            <div className="text-blue-200">Placement Support</div>
                        </div>
                        <div className="p-4">
                            <div className="text-4xl font-bold mb-2">2000+</div>
                            <div className="text-blue-200">Alumni Network</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
            {gallery.length > 0 && (
                <section className="py-20 bg-gray-50">
                    <div className="container mx-auto px-4 text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Campus Life</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Discover the vibrant atmosphere and state-of-the-art facilities at Devangar Polytechnic.</p>
                    </div>
                    <Gallery data={gallery} />
                </section>
            )}

            {/* Files/Downloads Section */}
            {files.length > 0 && (
                <section className="py-20 bg-white">
                    <div className="container mx-auto px-4 text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Resources & Downloads</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">Access important documents, academic calendars, and exam schedules.</p>
                    </div>
                    <FileList data={files} />
                </section>
            )}

            {/* Footer (Quick Static Footer) */}
            <footer className="bg-gray-900 text-gray-300 py-12">
                <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="text-white text-lg font-bold mb-4">Devangar Polytechnic</h4>
                        <p className="text-sm">Building careers, shaping futures.</p>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-bold mb-4">Quick Links</h4>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400">Admissions</a></li>
                            <li><a href="#" className="hover:text-blue-400">Departments</a></li>
                            <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-bold mb-4">Contact</h4>
                        <p className="text-sm">Admin Office, DPC Campus</p>
                        <p className="text-sm">Phone: +91 123 456 7890</p>
                    </div>
                    <div>
                        <h4 className="text-white text-lg font-bold mb-4">Social</h4>
                        <div className="flex space-x-4">
                            {/* Icons */}
                        </div>
                    </div>
                </div>
                <div className="container mx-auto px-4 mt-8 pt-8 border-t border-gray-800 text-center text-xs">
                    &copy; 2026 Devangar Polytechnic College. All rights reserved.
                </div>
            </footer>
        </div>
    );
}
