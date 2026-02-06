import React from 'react';
import { getAnnouncements, getEligibility } from '@/lib/content';
import EligibilityClient from './EligibilityClient';

export default function EligibilityPage() {
    const announcements = getAnnouncements();
    const eligibilityData = getEligibility();

    return <EligibilityClient announcements={announcements} data={eligibilityData} />;
}
