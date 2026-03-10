import React from 'react';
import PlacementsTemplate from '@/components/templates/PlacementsTemplate';
import {
    getAnnouncements,
    getBanners,
    getGallery
} from '@/lib/content';

export default function PlacementsPage() {
    const announcements = getAnnouncements();
    const banners = getBanners();
    const gallery = getGallery();

    return (
        <PlacementsTemplate
            announcements={announcements}
            banners={banners}
            gallery={gallery}
        />
    );
}
