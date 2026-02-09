import React from 'react';
import DefaultPage from '@/components/templates/DefaultPage';
import { getAnnouncements, getBanners, getGallery, getFiles } from '@/lib/content';
import { Page } from '@/lib/types';

export const metadata = {
    title: 'Hostel & Transport - Devangar Polytechnic College',
    description: 'Information about hostel facilities and transport services at Devangar Polytechnic College.',
};

export default function AmenitiesPage() {
    const announcements = getAnnouncements();
    const banners = getBanners();
    const gallery = getGallery();
    const files = getFiles();

    const page: Page = {
        slug: 'amenities',
        title: 'Hostel & Transport',
        sections: [
            {
                type: 'text',
                content: `
                    <div class="mb-12">
                        <h2 class="text-3xl font-playfair font-bold text-blue-900 mb-6 border-b border-stone-200 pb-2">Hostel Facilities</h2>
                        <p class="text-lg text-stone-600 mb-4 leading-relaxed">
                            Devangar Polytechnic College provides a safe and secure hostel environment conducive to academic excellence. Currently, our hostel facilities are exclusively available for male students.
                        </p>
                        <p class="text-lg text-stone-600 mb-4 leading-relaxed">
                            The hostel offers well-ventilated rooms, hygienic dining facilities, and a disciplined atmosphere that helps students focus on their studies while building community spirit.
                        </p>
                    </div>

                    <div class="mb-12">
                        <h2 class="text-3xl font-playfair font-bold text-blue-900 mb-6 border-b border-stone-200 pb-2">Transport Services</h2>
                        <p class="text-lg text-stone-600 mb-4 leading-relaxed">
                            To ensure hassle-free commuting for our students and staff, the college operates a fleet of buses covering key routes in and around the city.
                        </p>
                        <ul class="list-disc pl-6 space-y-2 text-stone-600 text-lg marker:text-red-700">
                            <li>Safe and reliable transportation for day scholars.</li>
                            <li>Extensive coverage of nearby towns and rural areas.</li>
                            <li>Timely arrival and departure services synchronized with college hours.</li>
                        </ul>
                    </div>
                `
            }
        ]
    };

    return (
        <DefaultPage
            page={page}
            banners={banners}
            announcements={announcements}
            gallery={gallery}
            files={files}
        />
    );
}
