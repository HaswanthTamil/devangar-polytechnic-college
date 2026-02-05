import React from 'react';
import ElegantHeader from '@/components/ElegantHeader';
import ElegantFooter from '@/components/ElegantFooter';
import { getDisclosure, getAnnouncements } from '@/lib/content';

export default function DisclosurePage() {
    const disclosure = getDisclosure();
    const announcements = getAnnouncements();

    return (
        <div className="flex flex-col min-h-screen bg-stone-50 font-sans text-stone-900 overflow-x-hidden selection:bg-red-900 selection:text-white">
            <ElegantHeader announcements={announcements} />
            
            <main className="flex-grow pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-4xl">
                    <header className="mb-16 text-center">
                        <span className="text-red-700 font-bold uppercase tracking-[0.2em] text-xs mb-4 block">
                            Mandatory Disclosure
                        </span>
                        <h1 className="text-4xl md:text-5xl font-playfair font-bold text-stone-900 mb-6">
                            AICTE Disclosure
                        </h1>
                        <p className="text-lg text-stone-600 font-serif max-w-2xl mx-auto leading-relaxed">
                            Information provided as per AICTE regulations.
                        </p>
                    </header>
                    
                    <div className="bg-white p-8 md:p-12 border border-stone-200 shadow-sm rounded-lg space-y-12">
                        
                         {/* I. AICTE FILE NO */}
                        <section>
                            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b border-stone-100 pb-2">I. AICTE FILE NO.</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-stone-700">
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">File Number</span>
                                    <p>F.No. Southern/1-9318351112/2021/EOA</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Date</span>
                                    <p>25-Jun-2021</p>
                                </div>
                                <div className="md:col-span-2">
                                     <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Last Approval Period</span>
                                     <p>2021 – 2022</p>
                                </div>
                            </div>
                        </section>

                        {/* II. INSTITUTE DETAILS */}
                        <section>
                            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b border-stone-100 pb-2">II. INSTITUTE DETAILS</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-700">
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Name of the Institution</span>
                                    <p>DEVANGAR POLYTECHNIC COLLEGE</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Address</span>
                                    <p>D.Vadipatti, Periyakulam - 625602, Tamil Nadu</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Coordinates</span>
                                    <p>Latitude - 10.136587 N, Longitude - 77.621461 E</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Contact</span>
                                    <p>Phone: {disclosure.institutionContact.phone}</p>
                                    <p>Email: {disclosure.institutionContact.email}</p>
                                    <p>Website: www.devangaret.org</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Nearest Transport</span>
                                    <p>Railway: Dindigul Junction (approx. 78Km)</p>
                                    <p>Airport: Madurai (approx. 75 Km.)</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Institution Type</span>
                                    <p>Private - Self Financed (Non Minority, Co-Ed)</p>
                                </div>
                                <div className="md:col-span-2">
                                     <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Affiliating Body</span>
                                     <p>Directorate of Technical Education, Chennai-600 025 (www.tndte.gov.in/site)</p>
                                </div>
                            </div>
                        </section>

                        {/* III. PRINCIPAL */}
                        <section>
                            <h2 className="text-xl font-bold text-blue-900 mb-4 border-b border-stone-100 pb-2">III. PRINCIPAL</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-stone-700">
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Name</span>
                                    <p>{disclosure.principal.name}</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Designation</span>
                                    <p>{disclosure.principal.designation}</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Higher Degree</span>
                                    <p>{disclosure.principal.degree}</p>
                                </div>
                                <div>
                                    <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Contact</span>
                                    <p>Phone: {disclosure.principal.phone}</p>
                                    <p>Email: {disclosure.principal.email}</p>
                                </div>
                            </div>
                        </section>

                        {/* IV. GOVERNANCE */}
                        <section>
                             <h2 className="text-xl font-bold text-blue-900 mb-4 border-b border-stone-100 pb-2">IV. GOVERNANCE</h2>
                             <div className="prose prose-stone text-stone-700">
                                <p className="mb-4"><strong className="text-stone-900">Faculty Involvement:</strong> Implementation of TNDOTE curriculum, Academic Planning, monitoring, evaluation, and guiding extracurricular activities.</p>
                                <p className="mb-4"><strong className="text-stone-900">Student Involvement:</strong> Participation in paper presentations, sports, seminars, and industrial visits.</p>
                                <p className="mb-4"><strong className="text-stone-900">Governance Mechanism:</strong> Regular conduct of faculty meetings and dissemination seminars.</p>
                                <p className="mb-4"><strong className="text-stone-900">Student Feedback:</strong> Class counselors, counseling meetings, parents&apos; meets.</p>
                                <p><strong className="text-stone-900">Grievance Redressal:</strong> Class Counselor, Staff Meetings, and Online Grievance Redressal Mechanism.</p>
                             </div>
                        </section>

                         {/* V. PROGRAMMES */}
                        <section>
                             <h2 className="text-xl font-bold text-blue-900 mb-4 border-b border-stone-100 pb-2">V. PROGRAMMES (Approved Intake)</h2>
                             <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-stone-200 border border-stone-200">
                                    <thead className="bg-stone-50">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-bold text-stone-500 uppercase tracking-wider">Program</th>
                                            <th scope="col" className="px-6 py-3 text-right text-xs font-bold text-stone-500 uppercase tracking-wider">Intake</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-stone-200">
                                        {disclosure.intake.map((item, idx) => (
                                            <tr key={idx}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-stone-900">{item.program}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-stone-500 text-right">{item.count}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                             </div>
                        </section>

                        {/* VI. FEE */}
                         <section>
                             <h2 className="text-xl font-bold text-blue-900 mb-4 border-b border-stone-100 pb-2">VI. FEE STRUCTURE</h2>
                             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-stone-700">
                                <div className="flex justify-between border-b border-stone-100 pb-2">
                                    <span>Tuition Fee</span>
                                    <span className="font-bold">Rs.10000 / Semester</span>
                                </div>
                                <div className="flex justify-between border-b border-stone-100 pb-2">
                                    <span>Caution Deposit (Refundable)</span>
                                    <span className="font-bold">Rs.2000</span>
                                </div>
                                <div className="flex justify-between border-b border-stone-100 pb-2">
                                    <span>Admission Fee</span>
                                    <span className="font-bold">Rs.500</span>
                                </div>
                                <div className="flex justify-between border-b border-stone-100 pb-2">
                                    <span>Application Fee</span>
                                    <span className="font-bold">Rs.100</span>
                                </div>
                             </div>
                        </section>

                         {/* VII. ACADEMIC SESSIONS */}
                         <section>
                             <h2 className="text-xl font-bold text-blue-900 mb-4 border-b border-stone-100 pb-2">VII. ACADEMIC SESSIONS</h2>
                             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-stone-700">
                                 <div>
                                     <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Examination System</span>
                                     <p>Two Semester / Year</p>
                                 </div>
                                  <div>
                                     <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Exam Period</span>
                                     <p>April and October</p>
                                 </div>
                                  <div>
                                     <span className="font-bold block text-sm text-stone-900 uppercase tracking-wide mb-1">Result Declaration</span>
                                     <p>June and December</p>
                                 </div>
                             </div>
                        </section>

                    </div>
                </div>
            </main>

            <ElegantFooter />
        </div>
    );
}
